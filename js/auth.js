let loggedInUser = null;

// Retrieve users from local storage if available, else set to an empty array
const users = JSON.parse(localStorage.getItem('users')) || [];

function saveUsers() {
  localStorage.setItem('users', JSON.stringify(users)); // Save users to local storage
}

function registerUser(email, password) {
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return { success: false, message: 'User already exists' };
  }

  users.push({ email, password });
  saveUsers(); // Save users after registration
  return { success: true, message: 'User registered successfully' };
}

function loginUser(email, password) {
  const user = users.find(user => user.email === email && user.password === password);
  if (user) {
    loggedInUser = user;
    return { success: true, message: 'Login successful' };
  } else {
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return { success: false, message: 'Invalid password' };
    } else {
      return { success: false, message: 'User not found. Make sure to register before logging in' };
    }
  }
}

function handleLogin() {
  const loginEmail = document.getElementById('loginEmail').value;
  const loginPassword = document.getElementById('loginPassword').value;

  const loginResult = loginUser(loginEmail, loginPassword);

  if (loginResult.success) {
    alert(`${loginResult.message}! Redirecting to index.html`);
    window.location.href = 'index.html'; // Redirect to index.html if login successful
  } else {
    alert(loginResult.message);
  }
}

function handleRegistration() {
  const registerEmail = document.getElementById('registerEmail').value;
  const registerPassword = document.getElementById('registerPassword').value;

  const registrationResult = registerUser(registerEmail, registerPassword);
  
  if (registrationResult.success) {
    alert('Registration successful! You can now log in.');
  } else {
    alert(registrationResult.message);
  }
}