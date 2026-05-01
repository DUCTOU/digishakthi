// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

/**
 * @title EvidenceLocker
 * @dev Immutable evidence storage with cryptographic verification
 * @author Digital Shakti Team
 */
contract EvidenceLocker {
    
    // Evidence structure
    struct Evidence {
        string ipfsHash;        // IPFS CID where file is stored
        string fileHash;        // SHA-256 hash of the original file
        uint256 timestamp;      // When evidence was stored
        address owner;          // Wallet address of evidence owner
        string metadata;        // Optional metadata (location, type, etc.)
        bool exists;            // Check if evidence exists
    }
    
    // Mapping from evidence ID to Evidence
    mapping(uint256 => Evidence) public evidences;
    
    // Mapping from owner address to their evidence IDs
    mapping(address => uint256[]) public ownerToEvidences;
    
    // Counter for evidence IDs
    uint256 public evidenceCounter;
    
    // Events
    event EvidenceStored(
        uint256 indexed evidenceId,
        address indexed owner,
        string ipfsHash,
        string fileHash,
        uint256 timestamp
    );
    
    event EvidenceVerified(
        uint256 indexed evidenceId,
        address indexed verifier,
        bool isValid
    );
    
    /**
     * @dev Store new evidence on the blockchain
     * @param _ipfsHash IPFS CID of the uploaded file
     * @param _fileHash SHA-256 hash of the original file
     * @param _metadata Optional metadata (JSON string)
     * @return evidenceId Unique ID of the stored evidence
     */
    function storeEvidence(
        string memory _ipfsHash,
        string memory _fileHash,
        string memory _metadata
    ) public returns (uint256) {
        require(bytes(_ipfsHash).length > 0, "IPFS hash cannot be empty");
        require(bytes(_fileHash).length > 0, "File hash cannot be empty");
        
        evidenceCounter++;
        uint256 newEvidenceId = evidenceCounter;
        
        evidences[newEvidenceId] = Evidence({
            ipfsHash: _ipfsHash,
            fileHash: _fileHash,
            timestamp: block.timestamp,
            owner: msg.sender,
            metadata: _metadata,
            exists: true
        });
        
        ownerToEvidences[msg.sender].push(newEvidenceId);
        
        emit EvidenceStored(
            newEvidenceId,
            msg.sender,
            _ipfsHash,
            _fileHash,
            block.timestamp
        );
        
        return newEvidenceId;
    }
    
    /**
     * @dev Get evidence details by ID
     * @param _evidenceId ID of the evidence to retrieve
     * @return ipfsHash IPFS CID where file is stored
     * @return fileHash SHA-256 hash of the original file
     * @return timestamp When evidence was stored
     * @return owner Wallet address of evidence owner
     * @return metadata Optional metadata string
     */
    function getEvidence(uint256 _evidenceId) 
        public 
        view 
        returns (
            string memory ipfsHash,
            string memory fileHash,
            uint256 timestamp,
            address owner,
            string memory metadata
        ) 
    {
        require(evidences[_evidenceId].exists, "Evidence does not exist");
        
        Evidence memory evidence = evidences[_evidenceId];
        return (
            evidence.ipfsHash,
            evidence.fileHash,
            evidence.timestamp,
            evidence.owner,
            evidence.metadata
        );
    }
    
    /**
     * @dev Get all evidence IDs owned by an address
     * @param _owner Address of the evidence owner
     * @return Array of evidence IDs
     */
    function getMyEvidence(address _owner) 
        public 
        view 
        returns (uint256[] memory) 
    {
        return ownerToEvidences[_owner];
    }
    
    /**
     * @dev Verify if a file hash matches stored evidence
     * @param _evidenceId ID of the evidence to verify
     * @param _fileHash Hash of the file to verify
     * @return True if hashes match, false otherwise
     */
    function verifyEvidence(uint256 _evidenceId, string memory _fileHash) 
        public 
        returns (bool) 
    {
        require(evidences[_evidenceId].exists, "Evidence does not exist");
        
        bool isValid = keccak256(abi.encodePacked(evidences[_evidenceId].fileHash)) == 
                       keccak256(abi.encodePacked(_fileHash));
        
        emit EvidenceVerified(_evidenceId, msg.sender, isValid);
        
        return isValid;
    }
    
    /**
     * @dev Get total number of evidences stored
     * @return Total evidence count
     */
    function getTotalEvidence() public view returns (uint256) {
        return evidenceCounter;
    }
    
    /**
     * @dev Get number of evidences owned by an address
     * @param _owner Address to check
     * @return Count of evidences owned
     */
    function getEvidenceCount(address _owner) public view returns (uint256) {
        return ownerToEvidences[_owner].length;
    }
}
