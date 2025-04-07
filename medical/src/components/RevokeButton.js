import React, { useState } from "react";
import { getContract } from "../utils/getContract";

export default function RevokeButton() {
  const [address, setAddress] = useState("");

  const revoke = async () => {
    const contract = await getContract();
    await contract.revokeCredential(address);
    alert("Credential revoked");
  };

  return (
    <div>
      <h3>Revoke Credential (Admin only)</h3>
      <input placeholder="Staff Wallet Address" onChange={(e) => setAddress(e.target.value)} />
      <button onClick={revoke}>Revoke</button>
    </div>
  );
}
