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
document.addEventListener("DOMContentLoaded", function () {
  let page = 1;
  const perPage = 9;
  const showMoreButton = document.getElementById("show-more-btn");
  const showLessButton = document.getElementById("show-less-btn");
  const searchForm = document.getElementById("search-form");
  const goToHome = document.getElementById("goToHome")
  goToHome.addEventListener("click",()=>{
    window.location.href = '../index.html';
  })
 
  showMoreButton.addEventListener("click", function () {
    page++;

    fetchData(page);
  });

  showLessButton.addEventListener("click", function () {
    if (page > 1) {
      page--;
      fetchData(page);
    }
  });

  searchForm.addEventListener("submit", function (event) {
    event.preventDefault(); 
    searchStudent();
  });
  async function fetchData(page) {
    try {
      const response = await fetch(
        `http://localhost:3000/student?_page=${page}&_limit=${perPage}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }

      const data = await response.json();

      renderData(data);
      // updateCount(data.length);
    } catch (error) {
      console.error("Error fetching data:", error);
     
    }
  }

  function renderData(data) {
    const tableBody = document.querySelector("#studentTable tbody");
    tableBody.innerHTML = ""; 

    data.forEach((entry) => {
      const row = tableBody.insertRow();
      row.insertCell(0).textContent = entry.id;
      row.insertCell(1).textContent = entry.firstName;
      row.insertCell(2).textContent = entry.lastName;
      row.insertCell(3).textContent = entry.email;
      row.insertCell(4).textContent = entry.phoneNumber;
      row.insertCell(5).textContent = entry.gender;
      row.insertCell(6).textContent = entry.department;

      let deleteButton = createButton("Delete", () => deleteItem(entry.id));
      let editButton = createButton("Edit", () => editButtonn(entry.id));

      row.insertCell(7).appendChild(editButton);
      row.insertCell(8).appendChild(deleteButton);
    });
  }

  function createButton(text, clickHandler) {
    const button = document.createElement("button");
    button.textContent = text;
    button.addEventListener("click", clickHandler);
    return button;
  }
 
  async function deleteItem(itemId) {
    const confirmation = confirm("Are you sure you want to delete this item?");
    if (confirmation) {
      try {
        const deleteResponse = await fetch(
          `http://localhost:3000/student/${itemId}`,
          {
            method: "DELETE",
          }
        );

        if (!deleteResponse.ok) {
          throw new Error("Failed to delete item");
        }

       
        fetchData(page);
      } catch (error) {
        console.error("Error:", error);
       
      }
    }
  }

  async function editButtonn(entryId) {
    try {
      const editResponse = await fetch(
        `http://localhost:3000/student/${entryId}`,
        {
          method: "GET",
        }
      );
      const data = await editResponse.json();
      let editUser = prompt("Edit First Name:", data.firstName);

      if (editUser !== null) {
        data.firstName = editUser;
        const response = await fetch(
          `http://localhost:3000/student/${entryId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update item");
        }

        fetchData(page);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
 
  // function updateCount(totalCount) {
  //   const countElement = document.getElementById("count");
  //   if (countElement) {
  //     countElement.textContent = totalCount;
  //   } else {
  //     console.error("Element with id 'count' not found.");
  //   }
  // }
 
  async function searchStudent() {
    const searchValue = document
      .getElementById("searchValue")
      .value.toLowerCase();
    try {
      const response = await fetch(
        `http://localhost:3000/student?q=${searchValue}`
      );
      if (!response.ok) {
        throw new Error(
          `Failed to fetch search results. Status: ${response.status}`
        );
      }
      const data = await response.json();
      renderData(data);
      // updateCount(data.length);
      
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  }

  fetchData(page);
});
