import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import ErrorBoundary from './components/ErrorBoundary';
import Landing from './pages/Landing';
import Home from './pages/Home';
import TaskDetail from './pages/TaskDetail';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { WalletProvider } from './contexts/WalletContext';
import './index.css';

// Polyfill for buffer in browser
import { Buffer } from 'buffer';
window.Buffer = Buffer;
globalThis.Buffer = Buffer;

// Ensure dark mode is applied globally
if (typeof document !== 'undefined') {
  document.documentElement.classList.add('dark');
}

import { PrivyProvider, usePrivy } from '@privy-io/react-auth';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Local Hardhat network configuration
const localChain = {
  id: 31337,
  name: 'Hardhat Local',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['http://127.0.0.1:8545'],
    },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'http://localhost:8545' },
  },
};

const wagmiConfig = createConfig({
  chains: [localChain],
  transports: {
    [localChain.id]: http('http://127.0.0.1:8545'),
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

document.documentElement.classList.add('dark');

// Error handler for unhandled errors
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});

const privyAppId = import.meta.env.VITE_PRIVY_APP_ID?.trim();

// Validate Privy app ID format (should be a non-empty string)
const isValidPrivyAppId = privyAppId && privyAppId.length > 0 && privyAppId !== 'dummy-id';

if (!isValidPrivyAppId) {
  console.warn('VITE_PRIVY_APP_ID is missing or invalid. Privy features will be disabled.');
  console.warn('To enable Privy, set a valid VITE_PRIVY_APP_ID in your .env file');
}

// Error boundary specifically for Privy
class PrivyErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Check if error is related to Privy
    if (error?.message?.includes('Privy') || error?.message?.includes('app ID')) {
      return { hasError: true };
    }
    return null;
  }

  componentDidCatch(error, errorInfo) {
    console.error('Privy initialization error:', error);
    console.warn('Falling back to direct MetaMask connection');
  }

  render() {
    if (this.state.hasError) {
      // Fallback to non-Privy version
      return (
        <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <AppWithoutPrivy />
          </QueryClientProvider>
        </WagmiProvider>
      );
    }

    return this.props.children;
  }
}

// App component that works with or without Privy
function AppWrapper() {
  if (!isValidPrivyAppId) {
    // Render app without Privy for local development
    return (
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <AppWithoutPrivy />
        </QueryClientProvider>
      </WagmiProvider>
    );
  }

  // Render app with Privy, wrapped in error boundary
  return (
    <PrivyErrorBoundary>
      <PrivyProvider
        appId={privyAppId}
        config={{ 
          loginMethods: ['wallet'], 
          appearance: { theme: 'dark' },
          embeddedWallets: {
            createOnLogin: 'off',
          },
        }}
      >
        <PrivyWalletWrapper>
          <WagmiProvider config={wagmiConfig}>
            <QueryClientProvider client={queryClient}>
              <App />
            </QueryClientProvider>
          </WagmiProvider>
        </PrivyWalletWrapper>
      </PrivyProvider>
    </PrivyErrorBoundary>
  );
}

// Wrapper to provide wallet context when using Privy
function PrivyWalletWrapper({ children }) {
  const { user, authenticated, login } = usePrivy();
  
  return (
    <WalletProvider 
      privyUser={user} 
      privyAuthenticated={authenticated} 
      privyLogin={login}
    >
      {children}
    </WalletProvider>
  );
}

// App component that doesn't require Privy
function AppWithoutPrivy() {
  const [walletAddress, setWalletAddress] = React.useState(null);
  const [isConnected, setIsConnected] = React.useState(false);

  const handleConnect = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setIsConnected(true);
        }
      } catch (error) {
        console.error('Failed to connect wallet:', error);
        alert('Failed to connect wallet. Please try again.');
      }
    } else {
      alert('Please install MetaMask to connect your wallet');
    }
  };

  // Check if already connected
  React.useEffect(() => {
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_accounts' }).then((accounts) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setIsConnected(true);
        }
      });

      // Listen for account changes
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setIsConnected(true);
        } else {
          setWalletAddress(null);
          setIsConnected(false);
        }
      });
    }
  }, []);

  return (
    <WalletProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-black text-white">
          {!isConnected ? (
            <Landing onConnect={handleConnect} onLaunch={handleConnect} />
          ) : (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/task/:taskId" element={<TaskDetail />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          )}
        </div>
      </BrowserRouter>
    </WalletProvider>
  );
}

try {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <AppWrapper />
      </ErrorBoundary>
    </React.StrictMode>
  );
} catch (error) {
  console.error('Failed to render app:', error);
  document.getElementById('root').innerHTML = `
    <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #000; color: #fff; flex-direction: column; padding: 20px;">
      <h1 style="color: #ef4444; margin-bottom: 20px;">Failed to Load App</h1>
      <p style="margin-bottom: 20px;">${error.message}</p>
      <button onclick="window.location.reload()" style="padding: 10px 20px; background: #3b82f6; color: white; border: none; border-radius: 5px; cursor: pointer;">
        Reload Page
      </button>
    </div>
  `;
}
