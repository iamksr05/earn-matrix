// scripts/deploy-test-token.js
// Deploy TestToken for local testing

const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying TestToken with account:", deployer.address);
  
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", hre.ethers.formatEther(balance), "ETH/FLR");

  // Deploy TestToken
  const TestToken = await hre.ethers.getContractFactory("TestToken");
  const token = await TestToken.deploy(deployer.address);
  await token.waitForDeployment();
  const tokenAddress = await token.getAddress();

  console.log("\n✅ TestToken deployed to:", tokenAddress);
  console.log("Token name:", await token.name());
  console.log("Token symbol:", await token.symbol());
  console.log("Total supply:", hre.ethers.formatEther(await token.totalSupply()), "TEST");

  // Deploy NativeTokenFaucet
  const Faucet = await hre.ethers.getContractFactory("NativeTokenFaucet");
  const faucet = await Faucet.deploy();
  await faucet.waitForDeployment();
  const faucetAddress = await faucet.getAddress();

  // Fund the faucet with 100 native tokens
  const faucetAmount = hre.ethers.parseEther("100");
  const fundTx = await deployer.sendTransaction({
    to: faucetAddress,
    value: faucetAmount,
  });
  await fundTx.wait();

  console.log("\n✅ NativeTokenFaucet deployed to:", faucetAddress);
  console.log("Faucet funded with:", hre.ethers.formatEther(faucetAmount), "native tokens");

  console.log("\n📝 Add to your .env:");
  console.log(`  TEST_TOKEN_ADDRESS=${tokenAddress}`);
  console.log(`  FAUCET_ADDRESS=${faucetAddress}`);

  console.log("\n💡 To mint tokens to an address:");
  console.log(`  npx hardhat run scripts/mint-tokens.js --network localhost`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

