# FlareAdapter Deployment Guide

## Quick Start

### 1. Setup Environment

Create `.env` file in `smart-contracts/` directory:

```bash
# Required for deployment
DEPLOYER_KEY=0xYourPrivateKeyHere

# Flare Network RPC (required)
FLARE_RPC=https://flare-api.flare.network/ext/C/rpc

# Optional: Coston Testnet
COSTON_RPC=https://coston-api.flare.network/ext/C/rpc
```

### 2. Compile Contracts

```bash
cd smart-contracts
npx hardhat compile
```

### 3. Deploy Contracts

#### Flare Mainnet
```bash
npm run deploy:adapter
# or
npx hardhat run scripts/deploy-flare-adapter.js --network flareMainnet
```

#### Coston Testnet (for testing)
```bash
npm run deploy:adapter:coston
# or
npx hardhat run scripts/deploy-flare-adapter.js --network coston
```

### 4. Save Deployment Addresses

After deployment, update your `.env` file with the addresses:

```bash
TASK_ESCROW_ADDRESS=0x...
FLARE_ADAPTER_ADDRESS=0x...
FDC_ORACLE_ADDRESS=0x...
```

## Network Configuration

The `hardhat.config.js` supports:

- **flareMainnet** - Flare Mainnet (chainId: 16)
- **coston** - Coston Testnet (chainId: 114)
- **flowEvmMainnet** - Legacy Flow EVM support (uses Flare RPC by default)
- **localhost** - Local Hardhat network
- **sepolia** - Ethereum Sepolia testnet (optional)

## Troubleshooting

### Error: "Invalid value undefined for networks.xxx.url"

**Solution**: Set `FLARE_RPC` in your `.env` file. The config now has fallback URLs, but it's best to set it explicitly.

### Error: "Account balance is zero"

**Solution**: Fund your deployer wallet with FLR (for mainnet) or CFLR (for Coston testnet).

### Error: "Contract deployment failed"

**Possible causes**:
1. Insufficient gas in deployer wallet
2. Network RPC is down or unreachable
3. Invalid private key format

**Solution**:
- Check your wallet balance
- Verify RPC endpoint is accessible
- Ensure `DEPLOYER_KEY` starts with `0x`

## Post-Deployment

1. Verify contract addresses match on Flare Explorer:
   - Mainnet: https://flare-explorer.flare.network/
   - Coston: https://coston-explorer.flare.network/

2. Update backend `.env`:
   ```bash
   FLARE_ADAPTER_ADDRESS=0x...
   TASK_ESCROW_ADDRESS=0x...
   ```

3. Update frontend `.env`:
   ```bash
   VITE_FLARE_ADAPTER_ADDRESS=0x...
   VITE_ESCROW_ADDRESS=0x...
   ```

4. Set FDC Oracle (if different from deployer):
   - Update `FDC_ORACLE_ADDRESS` in contract via `setFDCOracle()` function

## Security Notes

⚠️ **Never commit `.env` file to git!**

- Keep `DEPLOYER_KEY` secure
- Use a separate wallet for deployment
- Consider using a multisig for FDC Oracle address
- Verify contract code on block explorer after deployment

