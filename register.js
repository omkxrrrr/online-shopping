// Define a function to handle registration
function registerUser(username, email, password) {
    // Fetch existing users from local storage or initialize an empty array
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the username is already taken
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        alert('Username already exists. Please choose another username.');
        return false;
    }

    // Create a new user object
    const newUser = {
        username: username,
        email: email,
        password: password
    };

    // Push the new user to the array
    users.push(newUser);

    // Store updated users array back to local storage
    localStorage.setItem('users', JSON.stringify(users));

    return true; // Registration successful
}

// Example usage
document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Fetch form data
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Check if passwords match
    if (password !== confirmPassword) {
        document.getElementById('error-message').style.display = 'block';
        return;
    }

    // Register user and handle success or error
    const registrationSuccessful = registerUser(username, email, password);
    if (registrationSuccessful) {
        alert('Registration successful!');
        window.location.href = 'login.html'; // Redirect to login page
    } else {
        // Handle registration failure
        console.log('Registration failed');
    }
});
