const express = require('express');
const ethers = require('ethers');
const Complaint = require('../models/Complaint');
const router = express.Router();

// Ethereum setup (use your own contract address and ABI after deployment)
const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');
const contractAddress = 'YOUR_CONTRACT_ADDRESS'; // Update after deployment
const contractABI = [
    {
        "inputs": [{"internalType": "string", "name": "complaintId", "type": "string"}],
        "name": "logComplaint",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{"internalType": "string", "name": "complaintId", "type": "string"}],
        "name": "getComplaint",
        "outputs": [{"internalType": "uint256", "name": "timestamp", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    }
];
const wallet = new ethers.Wallet('YOUR_PRIVATE_KEY', provider); // Update with your private key
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

// Get all complaints
router.get('/', async (req, res) => {
    try {
        const complaints = await Complaint.find().sort({ createdAt: -1 });
        res.json(complaints);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Submit a complaint
router.post('/', async (req, res) => {
    const { name, category, description } = req.body;

    if (!name || !category || !description) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Save to MongoDB
        const complaint = new Complaint({ name, category, description });
        await complaint.save();

        // Log to blockchain
        const tx = await contract.logComplaint(complaint._id.toString());
        const receipt = await tx.wait();

        // Update complaint with transaction hash
        complaint.transactionHash = receipt.transactionHash;
        await complaint.save();

        res.status(201).json(complaint);
    } catch (error) {
        console.error('Error saving complaint:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;