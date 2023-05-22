// Set the inactivity timeout duration (e.g., 15 minutes)
const inactivityTimeout = 2 * 60 * 1000; // 15 minutes in milliseconds

// Variable to hold the timeout reference
let timeout;

// Function to reset the inactivity timeout
function resetInactivityTimeout() {
  clearTimeout(timeout);
  timeout = setTimeout(logout, inactivityTimeout);
  console.log(timeout);
}

// Function to handle user activity
function handleUserActivity() {
  resetInactivityTimeout();
  // Perform any other necessary actions
}

// Function to perform logout
function logout() {
  localStorage.clear(); // Clear localStorage or perform necessary logout actions
  window.location.replace("login.html"); // Redirect to the login page
}

// Event listeners for user activity
document.addEventListener("mousemove", handleUserActivity);
document.addEventListener("keydown", handleUserActivity);
document.addEventListener("click", handleUserActivity);

// Start the inactivity timeout
resetInactivityTimeout();
