// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MedicalCredential {
    address public admin;

    struct Credential {
        string name;
        string role;
        string hospital;
        string licenseId;
        uint256 issuedAt;
        bool isValid;
    }

    mapping(address => Credential) public credentials;

    // 🔔 Events
    event CredentialIssued(address indexed staff, string name, string role);
    event CredentialRevoked(address indexed staff);

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    function issueCredential(
        address _staff,
        string memory _name,
        string memory _role,
        string memory _hospital,
        string memory _licenseId
    ) public onlyAdmin {
        credentials[_staff] = Credential({
            name: _name,
            role: _role,
            hospital: _hospital,
            licenseId: _licenseId,
            issuedAt: block.timestamp,
            isValid: true
        });

        emit CredentialIssued(_staff, _name, _role);
    }

    function revokeCredential(address _staff) public onlyAdmin {
        require(credentials[_staff].isValid, "Credential already revoked or not issued");
        credentials[_staff].isValid = false;

        emit CredentialRevoked(_staff);
    }

    function verifyCredential(address _staff) public view returns (
        string memory name,
        string memory role,
        string memory hospital,
        string memory licenseId,
        uint256 issuedAt,
        bool isValid
    ) {
        Credential memory cred = credentials[_staff];
        return (
            cred.name,
            cred.role,
            cred.hospital,
            cred.licenseId,
            cred.issuedAt,
            cred.isValid
        );
    }
}
