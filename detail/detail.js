async function fetchData() {
    try {
      const response = await fetch("http://localhost:3000/student");
      
      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }
  
      const dataArray = await response.json();
  
      const parentEl = document.querySelector('div');
  
      // Loop through the array and create an h1 element for each firstName
      dataArray.forEach(data => {
        const studentName = document.createElement('h1');
        studentName.textContent = data.firstName;
        parentEl.appendChild(studentName);
      });
  
      console.log("Data fetched successfully:", dataArray);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  
  document.addEventListener('DOMContentLoaded', fetchData);
  