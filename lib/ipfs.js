// utils/ipfs.js
import axios from 'axios';

const PINATA_API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY;
const PINATA_SECRET_KEY = process.env.NEXT_PUBLIC_PINATA_SECRET_KEY;

const PINATA_BASE_URL = 'https://api.pinata.cloud';
const PINATA_GATEWAY = 'https://gateway.pinata.cloud/ipfs/';

/**
 * Check if Pinata credentials are configured
 */
export const isPinataConfigured = () => {
  return Boolean(PINATA_API_KEY && PINATA_SECRET_KEY);
};

/**
 * Upload file to IPFS via Pinata
 */
export const uploadToIPFS = async (file, metadata = {}) => {
  try {
    if (!isPinataConfigured()) {
      throw new Error('Pinata credentials not configured. Please add API keys to .env.local');
    }

    // Create form data
    const formData = new FormData();
    formData.append('file', file);

    // Add metadata
    const pinataMetadata = JSON.stringify({
      name: metadata.name || file.name,
      keyvalues: {
        timestamp: new Date().toISOString(),
        type: metadata.type || 'evidence',
        owner: metadata.owner || 'anonymous',
        ...metadata
      }
    });
    formData.append('pinataMetadata', pinataMetadata);

    // Pin options
    const pinataOptions = JSON.stringify({
      cidVersion: 1
    });
    formData.append('pinataOptions', pinataOptions);

    // Upload to Pinata
    const response = await axios.post(
      `${PINATA_BASE_URL}/pinning/pinFileToIPFS`,
      formData,
      {
        maxBodyLength: Infinity,
        headers: {
          'Content-Type': `multipart/form-data`,
          'pinata_api_key': PINATA_API_KEY,
          'pinata_secret_api_key': PINATA_SECRET_KEY
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          console.log(`Upload Progress: ${percentCompleted}%`);
        }
      }
    );

    return {
      success: true,
      ipfsHash: response.data.IpfsHash,
      pinSize: response.data.PinSize,
      timestamp: response.data.Timestamp,
      url: `${PINATA_GATEWAY}${response.data.IpfsHash}`
    };
  } catch (error) {
    console.error('Error uploading to IPFS:', error);
    throw error;
  }
};

/**
 * Upload JSON data to IPFS via Pinata
 */
export const uploadJSONToIPFS = async (jsonData, name = 'metadata.json') => {
  try {
    if (!isPinataConfigured()) {
      throw new Error('Pinata credentials not configured');
    }

    const response = await axios.post(
      `${PINATA_BASE_URL}/pinning/pinJSONToIPFS`,
      jsonData,
      {
        headers: {
          'Content-Type': 'application/json',
          'pinata_api_key': PINATA_API_KEY,
          'pinata_secret_api_key': PINATA_SECRET_KEY
        }
      }
    );

    return {
      success: true,
      ipfsHash: response.data.IpfsHash,
      url: `${PINATA_GATEWAY}${response.data.IpfsHash}`
    };
  } catch (error) {
    console.error('Error uploading JSON to IPFS:', error);
    throw error;
  }
};

/**
 * Get file from IPFS
 */
export const getFromIPFS = async (ipfsHash) => {
  try {
    const url = `${PINATA_GATEWAY}${ipfsHash}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error getting file from IPFS:', error);
    throw error;
  }
};

/**
 * Unpin file from Pinata (optional - for cleanup)
 */
export const unpinFromIPFS = async (ipfsHash) => {
  try {
    if (!isPinataConfigured()) {
      throw new Error('Pinata credentials not configured');
    }

    await axios.delete(
      `${PINATA_BASE_URL}/pinning/unpin/${ipfsHash}`,
      {
        headers: {
          'pinata_api_key': PINATA_API_KEY,
          'pinata_secret_api_key': PINATA_SECRET_KEY
        }
      }
    );

    return { success: true };
  } catch (error) {
    console.error('Error unpinning from IPFS:', error);
    throw error;
  }
};

/**
 * Get pinned file list from Pinata
 */
export const getPinnedFiles = async () => {
  try {
    if (!isPinataConfigured()) {
      throw new Error('Pinata credentials not configured');
    }

    const response = await axios.get(
      `${PINATA_BASE_URL}/data/pinList?status=pinned`,
      {
        headers: {
          'pinata_api_key': PINATA_API_KEY,
          'pinata_secret_api_key': PINATA_SECRET_KEY
        }
      }
    );

    return response.data.rows;
  } catch (error) {
    console.error('Error getting pinned files:', error);
    throw error;
  }
};

/**
 * Test Pinata connection
 */
export const testPinataConnection = async () => {
  try {
    if (!isPinataConfigured()) {
      return {
        connected: false,
        error: 'Pinata credentials not configured'
      };
    }

    const response = await axios.get(
      `${PINATA_BASE_URL}/data/testAuthentication`,
      {
        headers: {
          'pinata_api_key': PINATA_API_KEY,
          'pinata_secret_api_key': PINATA_SECRET_KEY
        }
      }
    );

    return {
      connected: true,
      message: response.data.message
    };
  } catch (error) {
    return {
      connected: false,
      error: error.message
    };
  }
};

/**
 * Get IPFS gateway URL
 */
export const getIPFSUrl = (ipfsHash) => {
  return `${PINATA_GATEWAY}${ipfsHash}`;
};

/**
 * Format file size
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

/**
 * Validate file type for evidence
 */
export const isValidEvidenceFile = (file) => {
  const validTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'audio/mpeg',
    'audio/wav',
    'audio/webm',
    'video/mp4',
    'video/webm',
    'application/pdf'
  ];

  return validTypes.includes(file.type);
};

/**
 * Get file type category
 */
export const getFileCategory = (file) => {
  if (file.type.startsWith('image/')) return 'image';
  if (file.type.startsWith('audio/')) return 'audio';
  if (file.type.startsWith('video/')) return 'video';
  if (file.type === 'application/pdf') return 'document';
  return 'other';
};
