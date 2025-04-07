import React, { useState } from "react";
import { getContract } from "../utils/getContract";

export default function CredentialViewer() {
  const [address, setAddress] = useState("");
  const [data, setData] = useState(null);

  const fetchCredential = async () => {
    try {
      const contract = await getContract();

      if (!address || address.length !== 42) {
        alert("Please enter a valid Ethereum address.");
        return;
      }

      const result = await contract.verifyCredential(address);

      // If no name, it means no credential issued
      if (!result[0] || result[0] === "") {
        alert("No credential found for this address.");
        setData(null);
        return;
      }

      setData({
        name: result[0],
        role: result[1],
        hospital: result[2],
        licenseId: result[3],
        issuedAt: new Date(Number(result[4]) * 1000).toLocaleString(),
        isValid: result[5],
      });
    } catch (err) {
      console.error("❌ Error fetching credential:", err);
      alert("Could not fetch credential. See console for details.");
      setData(null);
    }
  };

  return (
    <div>
      <h3>🔍 Verify Credential</h3>
      <input
        placeholder="Enter Wallet Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        style={{ width: "300px", marginRight: "10px" }}
      />
      <button onClick={fetchCredential}>Check</button>

      {data && (
        <div style={{ marginTop: "20px" }}>
          <p><strong>👤 Name:</strong> {data.name}</p>
          <p><strong>🏥 Role:</strong> {data.role}</p>
          <p><strong>🏨 Hospital:</strong> {data.hospital}</p>
          <p><strong>🆔 License ID:</strong> {data.licenseId}</p>
          <p><strong>📅 Issued At:</strong> {data.issuedAt}</p>
          <p><strong>📌 Status:</strong> {data.isValid ? "✅ Valid" : "❌ Revoked"}</p>
        </div>
      )}
    </div>
  );
}
