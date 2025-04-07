import React from "react";
import CredentialForm from "./components/CredentialForm";
import CredentialViewer from "./components/CredentialViewer";
import RevokeButton from "./components/RevokeButton";

function App() {
  return (
    <div style={{ padding: 20 }}>
      <h1>🧾 Medical Credential Verification</h1>
      <CredentialForm />
      <hr />
      <RevokeButton />
      <hr />
      <CredentialViewer />
    </div>
  );
}

export default App;
