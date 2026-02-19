# ChainMatrix

**The First Decentralized Freight & Freelancing Marketplace on the Flare Network**

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)
![Network](https://img.shields.io/badge/network-Flare-orange.svg)

---

## 🟢 Project Overview

ChainMatrix is an innovative decentralized marketplace that empowers freight shipping and freelancing through blockchain technology. By leveraging the Flare Network, ChainMatrix introduces trustless transactions, escrow, cross-chain payments, and gasless user onboarding—all via modern, secure, and scalable architecture.

> **Demo:** [View Live Demo](https://chain-matrix.vercel.app/) <!-- Replace with actual demo link -->

---

## 📐 Architecture & API Overview

- **Frontend:** React + Vite, styled with Tailwind CSS and animated with Framer Motion for a bold "Antigravity" themed UI.
- **Backend:** Node.js & Express, serving RESTful APIs for authentication, pricing oracle, escrow management, FTSO data, and Flare Data Connector (FDC) integration.
- **Database:** Supabase used for storing user profiles, job postings, bounties, and transactional metadata.
- **Smart Contracts:** Deployed on Flare/Coston2, responsible for escrow, payment settlements, and cross-chain verification.
- **Auth:** Wallet-based (Privy) and social login (Clerk) options.
- **APIs Used:**
  - **FTSO**: Fetch live price data (BTC, XRP, FLR).
  - **FDC**: Enable trustless verification of payments from major blockchains.
  - **Supabase REST**: User data, jobs, escrow status.
  - **Privy/Clerk**: Authentication.
  - **Escrow Smart Contracts**: Lock, release, and dispute funds.
  <!-- Add more if you use additional APIs -->

**Flow Diagram:**

```plaintext
[ User ] <---> [ Frontend App ] <---> [ Backend API ] <---> [ Flare Network (FTSO & FDC) ]
  |                                            |                                 |
[ Wallet (Privy/Clerk) ]           [ Supabase Database ]        [ Smart Contracts (Escrow, Payments) ]
```

---

## 🚀 Key Features

*   **🛡️ Trustless Escrow:** Secure fund locking via smart contracts, released only upon verified work completion.
*   **📈 Live Market Intelligence:** Real-time asset pricing (BTC, XRP, FLR) via FTSO oracle integration.
*   **🌉 Cross-Chain Payments:** Supports on-chain verification for Bitcoin, XRP, and more through the FDC.
*   **⛽ Gasless Transactions:** Seamless user experience—no need for native Flare tokens due to Account Abstraction.
*   **🎨 Premium UI/UX:** Futuristic interface, responsive and animated for modern users.

---

## 🧩 Technology Stack

### Frontend
- **Framework:** [Vite](https://vitejs.dev/) + [React](https://react.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) + CSS
- **Animation:** [Framer Motion](https://framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Authentication:** [Privy](https://www.privy.io/) (Web3), [Clerk](https://clerk.com/) (social login)

### Backend
- **Runtime:** [Node.js](https://nodejs.org/)
- **Server:** [Express](https://expressjs.com/)
- **Database:** [Supabase](https://supabase.com/)
- **Blockchain Interaction:** [Ethers.js v6](https://docs.ethers.org/v6/)
- **APIs:** FTSO (price oracle), FDC (cross-chain validation)

### Smart Contracts
- **Network:** Flare & Coston2 Testnet
- **Framework:** [Hardhat](https://hardhat.org/)
- **Language:** Solidity 0.8.x

---

## 🗂️ Project Structure

```bash
chain-matrix/
├── backend/            # Express API server (FTSO/FDC/Supabase integration)
├── frontend/           # React + Vite client ("Antigravity" UI)
├── smart-contracts/    # Hardhat project (Escrow, Payment Contracts)
├── supabase/           # DB schema, migration files, config
└── README.md           # This documentation
```

---

## ⚡ Getting Started

### Prerequisites

- Node.js (v18+)
- Git
- Flare/Coston2 wallet private key (for contract deployment)

### 1. Installation

```bash
git clone https://github.com/yourusername/chain-matrix.git
cd chain-matrix

# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install

# Smart Contracts
cd ../smart-contracts
npm install
```

### 2. Environment Setup

Add `.env` files in each workspace as shown below:

**Backend (`backend/.env`):**
```env
FLARE_RPC=https://coston2-api.flare.network/ext/C/rpc
FTSO_ORACLE_ADDR=0x3d893C53D9e8056135C26C8c638B76C8b60Df726
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
PORT=3000
```

**Frontend (`frontend/.env`):**
```env
VITE_API_URL=http://localhost:3000
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
VITE_PRIVY_APP_ID=your_privy_id
```

### 3. Running Locally

Run each component in separate terminals:

**Backend:**
```bash
cd backend
npm run dev
# Server runs at http://localhost:3000
```

**Frontend:**
```bash
cd frontend
npm run dev
# App at http://localhost:5173
```

**Smart Contracts (Hardhat node):**
```bash
cd smart-contracts
npx hardhat node
```

---

## 📖 API Reference

| Endpoint                        | Method | Description                           |
| ------------------------------- | ------ | ------------------------------------- |
| `/api/ftso/prices`              | GET    | Returns live FTSO price data          |
| `/api/fdc/verify-tx`            | POST   | Cross-chain payment verification      |
| `/api/escrow/create`            | POST   | Create escrow contract                |
| `/api/escrow/release`           | POST   | Release escrow funds                  |
| `/api/jobs`                     | GET    | List jobs and bounties                |
| `/api/auth/login`               | POST   | Auth (Privy/Clerk, wallet, social)    |

<!-- Add more endpoints as needed from your backend/API code -->

---

## 🔮 Roadmap

- [x] "Antigravity"-themed UI
- [x] FTSO price feed integration
- [x] Live Charts page
- [ ] Smart contract audits & security hardening
- [ ] Mainnet launch (Flare Network)
- [ ] Reputation & Rating system
- [ ] Mobile responsive app

---

## 🤝 Contributing

We welcome contributors!
- Open issues for bugs, ideas, or feature requests.
- Submit pull requests.
- See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## 📄 License

MIT License. See [LICENSE](LICENSE) for details.

---

**Demo:** [Try ChainMatrix](https://chain-matrix.vercel.app/) <!-- Replace with your live demo URL -->
