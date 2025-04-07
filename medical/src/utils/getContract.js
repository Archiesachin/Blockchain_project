import { ethers } from "ethers";
import abi from "../abi/MedicalCredential.json";

export const getContract = async () => {
  if (!window.ethereum) throw new Error("🦊 MetaMask not found");

  await window.ethereum.request({ method: "eth_requestAccounts" });

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

  if (!contractAddress) {
    throw new Error("❌ Contract address is not defined in .env");
  }

  return new ethers.Contract(contractAddress, abi.abi, signer);
};
