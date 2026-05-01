// utils/blockchain.js
import { ethers } from 'ethers';

// Contract ABI - Simplified version for key functions
const CONTRACT_ABI = [
  "function storeEvidence(string memory _ipfsHash, string memory _fileHash, string memory _metadata) public returns (uint256)",
  "function getEvidence(uint256 _evidenceId) public view returns (string memory ipfsHash, string memory fileHash, uint256 timestamp, address owner, string memory metadata)",
  "function getMyEvidence(address _owner) public view returns (uint256[] memory)",
  "function verifyEvidence(uint256 _evidenceId, string memory _fileHash) public returns (bool)",
  "function getTotalEvidence() public view returns (uint256)",
  "function getEvidenceCount(address _owner) public view returns (uint256)",
  "event EvidenceStored(uint256 indexed evidenceId, address indexed owner, string ipfsHash, string fileHash, uint256 timestamp)"
];

// Polygon Amoy Testnet Configuration
const NETWORK_CONFIG = {
  chainId: '0x13882', 
  chainName: 'Polygon Amoy Testnet',
  nativeCurrency: {
    name: 'MATIC',
    symbol: 'MATIC',
    decimals: 18
  },
  rpcUrls: ['https://rpc-amoy.polygon.technology'],
  blockExplorerUrls: ['https://amoy.polygonscan.com/']
};

/**
 * Check if MetaMask is installed
 */
export const isMetaMaskInstalled = () => {
  return typeof window !== 'undefined' && typeof window.ethereum !== 'undefined';
};

/**
 * Connect to MetaMask wallet
 */
export const connectWallet = async () => {
  try {
    if (!isMetaMaskInstalled()) {
      throw new Error('MetaMask is not installed. Please install MetaMask extension.');
    }

    // Request account access
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts'
    });

    // Check if on correct network
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    
    if (chainId !== NETWORK_CONFIG.chainId) {
      await switchToPolygonAmoy();
    }

    return {
      address: accounts[0],
      connected: true
    };
  } catch (error) {
    console.error('Error connecting wallet:', error);
    throw error;
  }
};

/**
 * Switch to Polygon Amoy Testnet
 */
export const switchToPolygonAmoy = async () => {
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: NETWORK_CONFIG.chainId }],
    });
  } catch (switchError) {
    // This error code indicates that the chain has not been added to MetaMask
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [NETWORK_CONFIG],
        });
      } catch (addError) {
        throw new Error('Failed to add Polygon Amoy network to MetaMask');
      }
    } else {
      throw switchError;
    }
  }
};

/**
 * Get provider and signer
 */
export const getProviderAndSigner = async () => {
  if (!isMetaMaskInstalled()) {
    throw new Error('MetaMask not installed');
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const address = await signer.getAddress();

  return { provider, signer, address };
};

/**
 * Get contract instance
 */
export const getContract = async () => {
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
  
  if (!contractAddress) {
    throw new Error('Contract address not configured. Please deploy contract and update .env.local');
  }

  const { signer } = await getProviderAndSigner();
  const contract = new ethers.Contract(contractAddress, CONTRACT_ABI, signer);

  return contract;
};

/**
 * Store evidence on blockchain
 */
export const storeEvidenceOnChain = async (ipfsHash, fileHash, metadata = '') => {
  try {
    const contract = await getContract();
    
    // Estimate gas
    const gasEstimate = await contract.estimateGas.storeEvidence(
      ipfsHash,
      fileHash,
      metadata
    );

    // Add 20% buffer to gas estimate
    const gasLimit = gasEstimate.mul(120).div(100);

    // Send transaction
    const tx = await contract.storeEvidence(ipfsHash, fileHash, metadata, {
      gasLimit
    });

    console.log('Transaction sent:', tx.hash);

    // Wait for confirmation
    const receipt = await tx.wait();
    console.log('Transaction confirmed:', receipt);

    // Extract evidence ID from event
    const event = receipt.events.find(e => e.event === 'EvidenceStored');
    const evidenceId = event.args.evidenceId.toNumber();

    return {
      success: true,
      evidenceId,
      transactionHash: receipt.transactionHash,
      blockNumber: receipt.blockNumber
    };
  } catch (error) {
    console.error('Error storing evidence:', error);
    throw error;
  }
};

/**
 * Get evidence details from blockchain
 */
export const getEvidenceFromChain = async (evidenceId) => {
  try {
    const contract = await getContract();
    const evidence = await contract.getEvidence(evidenceId);

    return {
      ipfsHash: evidence.ipfsHash,
      fileHash: evidence.fileHash,
      timestamp: evidence.timestamp.toNumber(),
      owner: evidence.owner,
      metadata: evidence.metadata
    };
  } catch (error) {
    console.error('Error getting evidence:', error);
    throw error;
  }
};

/**
 * Get all evidence for current user
 */
export const getMyEvidences = async () => {
  try {
    const { address } = await getProviderAndSigner();
    const contract = await getContract();
    
    const evidenceIds = await contract.getMyEvidence(address);
    
    // Fetch details for each evidence
    const evidences = await Promise.all(
      evidenceIds.map(async (id) => {
        const evidence = await getEvidenceFromChain(id.toNumber());
        return {
          id: id.toNumber(),
          ...evidence
        };
      })
    );

    return evidences;
  } catch (error) {
    console.error('Error getting my evidences:', error);
    throw error;
  }
};

/**
 * Verify evidence hash on blockchain
 */
export const verifyEvidenceOnChain = async (evidenceId, fileHash) => {
  try {
    const contract = await getContract();
    const isValid = await contract.verifyEvidence(evidenceId, fileHash);

    return isValid;
  } catch (error) {
    console.error('Error verifying evidence:', error);
    throw error;
  }
};

/**
 * Get total evidence count
 */
export const getTotalEvidenceCount = async () => {
  try {
    const contract = await getContract();
    const count = await contract.getTotalEvidence();
    return count.toNumber();
  } catch (error) {
    console.error('Error getting total evidence count:', error);
    throw error;
  }
};

/**
 * Listen to account changes
 */
export const onAccountsChanged = (callback) => {
  if (isMetaMaskInstalled()) {
    window.ethereum.on('accountsChanged', callback);
  }
};

/**
 * Listen to network changes
 */
export const onChainChanged = (callback) => {
  if (isMetaMaskInstalled()) {
    window.ethereum.on('chainChanged', callback);
  }
};

/**
 * Format address for display
 */
export const formatAddress = (address) => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

/**
 * Get block explorer URL for transaction
 */
export const getExplorerUrl = (txHash) => {
  return `${NETWORK_CONFIG.blockExplorerUrls[0]}/tx/${txHash}`;
};
