// script.js

async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
  
    const data = await response.json();
    if (response.ok) {
      const token = data.token;
      localStorage.setItem('token', token);
      alert('Login successful');
      displayProtectedContent();
    } else {
      alert(`Login failed: ${data.error}`);
    }
  }
  
  async function displayProtectedContent() {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You need to log in first');
      return;
    }
  
    const response = await fetch('http://localhost:3000/protected', {
      headers: {
        'Authorization': token,
      },
    });
  
    if (response.ok) {
      const data = await response.json();
      document.getElementById('protectedContent').innerText = data.message;
    } else {
      alert('Access denied');
    }
  }
  