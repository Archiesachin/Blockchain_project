require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.28", // Keep the Solidity version
  networks: {
    hardhat: {
      chainId: 1337, // Hardhat's default local blockchain ID
    },
    ganache: { // Corrected network name
      url: process.env.PROVIDER_URL || "http://127.0.0.1:7545", // Default Ganache URL
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [], // Load private key safely
    }
  },
};
