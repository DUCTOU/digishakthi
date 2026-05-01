# Digital Shakti - Troubleshooting Guide

## 🔍 Common Issues & Solutions

### 1. MetaMask Connection Issues

#### Problem: "MetaMask not detected" error
**Symptoms:**
- Error message: "Please install MetaMask"
- Wallet connection button doesn't work

**Solutions:**
```bash
# Solution 1: Check MetaMask installation
1. Open Chrome/Firefox extensions
2. Verify MetaMask is installed and enabled
3. Try refreshing the page
4. Clear browser cache

# Solution 2: Check for conflicts
1. Disable other wallet extensions (Phantom, Coinbase Wallet)
2. Restart browser
3. Try incognito/private mode
```

#### Problem: Wrong network selected
**Symptoms:**
- Transactions fail with "wrong network" error
- Chain ID mismatch

**Solutions:**
```javascript
// The app should auto-switch, but if not:
1. Open MetaMask
2. Click network dropdown (top)
3. Select "Polygon Amoy Testnet"
4. If not available, add it manually:
   - Network Name: Polygon Amoy Testnet
   - RPC URL: https://rpc-amoy.polygon.technology
   - Chain ID: 80002
   - Currency: MATIC
   - Block Explorer: https://amoy.polygonscan.com/
```

#### Problem: Transaction stuck on "Pending"
**Solutions:**
```bash
1. Check Polygon Amoy status: https://status.polygon.technology/
2. Try increasing gas limit (in MetaMask)
3. Cancel and retry transaction
4. Check you have sufficient MATIC for gas
```

---

### 2. IPFS/Pinata Issues

#### Problem: "Invalid API Key" error
**Symptoms:**
- File upload fails immediately
- 401 Unauthorized error

**Solutions:**
```bash
# Check .env.local file
1. Open .env.local
2. Verify keys have no extra spaces
3. Ensure format is correct:
   NEXT_PUBLIC_PINATA_API_KEY=your_key_here
   NEXT_PUBLIC_PINATA_SECRET_KEY=your_secret_here
4. Restart development server:
   npm run dev
```

#### Problem: Files not uploading to IPFS
**Symptoms:**
- Upload progress stuck at 0%
- Timeout errors

**Solutions:**
```bash
# Solution 1: Check file size
- Free Pinata tier: 100MB per file max
- Compress large files before upload

# Solution 2: Check network
- Verify internet connection
- Try different network/WiFi
- Check firewall isn't blocking Pinata

# Solution 3: Test Pinata connection
curl -X GET "https://api.pinata.cloud/data/testAuthentication" \
  -H "pinata_api_key: YOUR_KEY" \
  -H "pinata_secret_api_key: YOUR_SECRET"
```

#### Problem: IPFS gateway not loading files
**Solutions:**
```bash
# Try alternative gateways:
https://gateway.pinata.cloud/ipfs/YOUR_CID
https://ipfs.io/ipfs/YOUR_CID
https://cloudflare-ipfs.com/ipfs/YOUR_CID

# Wait 30-60 seconds after upload
# IPFS propagation takes time
```

---

### 3. Smart Contract Issues

#### Problem: "Contract not deployed" error
**Symptoms:**
- Error: "Contract address not configured"
- Functions don't work

**Solutions:**
```bash
# Step 1: Verify contract is deployed
1. Go to https://amoy.polygonscan.com/
2. Search for your contract address
3. Should see "Contract" tab

# Step 2: Update .env.local
NEXT_PUBLIC_CONTRACT_ADDRESS=0xYOUR_ACTUAL_ADDRESS

# Step 3: Restart server
npm run dev
```

#### Problem: Gas estimation failed
**Symptoms:**
- Transaction fails before sending
- "Execution reverted" error

**Solutions:**
```bash
# Solution 1: Check parameters
- Ensure IPFS hash is valid
- File hash must be 64 characters (excluding SHA256: prefix)
- Metadata must be valid JSON string

# Solution 2: Increase gas limit manually
- In MetaMask, click "Advanced"
- Set gas limit to 300000
- Retry transaction

# Solution 3: Check contract state
- Use Remix to read contract
- Verify contract is not paused/locked
```

#### Problem: Transaction confirmed but event not emitted
**Solutions:**
```bash
# Check transaction on Polygon Scan
1. Copy transaction hash
2. Search on https://amoy.polygonscan.com/
3. Click "Logs" tab
4. Verify "EvidenceStored" event exists

# If event missing, contract may have issue
# Re-deploy contract or check Solidity code
```

---

### 4. Development Environment Issues

#### Problem: "Module not found" errors
**Symptoms:**
```
Error: Cannot find module 'ethers'
Error: Cannot find module 'crypto-js'
```

**Solutions:**
```bash
# Solution 1: Install dependencies
npm install

# Solution 2: Clean install
rm -rf node_modules package-lock.json
npm install

# Solution 3: Install specific packages
npm install ethers@5.7.2 crypto-js @pinata/sdk axios lucide-react
```

#### Problem: Tailwind styles not working
**Solutions:**
```bash
# Verify Tailwind setup
1. Check tailwind.config.js exists
2. Check postcss.config.js exists
3. Verify globals.css has Tailwind directives:
   @tailwind base;
   @tailwind components;
   @tailwind utilities;

# Restart dev server
npm run dev
```

#### Problem: "window is not defined" error
**Symptoms:**
- Error during build or server-side rendering
- App crashes on load

**Solutions:**
```javascript
// Add 'use client' directive at top of component
'use client';

import React from 'react';
// rest of your code

// Or check for window before using
if (typeof window !== 'undefined') {
  // Use window here
}
```

---

### 5. File Hashing Issues

#### Problem: Hash verification fails
**Symptoms:**
- Verification shows "Hashes don't match"
- Same file produces different hashes

**Solutions:**
```bash
# Ensure consistent hashing
1. Always use same hashing method
2. Don't modify file before verification
3. Check file wasn't corrupted during upload

# Test hashing:
# Should produce same hash every time
const hash1 = await hashFile(file);
const hash2 = await hashFile(file);
console.log(hash1 === hash2); // Should be true
```

---

### 6. Build & Deployment Issues

#### Problem: Build fails
**Symptoms:**
```
Error: Build failed
Module parse failed
```

**Solutions:**
```bash
# Solution 1: Check syntax errors
npm run lint

# Solution 2: Clean build
rm -rf .next
npm run build

# Solution 3: Check Node version
node --version  # Should be v18 or higher
```

#### Problem: Environment variables not working in production
**Solutions:**
```bash
# For Vercel deployment:
1. Go to Vercel Dashboard
2. Project Settings > Environment Variables
3. Add all NEXT_PUBLIC_* variables
4. Redeploy

# For other platforms:
# Ensure .env.local is not committed
# Set environment variables in hosting platform
```

---

## 🆘 Emergency Fixes

### Nuclear Option: Complete Reset

If nothing works, try this complete reset:

```bash
# 1. Delete everything
rm -rf node_modules
rm -rf .next
rm package-lock.json

# 2. Clear npm cache
npm cache clean --force

# 3. Reinstall
npm install

# 4. Restart
npm run dev
```

### MetaMask Reset

If MetaMask is completely broken:

```bash
1. Open MetaMask
2. Settings > Advanced
3. "Reset Account" (WARNING: Clears transaction history)
4. Reconnect to app
```

### Get Fresh Test MATIC

If running low on test MATIC:

```bash
1. Go to: https://faucet.polygon.technology/
2. Select "Polygon Amoy"
3. Enter your wallet address
4. Click "Submit"
5. Wait 1-2 minutes
```

---

## 📊 Debugging Tips

### Check Browser Console

```javascript
// Open browser console (F12)
// Look for errors in:
- Console tab (JavaScript errors)
- Network tab (API failures)
- Application tab (Storage issues)
```

### Enable Verbose Logging

```javascript
// Add to your component
useEffect(() => {
  console.log('Wallet Address:', walletAddress);
  console.log('Contract Address:', process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);
  console.log('Pinata Configured:', isPinataConfigured());
}, []);
```

### Test Each Component Separately

```javascript
// Test wallet connection
const testWallet = async () => {
  const result = await connectWallet();
  console.log('Wallet:', result);
};

// Test IPFS upload
const testIPFS = async () => {
  const file = new File(['test'], 'test.txt');
  const result = await uploadToIPFS(file);
  console.log('IPFS:', result);
};

// Test blockchain
const testBlockchain = async () => {
  const contract = await getContract();
  console.log('Contract:', contract);
};
```

---

## 📞 Getting Help

### Before Asking for Help, Gather:

1. **Error Message**: Full error text and stack trace
2. **Browser**: Chrome/Firefox version
3. **Node Version**: Run `node --version`
4. **Network**: Which testnet (should be Polygon Amoy)
5. **Transaction Hash**: If transaction-related
6. **Contract Address**: Your deployed contract
7. **Steps to Reproduce**: How to trigger the error

### Where to Get Help:

- **Polygon Discord**: https://discord.gg/polygon
- **Remix Discord**: https://discord.gg/mh9hFCKkEq
- **MetaMask Support**: https://support.metamask.io/
- **Pinata Docs**: https://docs.pinata.cloud/

---

## ✅ Health Check Checklist

Run through this checklist if things seem broken:

```
[ ] MetaMask installed and unlocked
[ ] Connected to Polygon Amoy (Chain ID: 80002)
[ ] Have test MATIC (> 0.1 MATIC)
[ ] .env.local file exists with all variables
[ ] Contract deployed and address in .env.local
[ ] Pinata API keys valid
[ ] Development server running (npm run dev)
[ ] No console errors in browser
[ ] Can connect wallet
[ ] Can upload to IPFS
[ ] Can send blockchain transaction
```

**If all checked, you're good to go!** ✨
