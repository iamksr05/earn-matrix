// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title NativeTokenFaucet
 * @notice Faucet contract for native tokens (ETH/FLR) on local Hardhat network
 * @dev Allows users to request native tokens for testing
 */
contract NativeTokenFaucet {
    mapping(address => uint256) public lastRequestTime;
    uint256 public constant REQUEST_AMOUNT = 1 ether; // 1 native token
    uint256 public constant COOLDOWN_PERIOD = 1 hours; // 1 hour cooldown between requests

    event TokensRequested(address indexed recipient, uint256 amount);

    /**
     * @notice Request native tokens from faucet
     * @dev Can only request once per cooldown period
     */
    function requestTokens() external {
        require(
            block.timestamp >= lastRequestTime[msg.sender] + COOLDOWN_PERIOD,
            "Faucet: cooldown period not elapsed"
        );

        lastRequestTime[msg.sender] = block.timestamp;
        
        (bool success, ) = payable(msg.sender).call{value: REQUEST_AMOUNT}("");
        require(success, "Faucet: transfer failed");

        emit TokensRequested(msg.sender, REQUEST_AMOUNT);
    }

    /**
     * @notice Get native tokens (fallback function)
     */
    receive() external payable {
        // Allow contract to receive native tokens
    }

    /**
     * @notice Owner can withdraw native tokens (for testing)
     */
    function withdraw() external {
        (bool success, ) = payable(msg.sender).call{value: address(this).balance}("");
        require(success, "Withdraw failed");
    }
}

