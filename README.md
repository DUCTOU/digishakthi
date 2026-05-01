Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

## 🔐 Security Notes
*   **No Central Database**: Evidence metadata is stored on the blockchain, and files are stored on IPFS, removing centralized security risks.
*   **Environment Safety**: All API keys and private keys are managed via `.env` files and excluded from Git history via `.gitignore`.
*   **Local Signing**: Your private key never leaves your MetaMask; all transactions are signed locally by the user.

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

---

**Developed with ❤️ for Digital Shakti**Below is a professional, comprehensive content structure for your **Digital Shakti** README file. You can copy and paste this into a file named `README.md` in your project's root directory.

---

# 🛡️ Digital Shakti: Decentralized Evidence Locker

**Digital Shakti** is a secure, tamper-proof evidence management system designed to empower users by providing immutable storage for critical evidence. By leveraging **Blockchain** for integrity and **IPFS** for decentralized storage, it ensures that evidence remains verifiable and accessible without a central point of failure.

## 🎯 Key Features
*   **Immutable Evidence Records**: Stores file hashes on-chain to ensure evidence cannot be altered after upload.
*   **Decentralized File Storage**: Uses **IPFS** (via Pinata) to host evidence files across a distributed network.
*   **Real-time Hashing**: Generates SHA-256 digital fingerprints locally before upload for maximum security.
*   **On-Chain Verification**: Instantly verify any piece of evidence by comparing local files against blockchain records.
*   **Web3 Integration**: Seamlessly connect and sign transactions using **MetaMask** on the **Polygon Amoy Testnet**.
*   **Audio/Visual Evidence**: Direct integration with device cameras and microphones for immediate capture.

## 🚀 Tech Stack
*   **Frontend**: Next.js 14+, Tailwind CSS
*   **Blockchain**: Solidity, Polygon Amoy Testnet
*   **Storage**: IPFS via Pinata
*   **Libraries**: Ethers.js, Web Crypto API

## 🛠️ Getting Started

### Prerequisites
*   Node.js installed on your machine.
*   MetaMask browser extension with **Polygon Amoy** network configured.
*   A Pinata account for IPFS API keys.

### Installation
1.  **Clone the repository**:
    ```bash
    git clone [https://github.com/YOUR_USERNAME/digishakthi.git](https://github.com/YOUR_USERNAME/digishakthi.git)
    cd digishakthi
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Configure Environment Variables**:
    Create a `.env.local` file in the root directory and add your credentials:
    ```env
    NEXT_PUBLIC_PINATA_API_KEY=your_api_key
    NEXT_PUBLIC_PINATA_SECRET_KEY=your_secret_key
    NEXT_PUBLIC_CONTRACT_ADDRESS=your_deployed_contract_address
    NEXT_PUBLIC_RPC_URL=[https://rpc-amoy.polygon.technology](https://rpc-amoy.polygon.technology)
    ```

### Running Locally
```bash
npm run dev