//Registration information
const email = document.getElementById('email').value;
const password = document.getElementById('password').value;
const firstName = document.getElementById('first').value;
const lastName = document.getElementById('last').value;
const phone = document.getElementById('phone').value;
const calgEmail = document.getElementById('calgEmail').value;
const calgPass = document.getElementById('calgPass').value;

//Store reg info in session
sessionStorage.setItem('email', email);
sessionStorage.setItem('password', password);
sessionStorage.setItem('first', firstName);
sessionStorage.setItem('last', lastName);
sessionStorage.setItem('phone', phone);
sessionStorage.setItem('calgEmail', calgEmail);
sessionStorage.setItem('calgPass', calgPass);

// Display user information on the page
document.getElementById('first').textContent = firstName;
document.getElementById('email').textContent = email;
document.getElementById('phone').textContent = phone;
document.getElementById('calgEmail').textContent = calgEmail;
document.getElementById('calgPass').textContent = calgPass;

//Edit Functionality
const editButton = document.getElementById("editButton");
const editForm = document.getElementById("editForm");
const emailInput = document.getElementById("editEmail");
const phoneInput = document.getElementById("editPhone");
const calgEmailInput = document.getElementById("editCalgEmail");
const calgPassInput = document.getElementById("editCalgPass");

editButton.addEventListener("click", () => {
  emailInput.value = document.getElementById("email").textContent;
  phoneInput.value = document.getElementById("phone").textContent;
  calgEmailInput.value = document.getElementById("calgEmail").textContent;
  calgPassInput.value = document.getElementById("calgPass").textContent;
  editForm.style.display = "block";
});

// get references to the form fields and submit button
const submitButton = document.getElementById('submit');

// add event listener to submit button
submitButton.addEventListener('click', (event) => {
  // prevent the default form submission behavior
  event.preventDefault();

  // get the current user's ID from the session (you would need to implement this part yourself)
  const userId = getSessionUserId();

  // create a new object containing the updated information
  const updatedInfo = {
    email: emailInput.value,
    phone: phoneInput.value,
    calgEmail: calgEmailInput.value,
    calgPass: calgPassInput.value
  };

  // send a PUT request to the server to update the user's information
  fetch(`/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedInfo)
  })
  .then(response => response.json())
  .then(data => {
    // display a success message to the user
    alert('Account information updated successfully!');
  })
  .catch(error => {
    // display an error message to the user
    alert('Error updating account information');
  });
});



//HomePage script
//Display todays date in the Date space
var date = new Date();
var day = date.getDate();
var month = date.getMonth() + 1;
var year = date.getFullYear();

if (month < 10) month = "0" + month;
if (day < 10) day = "0" + day;

var today = year + "-" + month + "-" + day;
document.getElementById("datepicker").value = today;
console.log(today);

//Try to pull variables
function runUserSelection() {
    
    const courseSelection = document.getElementById("courses").value;
    console.log(courseSelection);

    const dateSelection = document.getElementById("datepicker").value;
    console.log(dateSelection);

    const holeSelection = document.getElementById("holes").value;
    console.log(holeSelection);

}

const selectionForm = document.getElementById("form");
selectionForm.addEventListener("submit", function(event) {
    event.preventDefault();
    runUserSelection();
})

//Log in and Authentication
const loginPage = document.getElementById("login-page");
const loginButton = document.getElementById("login-button");

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const email = loginPage.email.value;
    const password = loginPage.password.value;
    
    const emailregex = /\S+@\S+\.\S+/;
    if (!email || !emailregex.test(email) || !password) {
        alert('Please enter a valid email and password');
        return;
    }

    if(email === 'alexc8932@gmail.com' && password === '123') {
        alert("Successful log in");
        localStorage.setItem('isLoggedIn', true);
        window.location.href='/public/HomePage.html';
    } else {
        alert ("Incorrect login! Idiot.");
    }
})

