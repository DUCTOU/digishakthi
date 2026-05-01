# Pinata IPFS Setup Guide

## 🎯 What is Pinata?

Pinata is a pinning service for IPFS (InterPlanetary File System) that makes it easy to upload and manage files on IPFS. For Digital Shakti, we use Pinata to store evidence files in a decentralized manner.

## 📋 Why Use Pinata?

✅ **Decentralized Storage** - Files stored on IPFS, not centralized servers
✅ **Permanent Links** - Content-addressed storage means files never change
✅ **Easy Integration** - Simple API for uploads
✅ **Free Tier** - 1GB free storage, perfect for testing
✅ **Reliable** - Files remain available as long as they're pinned

## 🚀 Setup Steps

### Step 1: Create Pinata Account

1. Go to https://pinata.cloud/
2. Click "Sign Up" (top right)
3. Choose signup method:
   - Email & Password (recommended)
   - Google Account
   - GitHub Account
4. Verify your email address
5. Complete profile setup

### Step 2: Get API Keys

1. After login, go to: https://app.pinata.cloud/developers/api-keys
2. Click "+ New Key" button
3. Configure your API key:
   ```
   Key Name: Digital Shakti App
   
   Permissions (enable these):
   ✅ pinFileToIPFS
   ✅ pinJSONToIPFS
   ✅ unpin
   ✅ pinList
   ❌ (leave other options unchecked for now)
   
   Max Uses: Leave blank (unlimited)
   ```
4. Click "Create Key"
5. **IMPORTANT**: Copy both keys immediately:
   - API Key: `YOUR_API_KEY_HERE`
   - API Secret: `YOUR_SECRET_KEY_HERE`
   
   ⚠️ **You won't see the Secret again!**

### Step 3: Add Keys to Your Project

1. Open your project folder
2. Open (or create) `.env.local` file
3. Add these lines:
   ```env
   NEXT_PUBLIC_PINATA_API_KEY=your_actual_api_key_here
   NEXT_PUBLIC_PINATA_SECRET_KEY=your_actual_secret_key_here
   ```
4. Replace `your_actual_api_key_here` with your copied API Key
5. Replace `your_actual_secret_key_here` with your copied Secret Key
6. Save the file

### Step 4: Verify Configuration

Run this test in your browser console after starting your app:

```javascript
// Test Pinata connection
const testPinata = async () => {
  try {
    const response = await fetch('https://api.pinata.cloud/data/testAuthentication', {
      method: 'GET',
      headers: {
        'pinata_api_key': 'YOUR_API_KEY',
        'pinata_secret_api_key': 'YOUR_SECRET_KEY'
      }
    });
    const data = await response.json();
    console.log('Pinata Status:', data);
  } catch (error) {
    console.error('Pinata Error:', error);
  }
};

testPinata();
```

Expected response:
```json
{
  "message": "Congratulations! You are communicating with the Pinata API!"
}
```

## 📤 How File Upload Works

### Upload Flow:

1. **User selects file** → React component
2. **File is hashed locally** → SHA-256 using Web Crypto API
3. **File uploaded to IPFS** → via Pinata API
4. **Pinata returns CID** → Content Identifier (e.g., `QmXxx...`)
5. **CID + Hash stored on blockchain** → Polygon smart contract
6. **Evidence is immutable** → Can be verified anytime

### Example Upload Code:

```javascript
import { uploadToIPFS } from './utils/ipfs';
import { hashFile } from './utils/crypto';
import { storeEvidenceOnChain } from './utils/blockchain';

const handleUpload = async (file) => {
  // 1. Hash file locally
  const fileHash = await hashFile(file);
  console.log('File Hash:', fileHash);
  
  // 2. Upload to IPFS
  const ipfsResult = await uploadToIPFS(file, {
    name: file.name,
    type: 'evidence',
    owner: walletAddress
  });
  console.log('IPFS CID:', ipfsResult.ipfsHash);
  
  // 3. Store on blockchain
  const metadata = JSON.stringify({
    fileName: file.name,
    fileSize: file.size,
    fileType: file.type,
    uploadDate: new Date().toISOString()
  });
  
  const txResult = await storeEvidenceOnChain(
    ipfsResult.ipfsHash,
    fileHash,
    metadata
  );
  
  console.log('Evidence ID:', txResult.evidenceId);
  console.log('Transaction:', txResult.transactionHash);
};
```

## 🔍 Viewing Files on IPFS

After uploading, you can view your files using these gateways:

### Pinata Gateway (Recommended)
```
https://gateway.pinata.cloud/ipfs/YOUR_CID_HERE
```

### Public IPFS Gateways (Alternative)
```
https://ipfs.io/ipfs/YOUR_CID_HERE
https://cloudflare-ipfs.com/ipfs/YOUR_CID_HERE
```

Example:
```
https://gateway.pinata.cloud/ipfs/QmXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXx
```

## 📊 Pinata Dashboard Features

### Files Tab
- View all pinned files
- See file sizes and pin dates
- Unpin files (remove from storage)
- Search and filter files

### API Keys Tab
- Manage your API keys
- Create new keys with specific permissions
- Revoke compromised keys

### Billing Tab
- Monitor storage usage (1GB free)
- Upgrade plan if needed
- View transaction history

## 💰 Pricing (as of 2024)

### Free Tier
- 1 GB storage
- Unlimited bandwidth
- Perfect for testing and small projects

### Paid Plans (if you need more)
- Picnic: $20/month - 100 GB
- Submarine: $100/month - 1 TB
- Enterprise: Custom pricing

**For Digital Shakti development, the free tier is sufficient!**

## 🔒 Security Best Practices

### ✅ DO:
- Store API keys in `.env.local` file
- Add `.env.local` to `.gitignore`
- Use different keys for development and production
- Rotate keys periodically
- Enable only required permissions

### ❌ DON'T:
- Commit API keys to GitHub
- Share keys publicly
- Use production keys in development
- Give unlimited permissions to keys
- Store keys in frontend code directly

## 🐛 Troubleshooting

### Error: "Invalid API Key"
**Solution:**
- Double-check keys in `.env.local`
- Ensure no extra spaces or quotes
- Verify keys are active in Pinata dashboard
- Restart development server after changing .env

### Error: "Request Failed with Status 401"
**Solution:**
- Keys may be revoked - create new ones
- Check key permissions include `pinFileToIPFS`
- Verify headers are correctly formatted

### Error: "File too large"
**Solution:**
- Free tier has file size limits
- Compress files before upload
- Split large files
- Upgrade Pinata plan

### Files not accessible via gateway
**Solution:**
- Wait 30-60 seconds after upload
- Try alternative gateway
- Verify CID is correct
- Check if file is still pinned

## 📝 Sample .env.local File

```env
# Pinata IPFS Configuration
NEXT_PUBLIC_PINATA_API_KEY=a1b2c3d4e5f6g7h8i9j0
NEXT_PUBLIC_PINATA_SECRET_KEY=k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6

# Polygon Amoy Testnet
NEXT_PUBLIC_RPC_URL=https://rpc-amoy.polygon.technology
NEXT_PUBLIC_CHAIN_ID=80002

# Smart Contract (add after deployment)
NEXT_PUBLIC_CONTRACT_ADDRESS=0x1234567890123456789012345678901234567890
```

## ✅ Setup Verification Checklist

- [ ] Pinata account created
- [ ] API keys generated
- [ ] Keys added to .env.local
- [ ] .env.local added to .gitignore
- [ ] Development server restarted
- [ ] Test upload successful
- [ ] File accessible via gateway
- [ ] No API keys in git history

## 🎯 Quick Test

After setup, test with this simple script:

```bash
# In your project directory
node -e "
const axios = require('axios');
require('dotenv').config({ path: '.env.local' });

axios.get('https://api.pinata.cloud/data/testAuthentication', {
  headers: {
    'pinata_api_key': process.env.NEXT_PUBLIC_PINATA_API_KEY,
    'pinata_secret_api_key': process.env.NEXT_PUBLIC_PINATA_SECRET_KEY
  }
}).then(res => {
  console.log('✅ Pinata Connected:', res.data.message);
}).catch(err => {
  console.error('❌ Pinata Error:', err.response?.data || err.message);
});
"
```

Expected output:
```
✅ Pinata Connected: Congratulations! You are communicating with the Pinata API!
```

## 📞 Support

- Pinata Documentation: https://docs.pinata.cloud/
- Pinata Discord: https://discord.gg/pinata
- Email Support: team@pinata.cloud

**Your IPFS storage is now ready! 🎉**
