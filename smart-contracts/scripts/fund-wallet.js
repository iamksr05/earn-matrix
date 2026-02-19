const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    // Get address from command line argument
    const targetAddress = process.env.TARGET_ADDRESS;

    if (!targetAddress || !hre.ethers.isAddress(targetAddress)) {
        throw new Error("Please provide a valid TARGET_ADDRESS environment variable.");
    }

    console.log(`\n💰 Funding wallet: ${targetAddress}`);

    // 1. Send Native Tokens (ETH)
    const nativeAmount = hre.ethers.parseEther("100");
    console.log(`Sending 100 native tokens (ETH)...`);

    const tx = await deployer.sendTransaction({
        to: targetAddress,
        value: nativeAmount
    });
    await tx.wait();
    console.log("✅ Native tokens sent!");

    // 2. Mint TestTokens
    const TEST_TOKEN_ADDRESS = process.env.TEST_TOKEN_ADDRESS;
    if (TEST_TOKEN_ADDRESS) {
        console.log(`Minting 1000 TEST tokens...`);
        const TestToken = await hre.ethers.getContractFactory("TestToken");
        const token = TestToken.attach(TEST_TOKEN_ADDRESS);

        const mintTx = await token.mint(targetAddress, hre.ethers.parseEther("1000"));
        await mintTx.wait();
        console.log("✅ TEST tokens minted!");
    } else {
        console.log("⚠️ TEST_TOKEN_ADDRESS not found in .env, skipping token minting.");
    }

    // Check final checks
    const balance = await hre.ethers.provider.getBalance(targetAddress);
    console.log(`\nCurrent Native Balance: ${hre.ethers.formatEther(balance)} ETH`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
