# Complaint Registering System

A full-stack web application for registering complaints, with data stored in MongoDB and complaint IDs logged on an Ethereum blockchain.

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Hardhat (for blockchain development)
- MetaMask (for blockchain interaction, optional)

## Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone <your-repo-url>
   cd complaint-system
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Up MongoDB**

   - Ensure MongoDB is running locally on `mongodb://localhost:27017`.
   - Alternatively, use a cloud MongoDB instance and update the connection string in `server/index.js`.

4. **Set Up Hardhat**

   - Start a local Ethereum node:

     ```bash
     npx hardhat node
     ```

   - Deploy the smart contract:

     ```bash
     npx hardhat run scripts/deploy.js --network hardhat
     ```

   - Copy the deployed contract address and update `server/routes/complaints.js`.

   - Update the private key in `server/routes/complaints.js` with one of the Hardhat node accounts (visible in the terminal when you run `npx hardhat node`).

5. **Run the Backend**

   ```bash
   npm run dev
   ```

6. **Serve the Frontend**

   - Place the `client` folder in a static file server (e.g., use `npx serve client`) or open `client/index.html` in a browser (note: API calls require a server due to CORS).

   - Recommended: Use a simple static server:

     ```bash
     npx serve client
     ```

7. **Access the Application**

   - Open `http://localhost:3000` (or the port provided by your static server) in a browser.
   - Submit complaints and view them in the interface.

## Project Structure

- `client/`: Frontend code (HTML, JavaScript, Tailwind CSS)
- `server/`: Backend code (Node.js, Express, MongoDB)
- `contracts/`: Solidity smart contract
- `scripts/`: Hardhat deployment scripts
- `hardhat.config.js`: Hardhat configuration
- `package.json`: Project dependencies and scripts

## Notes

- The blockchain logs only the complaint ID and timestamp for simplicity. Expand the smart contract for additional data.
- Replace `YOUR_CONTRACT_ADDRESS` and `YOUR_PRIVATE_KEY` in `server/routes/complaints.js` after deploying the contract.
- For production, secure the private key using environment variables (e.g., `dotenv`).
- To enhance security, add user authentication and input validation.
- For learning Solidity, refer to the Remix IDE or Truffle Suite, as mentioned in prior conversations.

## Learning Resources

- Ethereum Development
- Hardhat Documentation
- MongoDB with Node.js
- Express.js Guide

## Next Steps

- Add user authentication.
- Enhance the smart contract to store more complaint details.
- Implement ML-based anomaly detection for complaints (as per your interest in ML).
- Deploy the backend to a cloud platform like Heroku or Vercel.