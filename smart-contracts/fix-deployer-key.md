# 🔧 Fix DEPLOYER_KEY Error

## Problem
Your `DEPLOYER_KEY` in `.env` is too short. It should be 66 characters (0x + 64 hex).

## Quick Fix

### Option 1: Get from MetaMask
1. Open MetaMask
2. Click account icon (three dots)
3. "Account details" → "Show private key"
4. Copy the FULL key (66 characters)
5. Update `smart-contracts/.env`:
   ```
   DEPLOYER_KEY=0xYourFull64CharacterPrivateKeyHere
   ```

### Option 2: Generate New Key
```bash
node -e "console.log('0x' + require('crypto').randomBytes(32).toString('hex'))"
```
Then:
1. Copy the output
2. Add to `.env` as `DEPLOYER_KEY`
3. Import to MetaMask (if needed)
4. Fund with FLR

## Verify Format
- ✅ Correct: `0x` + 64 hex characters = 66 total
- ❌ Wrong: Shorter than 66 characters

## After Fixing
```bash
npx hardhat compile
```
