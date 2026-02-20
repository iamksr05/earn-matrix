<div align="center">
  <img src="https://cryptologos.cc/logos/algorand-algo-logo.png" alt="Algorand Logo" height="120">
  <br/>
  
  <h1 align="center">Earn Matrix</h1>
  <p align="center">
    <strong>The Decentralized Operating System for Modern Campus Talent, Powered Entirely by Algorand.</strong>
  </p>

  <p align="center">
    <a href="#about-the-project">About</a> •
    <a href="#why-algorand">Why Algorand?</a> •
    <a href="#architecture">System Architecture</a> •
    <a href="#features">Key Features</a> •
    <a href="#smart-contracts">Smart Contracts</a> •
    <a href="#installation">Installation</a>
  </p>

  <p align="center">
    <img alt="GitHub code size in bytes" src="https://img.shields.io/github/languages/code-size/iamksr05/earn-matrix">
    <img alt="License" src="https://img.shields.io/badge/License-MIT-blue.svg">
    <img alt="Algorand" src="https://img.shields.io/badge/Algorand-Ecosystem-black.svg?logo=algorand">
  </p>
</div>

---

## ⚡ About The Project
**Earn Matrix** is fundamentally reshaping how campus talent networks function. Instead of fragmented university job boards, delayed banking settlements, and unverified resumes, Earn Matrix introduces an entirely autonomous, transparent, and frictionless gig economy exclusively for students.

Sponsors (companies, professors, or student organizations) can post **Grants, Bounties, and Gigs**. Students can claim these gigs, complete the work, and be paid automatically.

Every gig completed is secured via trustless smart contracts. Every payment is settled instantly on-chain in **ALGO** or **USDC**. Every piece of work acts as immutable, cryptographic proof-of-work for a student's permanent digital resume.

## 🟢 Why Algorand?
We chose Algorand as the absolute foundational layer of Earn Matrix because of its unparalleled performance for campus-scale micropayments and data integrity:

1. **Instant Finality (~3.3 seconds):** Sponsor bounty payouts settle natively on layer-1 almost instantly. There are no pending transactions, no rollups, and no waiting days for ACH bank transfers.
2. **Fractional Transaction Fees:** With fees at a fraction of a penny (0.001 ALGO), we can facilitate micro-bounties and peer-to-peer campus transfers (like buying a slice of pizza or splitting a hackathon prize) without gas fees destroying the profit.
3. **Pure Proof of Stake (PPoS):** Universities demand green technology. Algorand is functionally carbon-negative and incredibly energy-efficient, making it the perfect protocol for academic adoption.
4. **TEAL Smart Contracts:** Robust, secure, and highly predictable automated escrow systems guarantee that if a student finishes the work, the funds locked in the Algorand contract are immutably distributed, completely eliminating campus wage theft or late payments.
5. **Algorand Standard Assets (ASA):** Native tokenization at the protocol layer allows us to seamlessly integrate USDC logic without writing complex, vulnerable ERC20 wrappers.

---

## 🏗 System Architecture Flow
Earn Matrix leverages a hybrid Web2/Web3 architecture to ensure lightning-fast UI rendering while maintaining strict cryptographic security for settlements:

1. **Authentication:** Users authenticate via Web3 Wallets (Privy, Pera, Defly) which maps their Algorand Wallet Address to their Session UI.
2. **The Post & Escrow:** A Sponsor creates a "Bounty". When hitting publish, the Web3 wallet prompts the sponsor to sign an Algorand transaction, depositing the reward (ALGO/USDC) directly into the `EarnMatrixEscrow` Smart Contract. The database records the bounty metadata.
3. **The Claim & Work:** Students browse the `/bounties` board. All state (Titles, Descriptions) is fetched instantly from Supabase (PostgreSQL), while the "Funded Status" is verified by querying the Algorand Node. 
4. **The Submission:** Students submit their GitHub links or proof-of-work. The UI updates the state to `submitted`.
5. **The Settlement:** The Sponsor reviews the submission. Upon approval, the Smart Contract function `releaseEscrow` is triggered. The funds are instantaneously transferred from mathematical lockbox directly into the student's Algorand wallet via L1 consensus.
6. **The Ledger:** The database marks the task as `paid`, and the blockchain immortalizes the transaction, serving as a verifiable resume credential permanently tied to the student's DID.

---

## 🚀 Key Platform Features

### 1. On-Chain Escrow Bounties (Anti-Wage Theft)
Gigs aren't just verbal agreements; they are cryptographically locked funds. We leverage an escrow smart contract that natively interfaces with Algorand to hold, track, and release tokens trustlessly. If a sponsor funds a task, the student knows the money 100% exists and cannot be clawed back maliciously.

### 2. The Algorand "Split-Logic" Calculator Module
A built-in utility allowing students to seamlessly calculate and mathematically split bills, hardware costs, or shared project bounties. Integrated deeply with the native ASA ecosystem for frictionless peer-to-peer campus transfers.

### 3. Cryptographic Proof of Work (Verified Resumes)
When a student completes a bounty, it isn't just a line on a PDF resume or a LinkedIn post. It is a verifiable, timestamped transaction on the Algorand blockchain proving exactly what they built, the exact code repository they submitted, the sponsor who paid them, and when it happened. Employers can audit a student's history cryptographically.

### 4. DPDP Act Privacy / Consent Audit Log 
A real-time module acting as a privacy guard. It allows students to visually track and toggle which campus applications (e.g. CareerPortal, AlumniConnect) have read-access to their academic data. 

---

## � Tech Stack Deep Dive
Earn Matrix is built using a modern, scalable Web3 stack engineered for performance:

* **Blockchain / L1 Core:** [Algorand](https://algorand.com/) — Protocol Layer & Smart Contracts
* **Wallet Ecosystem:** [Privy](https://privy.io/) — Embedded Web3 Wallets & Social Logins for zero-friction student onboarding
* **Frontend Framework:** [React.js](https://react.dev/) + [Vite](https://vitejs.dev/) — Lightning fast CSR
* **Styling & UX:** [Tailwind CSS](https://tailwindcss.com/) + [Framer Motion](https://www.framer.com/motion/) — Micro-animations & responsive aesthetics
* **Backend Database:** [Supabase (PostgreSQL)](https://supabase.com/) — Relational metadata mapping
* **Node Environment:** Node.js (v18+)

---

## ⚙️ Installation & Getting Started

### Prerequisites
- Node.js installed (v18+)
- An Algorand Web3 Wallet (via Privy, Pera Wallet, or Defly)
- A Supabase Project (for backend metadata syncing)
- Optional: Python/Algosdk if deploying custom PyTeal logic

### 1. Clone the repository
```bash
git clone https://github.com/iamksr05/earn-matrix.git
cd chain-matrix
```

### 2. Frontend Setup
```bash
cd nirmanlabs-1
npm install
```

Create a `.env` file in the `nirmanlabs-1` folder and populate it. You will need an Algorand Testnet node URL (e.g. from AlgoNode):
```env
# Network and RPC
VITE_RPC_URL=https://testnet-api.algonode.cloud
VITE_CHAIN_ID=416002 

# Smart Contracts
VITE_ESCROW_ADDRESS=YOUR_DEPLOYED_ALGORAND_APP_ID

# Services
VITE_PRIVY_APP_ID=YOUR_PRIVY_ID
VITE_SUPABASE_URL=YOUR_SUPABASE_URL
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

Run the development server natively:
```bash
npm run dev
```

### 3. Smart Contract Deployment (Optional)
If you wish to deploy a fresh instance of the Escrow application to the Algorand Testnet:
```bash
cd ../smart-contracts
npm install
# Note: Ensure you have funded your deployer mnemonic via the Algorand Dispenser
npx hardhat run scripts/deploy.js --network testnet
```

---

## 🛡️ Smart Contract Architecture Overview
Our primary smart contract acts as an **Escrow Manager** written for Algorand's AVM. 
* **State:** The contract holds local state arrays tracking `TaskID` -> `(SponsorAddress, WorkerAddress, TokenAmount, Status)`.
* **Funding:** Sponsors call the application with an `AssetTransfer` inner transaction grouped containing the reward natively bound.
* **Release:** Authorized Sponsors can trigger the application to issue an `InnerTransaction` transferring the exact requested ASA balance sequentially to the student's registered worker address.

---

## 🤝 Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AlgorandIntegration`)
3. Commit your Changes (`git commit -m 'Add some AlgorandIntegration'`)
4. Push to the Branch (`git push origin feature/AlgorandIntegration`)
5. Open a Pull Request

## 📜 License
Distributed under the MIT License. See `LICENSE` for more information.

<p align="center">
  <br>
  <i>"Building the future of verifiable student work, secured mathematically by Algorand."</i>
</p>
