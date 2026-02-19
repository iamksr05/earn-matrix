// scripts/deploy-flare-adapter.js
// Deploy FlareAdapter contract

const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying FlareAdapter with account:", deployer.address);
  
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", hre.ethers.formatEther(balance), "ETH/FLR");
  
  if (balance === 0n) {
    console.warn("⚠️  WARNING: Deployer account has zero balance. Deployment will fail.");
  }

  // Deploy TaskEscrow first if not already deployed
  // Use fully qualified name to avoid conflict with SkillSnap.sol
  const TaskEscrow = await hre.ethers.getContractFactory("contracts/TaskEscrow.sol:TaskEscrow");
  let escrowAddress = process.env.TASK_ESCROW_ADDRESS;
  
  if (!escrowAddress) {
    console.log("Deploying TaskEscrow...");
    const escrow = await TaskEscrow.deploy();
    await escrow.waitForDeployment();
    escrowAddress = await escrow.getAddress();
    console.log("TaskEscrow deployed to:", escrowAddress);
  } else {
    console.log("Using existing TaskEscrow at:", escrowAddress);
  }

  // FDC Oracle address (can be updated later)
  const fdcOracle = process.env.FDC_ORACLE_ADDRESS || deployer.address;
  console.log("Using FDC Oracle:", fdcOracle);

  // Deploy FlareAdapter
  const FlareAdapter = await hre.ethers.getContractFactory("FlareAdapter");
  const adapter = await FlareAdapter.deploy(escrowAddress, fdcOracle);
  await adapter.waitForDeployment();
  const adapterAddress = await adapter.getAddress();

  console.log("\n✅ Deployment Summary:");
  console.log("  TaskEscrow:", escrowAddress);
  console.log("  FlareAdapter:", adapterAddress);
  console.log("  FDC Oracle:", fdcOracle);
  console.log("\n📝 Add to your .env:");
  console.log(`  TASK_ESCROW_ADDRESS=${escrowAddress}`);
  console.log(`  FLARE_ADAPTER_ADDRESS=${adapterAddress}`);
  console.log(`  FDC_ORACLE_ADDRESS=${fdcOracle}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

