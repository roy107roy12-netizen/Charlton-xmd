// API Base URL
const API_BASE_URL = window.location.origin;
let currentApiKey = localStorage.getItem('apiKey') || '';
let currentUsername = localStorage.getItem('username') || '';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    if (currentApiKey) {
        document.getElementById('apiKey').value = currentApiKey;
        loadSessions();
    }
});

// Auth Functions
async function registerUser() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!username || !email || !password) {
        alert('Please fill all fields');
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });

        const data = await response.json();
        if (data.apiKey) {
            localStorage.setItem('apiKey', data.apiKey);
            localStorage.setItem('username', username);
            currentApiKey = data.apiKey;
            currentUsername = username;
            document.getElementById('apiKey').value = data.apiKey;
            alert('Registration successful!');
            document.getElementById('authForm').reset();
        } else {
            alert('Error: ' + (data.error || 'Registration failed'));
        }
    } catch (error) {
        alert('Error registering: ' + error.message);
    }
}

async function loginUser() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
        alert('Please enter username and password');
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        if (data.apiKey) {
            localStorage.setItem('apiKey', data.apiKey);
            localStorage.setItem('username', username);
            currentApiKey = data.apiKey;
            currentUsername = username;
            document.getElementById('apiKey').value = data.apiKey;
            alert('Login successful!');
            loadSessions();
        } else {
            alert('Error: ' + (data.error || 'Login failed'));
        }
    } catch (error) {
        alert('Error logging in: ' + error.message);
    }
}

// Session Functions
async function createSession() {
    if (!currentApiKey) {
        alert('Please login first');
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/api/session/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': currentApiKey
            }
        });

        const data = await response.json();
        if (data.sessionId) {
            // Display QR code
            document.getElementById('qrContainer').style.display = 'block';
            document.getElementById('sessionStatus').textContent = `Session ID: ${data.sessionId}`;
            
            // Load QR code (you would need a QR code library)
            loadSessionQR(data.sessionId);
            
            // Refresh sessions list
            setTimeout(loadSessions, 2000);
        }
    } catch (error) {
        alert('Error creating session: ' + error.message);
    }
}

async function loadSessionQR(sessionId) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/session/${sessionId}/qr`, {
            headers: { 'x-api-key': currentApiKey }
        });
        const data = await response.json();
        // Display QR code image
        if (data.qrCode) {
            document.getElementById('qrCode').innerHTML = `<img src="${data.qrCode}" alt="QR Code" />`;
        }
    } catch (error) {
        console.log('Error loading QR:', error.message);
    }
}

async function loadSessions() {
    if (!currentApiKey) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/api/sessions`, {
            headers: { 'x-api-key': currentApiKey }
        });

        const sessions = await response.json();
        const tbody = document.getElementById('sessionsBody');
        
        if (sessions.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5">No sessions yet</td></tr>';
            return;
        }

        tbody.innerHTML = sessions.map(session => `
            <tr>
                <td><code>${session.sessionId}</code></td>
                <td>${session.phoneNumber || 'N/A'}</td>
                <td><span class="status-${session.status}">${session.status}</span></td>
                <td>${new Date(session.createdAt).toLocaleDateString()}</td>
                <td>
                    <button class="btn btn-small" onclick="downloadCreds('${session.sessionId}')">Download</button>
                    <button class="btn btn-small" onclick="deleteSession('${session.sessionId}')">Delete</button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Error loading sessions:', error);
    }
}

async function downloadCreds(sessionId) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/downloadCreds/${sessionId}`, {
            headers: { 'x-api-key': currentApiKey }
        });

        if (response.ok) {
            const credentials = await response.json();
            const blob = new Blob([JSON.stringify(credentials, null, 2)], { type: 'application/json' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `creds_${sessionId}.json`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        } else {
            alert('Error downloading credentials');
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

async function deleteSession(sessionId) {
    if (!confirm('Are you sure?')) return;

    try {
        const response = await fetch(`${API_BASE_URL}/api/session/${sessionId}`, {
            method: 'DELETE',
            headers: { 'x-api-key': currentApiKey }
        });

        if (response.ok) {
            alert('Session deleted');
            loadSessions();
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

// Utility Functions
function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    element.select();
    document.execCommand('copy');
    alert('Copied to clipboard!');
}

function scrollTo(sectionId) {
    const element = document.getElementById(sectionId);
    element.scrollIntoView({ behavior: 'smooth' });
}