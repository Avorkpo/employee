// Function to mark attendance
function markAttendance() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const status = document.getElementById('status').value;
  
    if (firstName && lastName) {
      const date = new Date().toLocaleDateString();
      const tableRow = `
        <tr>
          <td>${date}</td>
          <td>${firstName}</td>
          <td>${lastName}</td>
          <td>${status}</td>
        </tr>
      `;
      document.getElementById('attendanceTable').innerHTML += tableRow;
  
      // Save data to Local Storage
      const attendanceData = JSON.parse(localStorage.getItem('attendanceData')) || [];
      attendanceData.push({ date, firstName, lastName, status });
      localStorage.setItem('attendanceData', JSON.stringify(attendanceData));
  
      // Clear input fields
      document.getElementById('firstName').value = '';
      document.getElementById('lastName').value = '';
    } else {
      alert('Please enter both first name and last name.');
    }
  }
  
  // Load data from Local Storage on page load
  document.addEventListener('DOMContentLoaded', () => {
    const attendanceData = JSON.parse(localStorage.getItem('attendanceData')) || [];
    const tableRows = attendanceData.map(data => `
      <tr>
        <td>${data.date}</td>
        <td>${data.firstName}</td>
        <td>${data.lastName}</td>
        <td>${data.status}</td>
      </tr>
    `).join('');
  
    document.getElementById('attendanceTable').innerHTML = tableRows;
  });
  