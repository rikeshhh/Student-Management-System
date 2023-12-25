function openLogin() {
  let loginBox  = document.getElementById('loginBox')
  loginBox.style.display = (loginBox.style.display === 'none') ? 'flex' : 'none';
  body.style.filter = (loginBox.style.display === 'none') ? 'blur(0)' : 'blur(8px)';

}

document.getElementById("myForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent the default form submission
  
  const formData = new FormData(this); // 'this' refers to the form element
  const student = {};
  formData.forEach((value, key) => {
    student[key] = value;
  });
  try {
    const response =  fetch("http://localhost:3000/student", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    });
  } catch (error) {
    console.error("Error:", error);
  }

});

//check Password
document.getElementById('loginForm').addEventListener("submit", function(e){
  e.preventDefault()
  const loginData = new FormData(this)
  let email = loginData.get('email')
  let password = loginData.get('password')
  if(email === "admin" || password === "admin"){
    window.location.href = './detail/detail.html'; 
  }else{
    alert("Wrong Password")
  }

})