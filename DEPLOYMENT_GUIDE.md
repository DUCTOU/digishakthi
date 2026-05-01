# Smart Contract Deployment Guide

## 📋 Prerequisites

- MetaMask installed and configured with Polygon Amoy Testnet
- Test MATIC tokens in your wallet (get from faucet)
- Remix IDE (browser-based): https://remix.ethereum.org/

## 🚀 Deployment Steps

### Step 1: Open Remix IDE

1. Go to https://remix.ethereum.org/
2. You'll see the Remix IDE interface with a file explorer on the left

### Step 2: Create Contract File

1. In the File Explorer (left sidebar), click the "+" icon to create a new file
2. Name it: `EvidenceLocker.sol`
3. Copy and paste the entire contract code from `EvidenceLocker.sol`

### Step 3: Compile the Contract

1. Click on the "Solidity Compiler" tab (left sidebar, looks like an "S")
2. Select compiler version: `0.8.0` or higher (e.g., 0.8.20)
3. Click "Compile EvidenceLocker.sol"
4. Wait for green checkmark indicating successful compilation
5. Check for any warnings (orange) or errors (red)

### Step 4: Connect MetaMask

1. Click on "Deploy & Run Transactions" tab (left sidebar, below compiler)
2. In "ENVIRONMENT" dropdown, select "Injected Provider - MetaMask"
3. MetaMask popup will appear - click "Connect"
4. Ensure you're on **Polygon Amoy Testnet** (check MetaMask network)
5. Your wallet address should appear under "ACCOUNT"

### Step 5: Deploy Contract

1. Verify "CONTRACT" dropdown shows "EvidenceLocker"
2. Leave "GAS LIMIT" as default (or set to 3000000)
3. Click orange "Deploy" button
4. MetaMask popup appears with transaction details:
   - Network: Polygon Amoy
   - Estimated Gas Fee: ~0.001 MATIC
5. Click "Confirm" in MetaMask
6. Wait for transaction confirmation (10-30 seconds)

### Step 6: Verify Deployment

1. After successful deployment, contract appears under "Deployed Contracts"
2. Copy the contract address (click copy icon)
3. Contract address looks like: `0x1234...5678`
4. Click the dropdown arrow to see all contract functions

### Step 7: Test Contract Functions

Test that the contract works:

```javascript
// Test 1: Store Evidence
storeEvidence(
  "QmTest123", // IPFS hash
  "sha256:abc123def456", // File hash
  '{"type":"image","location":"test"}' // Metadata
)

// Test 2: Get Evidence (use ID from previous transaction)
getEvidence(1)

// Test 3: Get My Evidence
getMyEvidence("YOUR_WALLET_ADDRESS")
```

### Step 8: Save Contract Address

1. Copy your deployed contract address
2. Open your project's `.env.local` file
3. Update the line:
   ```env
   NEXT_PUBLIC_CONTRACT_ADDRESS=0xYOUR_CONTRACT_ADDRESS_HERE
   ```
4. Save the file
5. Restart your Next.js development server

## 🔍 Verify on Polygon Scan

1. Go to: https://amoy.polygonscan.com/
2. Paste your contract address in the search bar
3. You should see:
   - Contract creation transaction
   - Current balance (0 MATIC)
   - Transaction history

## 📝 Contract Verification (Optional but Recommended)

To verify your contract on Polygon Scan:

1. On Polygon Scan contract page, click "Contract" tab
2. Click "Verify and Publish"
3. Fill in details:
   - Compiler Type: Solidity (Single file)
   - Compiler Version: Match your Remix version (e.g., v0.8.20)
   - License Type: MIT
4. Paste your contract source code
5. Click "Verify and Publish"

Benefits of verification:
- Users can read your contract code
- Enhanced trust and transparency
- Easier debugging

## 🎯 Quick Reference: Contract Functions

### Write Functions (Cost Gas)
- `storeEvidence(ipfsHash, fileHash, metadata)` - Store new evidence
- `verifyEvidence(evidenceId, fileHash)` - Verify evidence hash

### Read Functions (Free)
- `getEvidence(evidenceId)` - Get evidence details
- `getMyEvidence(ownerAddress)` - Get all evidence for an address
- `getTotalEvidence()` - Get total evidence count
- `getEvidenceCount(ownerAddress)` - Get evidence count for address

## ⚠️ Important Notes

1. **Save Contract Address**: Write it down! You'll need it for your app
2. **Gas Fees**: Each transaction costs a small amount of MATIC
3. **Testnet Only**: Never deploy to mainnet without thorough testing
4. **Immutability**: Once deployed, contract code cannot be changed
5. **Security**: Audit your contract before production use

## 🐛 Troubleshooting

### Error: "Insufficient funds"
- Get more test MATIC from faucet
- Wait a few minutes for tokens to arrive

### Error: "Transaction failed"
- Check you're on Polygon Amoy network
- Increase gas limit to 3000000
- Ensure MetaMask is unlocked

### Error: "Contract not deploying"
- Verify compiler version matches (0.8.0+)
- Check for compilation errors
- Try refreshing Remix IDE

### MetaMask not connecting
- Disable other wallet extensions
- Clear MetaMask cache
- Try different browser

## 📞 Get Help

- Remix Documentation: https://remix-ide.readthedocs.io/
- Polygon Documentation: https://docs.polygon.technology/
- Polygon Discord: https://discord.gg/polygon

## ✅ Deployment Checklist

- [ ] Contract compiled successfully
- [ ] Connected to Polygon Amoy Testnet
- [ ] Have test MATIC in wallet
- [ ] Contract deployed
- [ ] Contract address copied
- [ ] Address added to .env.local
- [ ] Tested contract functions in Remix
- [ ] Verified on Polygon Scan (optional)
- [ ] Development server restarted

**Congratulations! Your smart contract is deployed and ready to use!** 🎉
