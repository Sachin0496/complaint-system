const API_URL = 'http://localhost:3000/api/complaints';

// Load complaints on page load
document.addEventListener('DOMContentLoaded', fetchComplaints);

async function submitComplaint() {
    const name = document.getElementById('name').value;
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value;

    if (!name || !category || !description) {
        alert('Please fill in all fields.');
        return;
    }

    const complaint = { name, category, description };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(complaint)
        });
        if (response.ok) {
            // Clear form
            document.getElementById('name').value = '';
            document.getElementById('category').value = '';
            document.getElementById('description').value = '';
            // Refresh complaints
            fetchComplaints();
        } else {
            alert('Failed to submit complaint.');
        }
    } catch (error) {
        console.error('Error submitting complaint:', error);
        alert('Error submitting complaint.');
    }
}

async function fetchComplaints() {
    try {
        const response = await fetch(API_URL);
        const complaints = await response.json();
        displayComplaints(complaints);
    } catch (error) {
        console.error('Error fetching complaints:', error);
    }
}

function displayComplaints(complaints) {
    const complaintsList = document.getElementById('complaintsList');
    complaintsList.innerHTML = '';

    complaints.forEach(complaint => {
        const complaintDiv = document.createElement('div');
        complaintDiv.className = 'p-4 border border-gray-200 rounded-md';
        complaintDiv.innerHTML = `
            <p><strong>Complaint ID:</strong> ${complaint._id}</p>
            <p><strong>Name:</strong> ${complaint.name}</p>
            <p><strong>Category:</strong> ${complaint.category}</p>
            <p><strong>Description:</strong> ${complaint.description}</p>
            <p><strong>Submitted:</strong> ${new Date(complaint.createdAt).toLocaleString()}</p>
            <p><strong>Blockchain Hash:</strong> ${complaint.transactionHash || 'Pending'}</p>
        `;
        complaintsList.appendChild(complaintDiv);
    });
}