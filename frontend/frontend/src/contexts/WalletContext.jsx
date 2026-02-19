// Wallet context that works with or without Privy
import React, { createContext, useContext, useState, useEffect } from 'react';

const WalletContext = createContext(null);

export function WalletProvider({ children, privyUser, privyAuthenticated, privyLogin }) {
  const [walletAddress, setWalletAddress] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  // If using Privy, get wallet from Privy
  useEffect(() => {
    if (privyUser && privyAuthenticated) {
      const addr = privyUser?.wallet?.address || 
                   privyUser?.linkedAccounts?.find((a) => a.type === "wallet")?.address;
      if (addr) {
        setWalletAddress(addr);
        setIsConnected(true);
      } else {
        setWalletAddress(null);
        setIsConnected(false);
      }
    }
  }, [privyUser, privyAuthenticated]);

  const connectWallet = async () => {
    if (privyLogin) {
      // Use Privy login
      await privyLogin();
    } else if (window.ethereum) {
      // Direct MetaMask connection
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setIsConnected(true);
        }
      } catch (error) {
        console.error('Failed to connect wallet:', error);
        throw error;
      }
    } else {
      throw new Error('Please install MetaMask to connect your wallet');
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    setIsConnected(false);
  };

  return (
    <WalletContext.Provider value={{
      walletAddress,
      isConnected,
      connectWallet,
      disconnectWallet,
    }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within WalletProvider');
  }
  return context;
}

