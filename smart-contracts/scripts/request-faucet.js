// scripts/request-faucet.js
// Request native tokens from faucet

const hre = require("hardhat");

async function main() {
  const [account] = await hre.ethers.getSigners();
  
  const FAUCET_ADDRESS = process.env.FAUCET_ADDRESS;
  if (!FAUCET_ADDRESS) {
    throw new Error("FAUCET_ADDRESS not set in .env");
  }

  const Faucet = await hre.ethers.getContractFactory("NativeTokenFaucet");
  const faucet = Faucet.attach(FAUCET_ADDRESS);

  console.log("Requesting tokens from faucet...");
  console.log("Account:", account.address);
  console.log("Faucet address:", FAUCET_ADDRESS);

  const balanceBefore = await hre.ethers.provider.getBalance(account.address);
  console.log("Balance before:", hre.ethers.formatEther(balanceBefore), "ETH/FLR");

  try {
    const tx = await faucet.requestTokens();
    await tx.wait();
    
    const balanceAfter = await hre.ethers.provider.getBalance(account.address);
    console.log("Balance after:", hre.ethers.formatEther(balanceAfter), "ETH/FLR");
    console.log("✅ Received 1 native token from faucet!");
  } catch (error) {
    if (error.message.includes("cooldown")) {
      console.log("⏳ Cooldown period not elapsed. Wait 1 hour or use a different account.");
    } else {
      console.error("❌ Error:", error.message);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

