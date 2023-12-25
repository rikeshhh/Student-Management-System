// async function fetchData() {
//     try {
//       const response = await fetch("http://localhost:3000/student");
      
//       if (!response.ok) {
//         throw new Error(`Failed to fetch data. Status: ${response.status}`);
//       }
  
//       const dataArray = await response.json();
  
//       const parentEl = document.querySelector('div');
  
//       // Loop through the array and create an h1 element for each firstName
//       dataArray.forEach(data => {
//         const studentName = document.createElement('h1');
//         studentName.textContent = data.firstName;
//         parentEl.appendChild(studentName);
//       });
  
//       console.log("Data fetched successfully:", dataArray);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   }
  
//   document.addEventListener('DOMContentLoaded', fetchData);
document.addEventListener('DOMContentLoaded', function () {
  // Fetch data from the JSON server
  fetch("http://localhost:3000/student")
      .then(response => response.json())
      .then(data => {
          const tableBody = document.querySelector('#studentTable tbody');

          data.forEach(entry => {
            const row = tableBody.insertRow();
            row.insertCell(0).textContent = entry.id;
            row.insertCell(1).textContent = entry.firstName;
            row.insertCell(2).textContent = entry.lastName;
            row.insertCell(3).textContent = entry.email;
            row.insertCell(4).textContent = entry.phoneNumber;
            row.insertCell(5).textContent = entry.gender;
            row.insertCell(6).textContent = entry.department;
        });
    })
      .catch(error => console.error('Error fetching data:', error));
});
