const hre = require("hardhat");

async function main() {
  const CredentialContractFactory = await hre.ethers.getContractFactory("MedicalCredential");
  console.log("Deploying MedicalCredential contract...");

  const credentialContract = await CredentialContractFactory.deploy();
  await credentialContract.waitForDeployment();

  const contractAddress = await credentialContract.getAddress();
  console.log(`✅ MedicalCredential contract deployed to: ${contractAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(" Error deploying contract:", error);
    process.exit(1);
  });