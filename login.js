document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Fetch users from local storage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the user exists and credentials match
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // Successful login
        alert('Login successful!');
        // Redirect to the home page or dashboard
        window.location.href = 'home.html';
    } else {
        // Display error message
        document.getElementById('error-message').style.display = 'block';
    }
});
// Check if user is logged in (you can modify this check based on your authentication mechanism)
const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

// Function to toggle login/logout buttons based on login state
function toggleLoginLogoutButtons(isLoggedIn) {
    const loginBtnContainer = document.getElementById('login-btn-container');
    const logoutBtnContainer = document.getElementById('logout-btn-container');

    if (isLoggedIn) {
        loginBtnContainer.style.display = 'none';
        logoutBtnContainer.style.display = 'block';
    } else {
        loginBtnContainer.style.display = 'block';
        logoutBtnContainer.style.display = 'none';
    }
}

// Initial check and setup when the page loads
toggleLoginLogoutButtons(isLoggedIn);
