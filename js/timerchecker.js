let todoList = [];

// Get the current time
const currentDate = new Date();
const currentHours = currentDate.getHours();
const currentMinutes = currentDate.getMinutes();
// Format the current time as "HH:MM" for comparison
const currentTime = `${currentHours}:${currentMinutes}`;
// Check for a match between currentTime and TodoList.Timer

// let alarmModal = document.getElementById("")

if (currentTime === TodoList.Timer) {
  alert("Match found for time: " + TodoList.Timer);
  console.log("Match found for time: " + TodoList.Timer);

}