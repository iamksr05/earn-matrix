// Configuration for API keys and smart contract
export const config = {
  // Mapbox
  mapboxToken: import.meta.env.VITE_MAPBOX_API,
  
  // Wallet providers
  dynamicKey: import.meta.env.VITE_DYNAMIC_KEY,
  privyAppId: import.meta.env.VITE_PRIVY_APP_ID,
  
  // Smart Contracts
  contractAddress: import.meta.env.VITE_CONTRACT_ADDRESS,
  flareAdapterAddress: import.meta.env.VITE_FLARE_ADAPTER_ADDRESS,
  escrowAddress: import.meta.env.VITE_ESCROW_ADDRESS,
  networkId: import.meta.env.VITE_NETWORK_ID || '16', // Flare Mainnet (use 114 for Coston testnet)
  
  // Flare Configuration
  flareRpc: import.meta.env.VITE_FLARE_RPC || 'https://flare-api.flare.network/ext/C/rpc',
  ftsoOracleAddr: import.meta.env.VITE_FTSO_ORACLE_ADDR,
  fdcEndpoint: import.meta.env.VITE_FDC_ENDPOINT,
  fassetBridgeAddr: import.meta.env.VITE_FASSET_BRIDGE_ADDR,
  smartAccountFactory: import.meta.env.VITE_SMART_ACCOUNT_FACTORY,
  
  // API
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  
  // Network configurations
  networks: {
    flare: {
      chainId: '0x10',
      chainName: 'Flare Mainnet',
      rpcUrls: ['https://flare-api.flare.network/ext/C/rpc'],
      blockExplorerUrls: ['https://flare-explorer.flare.network/'],
      nativeCurrency: {
        name: 'FLR',
        symbol: 'FLR',
        decimals: 18,
      },
    },
    coston: {
      chainId: '0x72',
      chainName: 'Coston Testnet',
      rpcUrls: ['https://coston-api.flare.network/ext/C/rpc'],
      blockExplorerUrls: ['https://coston-explorer.flare.network/'],
      nativeCurrency: {
        name: 'CFLR',
        symbol: 'CFLR',
        decimals: 18,
      },
    },
    // Legacy support
    sepolia: {
      chainId: '0xaa36a7',
      chainName: 'Sepolia Test Network',
      rpcUrls: ['https://sepolia.infura.io/v3/YOUR_INFURA_KEY'],
      blockExplorerUrls: ['https://sepolia.etherscan.io/'],
      nativeCurrency: {
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18,
      },
    },
  }
};

export default config;
