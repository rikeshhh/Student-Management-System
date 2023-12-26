function openLogin() {
  let loginBox = document.getElementById("loginBox");
  loginBox.style.display = loginBox.style.display === "none" ? "flex" : "none";
}

function closeLogin() {
  let loginBox = document.getElementById("loginBox");
  loginBox.style.display = "none";
}

document
  .getElementById("myForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(this); // 'this' refers to the form element
    const emailValue = formData.get("email");
    const confirmEmailValue = formData.get("confirmEmail");
    const errorElement = document.getElementById("errorName");
    const emailInput = document.getElementById("email");
    const confirmEmailInput = document.getElementById("confirmEmail");
    try {
      if (emailValue === confirmEmailValue) {
        const student = {};
        formData.forEach((value, key) => {
          student[key] = value;
        });

        const response = await fetch("http://localhost:3000/student", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(student),
        });
        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }
        alert("Your form has been submitted successfully");
      } else {
        alert("Email and confirm email must match");
        emailInput.classList.add("error");
        confirmEmailInput.classList.add("error");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });

//check Password
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const loginData = new FormData(this);
  let email = loginData.get("email");
  let password = loginData.get("password");
  if (email === "admin" || password === "admin") {
    window.location.href = "./detail/detail.html";
  } else {
    alert("Wrong Password");
  }
});
