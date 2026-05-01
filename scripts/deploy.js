const hre = require("hardhat");

async function main() {
  console.log("Deploying EvidenceLocker to Polygon Amoy Testnet...\n");

  const [deployer] = await hre.ethers.getSigners();
  const balance = await deployer.getBalance();

  console.log("Deployer address:", deployer.address);
  console.log("Deployer balance:", hre.ethers.utils.formatEther(balance), "MATIC\n");

  if (balance.eq(0)) {
    console.error("ERROR: No MATIC balance! Get test MATIC from https://faucet.polygon.technology/");
    process.exit(1);
  }

  // Deploy the contract
  const EvidenceLocker = await hre.ethers.getContractFactory("EvidenceLocker");
  console.log("Sending deployment transaction...");
  
  const evidenceLocker = await EvidenceLocker.deploy();
  await evidenceLocker.deployed();

  console.log("\n=== DEPLOYMENT SUCCESSFUL ===");
  console.log("Contract address:", evidenceLocker.address);
  console.log("Explorer: https://amoy.polygonscan.com/address/" + evidenceLocker.address);
  console.log("\nUpdate your .env.local:");
  console.log("NEXT_PUBLIC_CONTRACT_ADDRESS=" + evidenceLocker.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Deployment failed:", error.message || error);
    process.exit(1);
  });
