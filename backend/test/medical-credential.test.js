const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MedicalCredential", function () {
  let contract, owner, staff1;

  beforeEach(async function () {
    const ContractFactory = await ethers.getContractFactory("MedicalCredential");
    [owner, staff1] = await ethers.getSigners();
    contract = await ContractFactory.deploy();
    await contract.waitForDeployment();
  });

  it("Should allow admin to issue a credential", async function () {
    await contract.issueCredential(
      staff1.address,
      "Dr. John",
      "Surgeon",
      "City Hospital",
      "LIC123456"
    );

    const result = await contract.verifyCredential(staff1.address);
    expect(result[0]).to.equal("Dr. John");
    expect(result[5]).to.equal(true); // isValid
  });

  it("Should allow admin to revoke a credential", async function () {
    await contract.issueCredential(staff1.address, "Dr. John", "Surgeon", "City Hospital", "LIC123456");
    await contract.revokeCredential(staff1.address);

    const result = await contract.verifyCredential(staff1.address);
    expect(result[5]).to.equal(false); // isValid is now false
  });

  it("Should only allow admin to issue credentials", async function () {
    await expect(
      contract.connect(staff1).issueCredential(
        staff1.address,
        "Dr. John",
        "Surgeon",
        "City Hospital",
        "LIC123456"
      )
    ).to.be.revertedWith("Only admin can perform this action");
  });
});
