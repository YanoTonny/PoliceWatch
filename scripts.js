document.addEventListener('DOMContentLoaded', () => {
  const authForm = document.getElementById('authForm');
  const reportForm = document.getElementById('reportForm');
  const incidentList = document.getElementById('incidentList');
  const callAmbulanceButton = document.getElementById('callAmbulance');
  const toggleAuthModeButton = document.getElementById('toggleAuthMode');

  let currentUser = null;

  // Handle authentication form submission
  authForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (authForm.querySelector('button').innerText === 'Register') {
      try {
        const response = await fetch('http://localhost:3000/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
        });

        if (response.ok) {
          currentUser = await response.json();
          showMainContent();
        } else {
          const error = await response.text();
          console.error(error);
          alert('Error registering');
        }
      } catch (error) {
        console.error(error);
        alert('Error registering');
      }
    } else {
      try {
        const response = await fetch('http://localhost:3000/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
        });

        if (response.ok) {
          currentUser = await response.json();
          showMainContent();
        } else {
          const error = await response.text();
          console.error(error);
          alert('Error logging in');
        }
      } catch (error) {
        console.error(error);
        alert('Error logging in');
      }
    }
  });

  // Handle report form submission
  reportForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!currentUser) {
      alert('Please login first');
      return;
    }

    const description = document.getElementById('description').value;
    const location = document.getElementById('location').value;
    const file = document.getElementById('file').files[0];

    const formData = new FormData();
    formData.append('description', description);
    formData.append('location', location);
    formData.append('file', file);
    formData.append('userId', currentUser.id);

    try {
      const response = await fetch('http://localhost:3000/report', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        loadReports();
        // Clear the form after successful submission
      reportForm.reset();
      document.getElementById('file').value = ''; // Clear file input field
      } else {
        const error = await response.text();
        console.error(error);
        alert('Error submitting report');
      }
    } catch (error) {
      console.error(error);
      alert('Error submitting report');
    }
  });

  // Handle call ambulance button click
  callAmbulanceButton.addEventListener('click', () => {
    alert('Calling ambulance service in Kenya...');
    // Implement actual call functionality here
  });

  // Show main content after login/register
  function showMainContent() {
    document.getElementById('authentication').style.display = 'none';
    document.getElementById('report-incident').style.display = 'block';
    document.getElementById('dashboard').style.display = 'block';
    loadReports();
  }

  // Load reports from server
  async function loadReports() {
    incidentList.innerHTML = '';
    try {
      const response = await fetch('http://localhost:3000/reports');
      if (response.ok) {
        const reports = await response.json();
        reports.forEach(report => {
          const reportItem = document.createElement('div');
          reportItem.className = 'report-item';
          reportItem.innerHTML = `
            <p><strong>Description:</strong> ${report.description}</p>
            <p><strong>Location:</strong> ${report.location}</p>
            <p><strong>Reported by:</strong> ${report.userId}</p>
            <p><strong>Created At:</strong> ${new Date(report.createdAt).toLocaleString()}</p>
          
            ${report.userId === currentUser.id ? '<button onclick="deleteReport(\'' + report.id + '\')">Delete</button>' : ''}
          `;
          incidentList.appendChild(reportItem);
        });
      } else {
        const error = await response.text();
        console.error(error);
        alert('Error loading reports');
      }
    } catch (error) {
      console.error(error);
      alert('Error loading reports');
    }
  }

  // Delete a report
  window.deleteReport = async function (reportId) {
    try {
      const response = await fetch(`http://localhost:3000/report/${reportId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentUser.token}` // If using JWT tokens
        },
        
      });

      if (response.ok) {
        console.log('Report deleted successfully');
        loadReports();
      } else {
        const error = await response.text();
        console.error(error);
        alert('Error deleting report');
      }
    } catch (error) {
      console.error(error);
      alert('Error deleting report');
    }
  };

  // Toggle between login and register forms
  toggleAuthModeButton.addEventListener('click', () => {
    const submitButton = authForm.querySelector('button');
    if (submitButton.innerText === 'Login') {
      submitButton.innerText = 'Register';
      toggleAuthModeButton.innerText = 'Switch to Login';
    } else {
      submitButton.innerText = 'Login';
      toggleAuthModeButton.innerText = 'Switch to Register';
    }
  });
});
