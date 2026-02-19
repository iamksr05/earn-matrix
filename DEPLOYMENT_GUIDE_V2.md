# Deployment Guide

This guide covers how to deploy the **ChainMatrix** application.
- **Frontend**: Vercel
- **Backend**: Vercel (Recommended) or Render

## Option 1: Full Deployment on Vercel (Recommended)

Since the backend includes a `vercel.json` configuration, you can deploy both the frontend and backend to Vercel. This is often the easiest path.

### 1. Backend Deployment (Vercel)

1.  Push your code to a GitHub repository.
2.  Go to [Vercel Dashboard](https://vercel.com/dashboard) and click **Add New > Project**.
3.  Import your GitHub repository.
4.  **Framework Preset**: Select **Other**.
5.  **Root Directory**: Click "Edit" and select `backend`.
6.  **Environment Variables**: Add the following variables from your `.env`:
    - `FLARE_RPC`
    - `FTSO_ADDRESS` (use `0x3d893C53D9e8056135C26C8c638B76C8b60Df726`)
    - `SUPABASE_URL`
    - `SUPABASE_KEY`
    - `SPONSOR_WALLET_PRIVATE_KEY` (if using smart accounts)
7.  Click **Deploy**.
8.  **Note the URL**: You will get a URL like `https://your-backend.vercel.app`.

### 2. Frontend Deployment (Vercel)

1.  Go to [Vercel Dashboard](https://vercel.com/dashboard) and click **Add New > Project**.
2.  Import the **SAME** GitHub repository.
3.  **Framework Preset**: Vercel should auto-detect **Vite**.
4.  **Root Directory**: Click "Edit" and select `frontend`.
5.  **Environment Variables**:
    - `VITE_API_URL`: Set this to your **Backend URL** from the previous step (e.g., `https://your-backend.vercel.app`).
    - `VITE_CLERK_PUBLISHABLE_KEY`: Your Clerk Key.
    - `VITE_PRIVY_APP_ID`: Your Privy App ID.
    - `VITE_MAPBOX_API`: Your Mapbox token.
    - Other `VITE_` variables from your `.env`.
6.  Click **Deploy**.

---

## Option 2: Frontend on Vercel, Backend on Render

If you prefer Render for the backend (e.g., for persistent background jobs), follow these steps.

### 1. Backend Deployment (Render)

1.  Push your code to GitHub.
2.  Go to [Render Dashboard](https://dashboard.render.com/) and click **New > Web Service**.
3.  Connect your GitHub repository.
4.  **Root Directory**: `backend`
5.  **Build Command**: `npm install`
6.  **Start Command**: `node server.js`
7.  **Environment Variables**: Add all variables from your backend `.env`.
8.  Click **Create Web Service**.
9.  **Note the URL**: Copty the provided Render URL.

### 2. Frontend Deployment (Vercel)

Follow the same steps as **Option 1 (Frontend)**, but set `VITE_API_URL` to your **Render Backend URL**.

---

## Important Configurations

### 1. CORS
Ensure your backend allows requests from your frontend domain. In `backend/server.js`, you might need to update CORS if it's too restrictive, but `app.use(cors())` usually allows all origins by default, which is fine for initial testing.

### 2. FTSO Optimization
The backend currently connects to the **Coston2 Testnet**. Ensure your frontend wallet (MetaMask) is also connected to Coston2 if you are interacting with smart contracts there.


---

## Smart Contracts (Important!)

You do **NOT** host smart contracts like a website. Instead, you **deploy** them to the blockchain once. They then live there correctly forever.

### 1. Deploy to Flare Coston2 Testnet
Run the following command in your `smart-contracts` folder:

```bash
npx hardhat run scripts/deploy-flare-adapter.js --network coston
```

### 2. Update Environment Variables
The deployment script will print the **Contract Address**. You must update this address in your project:

1.  **Frontend**: Update `VITE_FLARE_ADAPTER_ADDRESS` in `frontend/.env`.
2.  **Backend**: Update `FLARE_ADAPTER_ADDRESS` in `backend/.env`.

Re-deploy your frontend and backend if you change these variables.

---

## Verification
After deployment:
1.  Open your Frontend URL.
2.  Navigate to **Live Charts**.
3.  Verify that prices are loading (this confirms Frontend -> Backend communication).

---

## Troubleshooting

### "404: NOT_FOUND" or "ID: bom1::..." Error
If you see an error like `ID: bom1::...` when clicking confirm or entering amounts, it means your **Frontend cannot find your Backend**.

**Cause**: `VITE_API_URL` is missing or incorrect in your Vercel Frontend settings.

**Fix**:
1.  Go to your Vercel Project Settings -> **Environment Variables**.
2.  Add/Update `VITE_API_URL`.
3.  Value: Your **Render Backend URL** (e.g., `https://chain-matrix-backend.onrender.com`).
4.  **Important**: You must **Redeploy** the frontend for this change to take effect (go to Deployments -> Redeploy).
