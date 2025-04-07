import React, { useState } from "react";
import { ethers } from "ethers";
import { getContract } from "../utils/getContract";

export default function CredentialForm() {
    const [form, setForm] = useState({
        address: "", name: "", role: "", hospital: "", licenseId: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            if (!form.address || !form.name || !form.role || !form.hospital || !form.licenseId) {
                alert("Please fill in all fields.");
                return;
            }

            const contract = await getContract();
            const admin = await contract.admin();
            console.log("Admin:", admin);

            contract.getAdmin().then(console.log).catch(console.error);

            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const signerAddress = await signer.getAddress();
            console.log("Signer:", signerAddress);

            const adminAddress = await contract.admin(); // ✔️ No getAdmin() needed

            console.log(adminAddress + 'admin');
            if (signerAddress.toLowerCase() !== adminAddress.toLowerCase()) {
                alert("Only the admin can issue credentials.");
                return;
            }
            await contract.issueCredential(form.address, form.name, form.role, form.hospital, form.licenseId);
            console.log("Credential issued");

            alert("✅ Credential issued!");
        } catch (err) {
            console.error("❌ Error issuing credential:", err);
            alert("Error issuing credential. See console.");
        }
    };

    return (
        <div>
            <h3>Issue Credential (Admin only)</h3>
            <input name="address" placeholder="Staff Wallet Address" value={form.address} onChange={handleChange} />
            <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} />
            <input name="role" placeholder="Role" value={form.role} onChange={handleChange} />
            <input name="hospital" placeholder="Hospital" value={form.hospital} onChange={handleChange} />
            <input name="licenseId" placeholder="License ID" value={form.licenseId} onChange={handleChange} />
            <button onClick={handleSubmit}>Issue Credential</button>
        </div>
    );
}
