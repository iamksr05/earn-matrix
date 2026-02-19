import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { PrivyProvider } from '@privy-io/react-auth'
import './index.css'
import App from './App.jsx'
import { ProjectProvider } from './context/ProjectContext'

const appId = import.meta.env.VITE_PRIVY_APP_ID || "cmiue47oh0074l10dy9nf2ymt";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PrivyProvider
      appId={appId}
      config={{
        loginMethods: ['wallet'],
        appearance: {
          theme: 'light',
          accentColor: '#6366f1',
          logo: 'https://cryptologos.cc/logos/algorand-algo-logo.png', // Or your own logo
        },
      }}
    >
      <BrowserRouter>
        <ProjectProvider>
          <App />
        </ProjectProvider>
      </BrowserRouter>
    </PrivyProvider>
  </StrictMode>,
)
