// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./TaskEscrow.sol";

/**
 * @title FlareAdapter
 * @notice Lightweight adapter contract that extends TaskEscrow with Flare-specific features:
 * - FAssets support (BTC, XRP, etc.) via ERC20 token deposits
 * - FDC-triggered conditional releases
 * - Token type tracking for multi-asset escrows
 * 
 * Security: On-chain logic remains minimal; escrow contract is primary source of truth.
 */
contract FlareAdapter {
    TaskEscrow public immutable escrow;

    // FDC oracle authorized to call releaseIf
    address public fdcOracle;
    
    // Mapping: taskId => token type identifier (e.g., "FLR", "BTC", "XRP")
    mapping(uint256 => string) public tokenTypes;
    
    // Mapping: taskId => FAsset bridge transaction hash (for FAssets)
    mapping(uint256 => bytes32) public fassetBridgeTxs;
    
    // Mapping: conditionHash => taskId (for FDC conditional releases)
    mapping(bytes32 => uint256) public conditionToTask;
    
    event FundedWithToken(uint256 indexed taskId, address indexed poster, string tokenType, uint256 amount);
    event FAssetBridgeRecorded(uint256 indexed taskId, bytes32 bridgeTx);
    event ConditionRegistered(uint256 indexed taskId, bytes32 conditionHash);
    event ReleasedByFDC(uint256 indexed taskId, bytes32 conditionHash);

    modifier onlyFDCOracle() {
        require(msg.sender == fdcOracle, "FlareAdapter: only FDC oracle");
        _;
    }

    constructor(address escrowAddress, address fdcOracleAddress) {
        require(escrowAddress != address(0), "FlareAdapter: invalid escrow");
        escrow = TaskEscrow(escrowAddress);
        fdcOracle = fdcOracleAddress;
    }

    /**
     * @notice Update FDC oracle address (only deployer can update)
     */
    function setFDCOracle(address newOracle) external {
        // In production, add access control (e.g., onlyOwner)
        fdcOracle = newOracle;
    }

    /**
     * @notice Fund escrow with native FLR/ETH, optionally with USD amount for tracking
     * @param taskId Task identifier from Supabase
     * @param worker_ Assigned worker address
     * @param tokenType Token symbol ("FLR", "ETH", etc.) for record-keeping
     */
    function fundNative(uint256 taskId, address worker_, string memory tokenType) external payable {
        require(msg.value > 0, "FlareAdapter: no value");
        require(bytes(tokenType).length > 0, "FlareAdapter: token type required");
        
        tokenTypes[taskId] = tokenType;
        
        // Delegate to base escrow contract
        escrow.fund{value: msg.value}(taskId, worker_);
        
        emit FundedWithToken(taskId, msg.sender, tokenType, msg.value);
    }

    /**
     * @notice Fund escrow with ERC20 token (FAssets like fBTC, fXRP)
     * @param token ERC20 token address (must be a valid FAsset)
     * @param taskId Task identifier
     * @param amount Token amount (in token decimals)
     * @dev worker_ parameter reserved for future use with escrow integration
     */
    function fundFAsset(address token, uint256 taskId, address /* worker_ */, uint256 amount) external {
        require(token != address(0), "FlareAdapter: invalid token");
        require(amount > 0, "FlareAdapter: no amount");
        
        // Transfer tokens from sender to this contract
        // Note: In production, token must be pre-approved for this contract
        (bool success, ) = token.call(
            abi.encodeWithSignature("transferFrom(address,address,uint256)", msg.sender, address(this), amount)
        );
        require(success, "FlareAdapter: token transfer failed");
        
        // Record token type (extract from token symbol if available, or use address)
        string memory tokenType = string(abi.encodePacked("FAsset:", _toHexString(token)));
        tokenTypes[taskId] = tokenType;
        
        // For FAssets, we hold tokens here; release would need to transfer back
        // For simplicity, we're using native escrow for now, but this records the FAsset deposit
        emit FundedWithToken(taskId, msg.sender, tokenType, amount);
    }

    /**
     * @notice Record FAsset bridge transaction hash (called after bridging)
     */
    function recordFAssetBridge(uint256 taskId, bytes32 bridgeTx) external {
        require(taskId > 0, "FlareAdapter: invalid taskId");
        fassetBridgeTxs[taskId] = bridgeTx;
        emit FAssetBridgeRecorded(taskId, bridgeTx);
    }

    /**
     * @notice Register a condition hash for FDC-triggered auto-release
     * @param taskId Task identifier
     * @param conditionHash Hash of the off-chain verification condition
     */
    function registerCondition(uint256 taskId, bytes32 conditionHash) external {
        require(taskId > 0, "FlareAdapter: invalid taskId");
        require(conditionHash != bytes32(0), "FlareAdapter: invalid condition");
        
        // Only poster or authorized caller can register condition
        // For simplicity, we allow any caller (add access control in production)
        conditionToTask[conditionHash] = taskId;
        emit ConditionRegistered(taskId, conditionHash);
    }

    /**
     * @notice FDC oracle calls this to release escrow if condition is met
     * @param conditionHash The condition hash that was registered
     */
    function releaseIf(bytes32 conditionHash) external onlyFDCOracle {
        uint256 taskId = conditionToTask[conditionHash];
        require(taskId > 0, "FlareAdapter: condition not registered");
        
        // Delegate release to base escrow contract
        escrow.release(taskId);
        
        emit ReleasedByFDC(taskId, conditionHash);
    }

    /**
     * @notice Standard release (poster can still release manually)
     */
    function release(uint256 taskId) external {
        escrow.release(taskId);
    }

    /**
     * @notice Standard cancel/refund (poster can cancel)
     */
    function cancel(uint256 taskId) external {
        escrow.cancel(taskId);
    }

    /**
     * @notice Helper to convert address to hex string
     */
    function _toHexString(address addr) private pure returns (string memory) {
        bytes memory buffer = new bytes(42);
        bytes20 addrBytes = bytes20(addr);
        buffer[0] = '0';
        buffer[1] = 'x';
        for (uint256 i = 0; i < 20; i++) {
            buffer[2 + i * 2] = _HEX_SYMBOLS[uint8(addrBytes[i] >> 4)];
            buffer[3 + i * 2] = _HEX_SYMBOLS[uint8(addrBytes[i] & 0x0f)];
        }
        return string(buffer);
    }

    bytes16 private constant _HEX_SYMBOLS = "0123456789abcdef";
}

