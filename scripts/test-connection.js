const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env.local" });

async function main() {
  console.log("Testing connection to deployed EvidenceLocker...");
  
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
  if (!contractAddress) {
    console.error("No contract address found in .env.local");
    process.exit(1);
  }

  console.log("Contract Address:", contractAddress);
  
  // Get the contract factory
  const EvidenceLocker = await ethers.getContractFactory("EvidenceLocker");
  const evidenceLocker = await EvidenceLocker.attach(contractAddress);

  try {
    // Try to call a read function
    const totalEvidence = await evidenceLocker.getTotalEvidence();
    console.log("Connection successful!");
    console.log("Total Evidence Count:", totalEvidence.toString());
  } catch (error) {
    console.error("Connection failed!");
    console.error(error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
