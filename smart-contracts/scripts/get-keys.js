const { ethers } = require("ethers");
const hre = require("hardhat");

async function main() {
    console.log("Retrieving Hardhat Network Accounts & Keys...\n");

    const accountsConfig = hre.config.networks.hardhat.accounts;

    console.log("Account # | Address                                    | Private Key");
    console.log("--------------------------------------------------------------------------------------------------");

    let loaded = false;

    // Case 1: Accounts are configured as an array of keys
    if (Array.isArray(accountsConfig)) {
        for (let i = 0; i < accountsConfig.length; i++) {
            let key = accountsConfig[i];
            if (typeof key === 'object' && key.privateKey) key = key.privateKey; // handle object format if any
            try {
                const wallet = new ethers.Wallet(key);
                console.log(`${i.toString().padEnd(9)} | ${wallet.address} | ${wallet.privateKey}`);
                loaded = true;
            } catch (e) {
                console.error(`Failed to load account ${i}:`, e.message);
            }
        }
    }
    // Case 2: Mnemonic configuration
    else if (typeof accountsConfig === 'object' && accountsConfig.mnemonic) {
        const mnemonic = accountsConfig.mnemonic;
        const path = accountsConfig.path || "m/44'/60'/0'/0";
        const initialIndex = accountsConfig.initialIndex || 0;
        const count = accountsConfig.count || 20;

        for (let i = 0; i < count; i++) {
            const derivationPath = `${path}/${initialIndex + i}`;
            const wallet = ethers.HDNodeWallet.fromPhrase(mnemonic, "", derivationPath);
            console.log(`${i.toString().padEnd(9)} | ${wallet.address} | ${wallet.privateKey}`);
        }
        loaded = true;
    }

    // Case 3: Fallback to default Hardhat mnemonic if nothing explicit is found
    if (!loaded) {
        console.log("Using default Hardhat mnemonic (config not explicit)...");
        const mnemonic = "test test test test test test test test test test test junk";
        const path = "m/44'/60'/0'/0";
        for (let i = 0; i < 20; i++) {
            const derivationPath = `${path}/${i}`;
            const wallet = ethers.HDNodeWallet.fromPhrase(mnemonic, "", derivationPath);
            console.log(`${i.toString().padEnd(9)} | ${wallet.address} | ${wallet.privateKey}`);
        }
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
