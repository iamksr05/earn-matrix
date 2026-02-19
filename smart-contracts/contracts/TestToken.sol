// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title TestToken
 * @notice A simple ERC20 token for testing task acceptance and funding
 * @dev Can be minted by owner for testing purposes
 */
contract TestToken is ERC20, Ownable {
    constructor(address initialOwner) ERC20("Test Token", "TEST") Ownable(initialOwner) {
        // Mint initial supply to deployer
        _mint(initialOwner, 1000000 * 10**decimals()); // 1M tokens
    }

    /**
     * @notice Mint tokens to an address (for testing)
     * @param to Address to mint tokens to
     * @param amount Amount of tokens to mint
     */
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    /**
     * @notice Mint tokens to multiple addresses (for testing)
     * @param recipients Array of addresses to mint to
     * @param amounts Array of amounts to mint
     */
    function mintBatch(address[] calldata recipients, uint256[] calldata amounts) external onlyOwner {
        require(recipients.length == amounts.length, "Arrays length mismatch");
        for (uint256 i = 0; i < recipients.length; i++) {
            _mint(recipients[i], amounts[i]);
        }
    }

    /**
     * @notice Get decimals (18, standard ERC20)
     */
    function decimals() public pure override returns (uint8) {
        return 18;
    }
}

