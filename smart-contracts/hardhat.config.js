// contracts/hardhat.config.js
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const with0x = (k) => {
  if (!k) return undefined;
  // Remove any whitespace
  k = String(k).trim();
  // If it already starts with 0x, return as is
  if (k.startsWith("0x")) return k;
  // Otherwise add 0x prefix
  return "0x" + k;
};

// Validate private key format
const validatePrivateKey = (key) => {
  if (!key) return undefined;
  const cleaned = String(key).trim();
  // Private key should be 0x + 64 hex characters = 66 total
  if (cleaned.startsWith("0x") && cleaned.length === 66) {
    return cleaned;
  }
  // If it's too short, it might be an address - return undefined to skip
  if (cleaned.length < 66) {
    console.warn(`⚠️  Warning: DEPLOYER_KEY appears to be too short (${cleaned.length} chars). Expected 66 characters (0x + 64 hex).`);
    return undefined;
  }
  return cleaned;
};

module.exports = {
  solidity: "0.8.24",
  networks: {
    // Flare Mainnet (auto-detects chain ID from RPC)
    flareMainnet: {
      url: process.env.FLARE_RPC || "https://flare-api.flare.network/ext/C/rpc",
      // Chain ID auto-detected from RPC to avoid mismatches
      accounts: validatePrivateKey(process.env.DEPLOYER_KEY) ? [validatePrivateKey(process.env.DEPLOYER_KEY)] : [],
    },
    // Songbird (chain ID 14) - Flare's canary network
    songbird: {
      url: process.env.SONGBIRD_RPC || "https://songbird-api.flare.network/ext/C/rpc",
      chainId: 14,
      accounts: validatePrivateKey(process.env.DEPLOYER_KEY) ? [validatePrivateKey(process.env.DEPLOYER_KEY)] : [],
    },
    // Flare Coston Testnet
    coston: {
      url: process.env.COSTON_RPC || "https://coston2-api.flare.network/ext/C/rpc",
      chainId: 114,
      accounts: validatePrivateKey(process.env.DEPLOYER_KEY) ? [validatePrivateKey(process.env.DEPLOYER_KEY)] : [],
    },
    // Flow EVM Mainnet (legacy support)
    flowEvmMainnet: {
      url: process.env.FLOW_EVM_MAINNET_RPC || process.env.FLARE_RPC || "https://flare-api.flare.network/ext/C/rpc",
      accounts: validatePrivateKey(process.env.DEPLOYER_KEY) ? [validatePrivateKey(process.env.DEPLOYER_KEY)] : [],
    },
    // Localhost for testing
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    // Sepolia (optional, for testing)
    sepolia: {
      url: process.env.SEPOLIA_RPC || "https://sepolia.infura.io/v3/YOUR_INFURA_KEY",
      accounts: validatePrivateKey(process.env.DEPLOYER_KEY) ? [validatePrivateKey(process.env.DEPLOYER_KEY)] : [],
    },
  },
};
