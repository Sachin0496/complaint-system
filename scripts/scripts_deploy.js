const { ethers } = require('hardhat');

async function main() {
    const ComplaintRegistry = await ethers.getContractFactory('ComplaintRegistry');
    const complaintRegistry = await ComplaintRegistry.deploy();
    await complaintRegistry.deployed();
    console.log('ComplaintRegistry deployed to:', complaintRegistry.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });