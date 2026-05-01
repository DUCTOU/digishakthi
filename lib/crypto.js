// utils/crypto.js
import CryptoJS from 'crypto-js';

/**
 * Generate SHA-256 hash of a file using Web Crypto API
 */
export const hashFile = async (file) => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return `SHA256:${hashHex}`;
  } catch (error) {
    console.error('Error hashing file:', error);
    throw error;
  }
};

/**
 * Generate SHA-256 hash using CryptoJS (alternative method)
 */
export const hashFileWithCryptoJS = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const wordArray = CryptoJS.lib.WordArray.create(e.target.result);
        const hash = CryptoJS.SHA256(wordArray).toString();
        resolve(`SHA256:${hash}`);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
};

/**
 * Generate hash of a string
 */
export const hashString = (str) => {
  const hash = CryptoJS.SHA256(str).toString();
  return `SHA256:${hash}`;
};

/**
 * Verify if a file matches a hash
 */
export const verifyFileHash = async (file, expectedHash) => {
  try {
    const actualHash = await hashFile(file);
    return actualHash === expectedHash;
  } catch (error) {
    console.error('Error verifying file hash:', error);
    throw error;
  }
};

/**
 * Generate unique ID for evidence
 */
export const generateEvidenceId = () => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  return `${timestamp}-${random}`;
};

/**
 * Encrypt data with AES
 */
export const encryptData = (data, password) => {
  try {
    const encrypted = CryptoJS.AES.encrypt(data, password).toString();
    return encrypted;
  } catch (error) {
    console.error('Error encrypting data:', error);
    throw error;
  }
};

/**
 * Decrypt data with AES
 */
export const decryptData = (encryptedData, password) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, password);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted;
  } catch (error) {
    console.error('Error decrypting data:', error);
    throw error;
  }
};

/**
 * Generate HMAC signature
 */
export const generateHMAC = (message, key) => {
  const hmac = CryptoJS.HmacSHA256(message, key).toString();
  return hmac;
};

/**
 * Verify HMAC signature
 */
export const verifyHMAC = (message, key, signature) => {
  const expectedHmac = generateHMAC(message, key);
  return expectedHmac === signature;
};

/**
 * Convert hash to blockchain format
 */
export const formatHashForBlockchain = (hash) => {
  // Remove prefix if exists
  return hash.replace('SHA256:', '');
};

/**
 * Parse hash from blockchain
 */
export const parseHashFromBlockchain = (hash) => {
  // Add prefix if not exists
  return hash.startsWith('SHA256:') ? hash : `SHA256:${hash}`;
};

/**
 * Generate random salt
 */
export const generateSalt = (length = 32) => {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

/**
 * Hash with salt
 */
export const hashWithSalt = (data, salt) => {
  const salted = data + salt;
  return CryptoJS.SHA256(salted).toString();
};

/**
 * Calculate file integrity checksum
 */
export const calculateChecksum = async (file) => {
  try {
    const hash = await hashFile(file);
    const metadata = {
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified
    };
    const metadataHash = hashString(JSON.stringify(metadata));
    
    return {
      fileHash: hash,
      metadataHash,
      combined: hashString(hash + metadataHash)
    };
  } catch (error) {
    console.error('Error calculating checksum:', error);
    throw error;
  }
};

/**
 * Format hash for display
 */
export const formatHashDisplay = (hash, length = 16) => {
  if (!hash) return '';
  const cleanHash = hash.replace('SHA256:', '');
  if (cleanHash.length <= length) return hash;
  return `SHA256:${cleanHash.slice(0, length)}...${cleanHash.slice(-8)}`;
};

/**
 * Validate hash format
 */
export const isValidHash = (hash) => {
  if (!hash) return false;
  const cleanHash = hash.replace('SHA256:', '');
  return /^[a-f0-9]{64}$/i.test(cleanHash);
};

/**
 * Generate proof of existence
 */
export const generateProofOfExistence = async (file) => {
  const fileHash = await hashFile(file);
  const timestamp = Date.now();
  const proof = {
    fileHash,
    timestamp,
    fileName: file.name,
    fileSize: file.size,
    fileType: file.type
  };
  
  const proofHash = hashString(JSON.stringify(proof));
  
  return {
    ...proof,
    proofHash
  };
};

/**
 * Batch hash multiple files
 */
export const batchHashFiles = async (files) => {
  try {
    const hashes = await Promise.all(
      files.map(async (file) => ({
        fileName: file.name,
        hash: await hashFile(file)
      }))
    );
    return hashes;
  } catch (error) {
    console.error('Error batch hashing files:', error);
    throw error;
  }
};

/**
 * Compare two hashes
 */
export const compareHashes = (hash1, hash2) => {
  const clean1 = hash1.replace('SHA256:', '').toLowerCase();
  const clean2 = hash2.replace('SHA256:', '').toLowerCase();
  return clean1 === clean2;
};

/**
 * Generate merkle root for multiple files
 */
export const generateMerkleRoot = (hashes) => {
  if (hashes.length === 0) return null;
  if (hashes.length === 1) return hashes[0];
  
  let currentLevel = hashes.map(h => h.replace('SHA256:', ''));
  
  while (currentLevel.length > 1) {
    const nextLevel = [];
    
    for (let i = 0; i < currentLevel.length; i += 2) {
      if (i + 1 < currentLevel.length) {
        const combined = currentLevel[i] + currentLevel[i + 1];
        const hash = CryptoJS.SHA256(combined).toString();
        nextLevel.push(hash);
      } else {
        nextLevel.push(currentLevel[i]);
      }
    }
    
    currentLevel = nextLevel;
  }
  
  return `SHA256:${currentLevel[0]}`;
};
