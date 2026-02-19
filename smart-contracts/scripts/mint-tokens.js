// scripts/mint-tokens.js
// Mint test tokens to addresses

const hre = require("hardhat");

async function main() {
  const [deployer, ...accounts] = await hre.ethers.getSigners();
  
  const TEST_TOKEN_ADDRESS = process.env.TEST_TOKEN_ADDRESS;
  if (!TEST_TOKEN_ADDRESS) {
    throw new Error("TEST_TOKEN_ADDRESS not set in .env");
  }

  const TestToken = await hre.ethers.getContractFactory("TestToken");
  const token = TestToken.attach(TEST_TOKEN_ADDRESS);

  console.log("Minting test tokens...");
  console.log("Token address:", TEST_TOKEN_ADDRESS);

  // Mint 1000 tokens to each account (including deployer)
  const amount = hre.ethers.parseEther("1000");
  const allAccounts = [deployer, ...accounts].slice(0, 5); // Limit to 5 accounts

  for (const account of allAccounts) {
    try {
      const tx = await token.mint(account.address, amount);
      await tx.wait();
      console.log(`✅ Minted 1000 TEST to ${account.address}`);
    } catch (error) {
      console.error(`❌ Failed to mint to ${account.address}:`, error.message);
    }
  }

  console.log("\n✅ Token minting complete!");
  console.log("\n📋 Account balances:");
  for (const account of allAccounts) {
    const balance = await token.balanceOf(account.address);
    console.log(`  ${account.address}: ${hre.ethers.formatEther(balance)} TEST`);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

