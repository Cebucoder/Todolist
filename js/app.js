let popupModal = document.getElementById("popup-modal");
let closePopupModal = document.getElementById("popup-modal");
let clearText = document.getElementById("clear-text");

function showTaskModal(){
    popupModal.classList.add("show-task-modal");
}
function closeTaskModal(){
    closePopupModal.classList.remove("show-task-modal");
    const taskTitle = document.querySelector('#task-title');
    const taskUrl = document.querySelector('#task-url');
    const taskTimer = document.querySelector('#task-timer');
    taskTitle.value = '';
    taskUrl.value = '';
    taskTimer.value = '';
}

// redirectig to loginn page
// function LogOutForm() {
//     localStorage.removeItem("User");
//     localStorage.removeItem("MyTodo");
//     localStorage.removeItem("taskNumber");
//     localStorage.removeItem("DeletedTask");
//     localStorage.removeItem("DeletedTaskCount");
  
//     // Remove radio button and task completion status for each task
//     let taskNumber = localStorage.getItem("taskNumber");
//     for (let i = 1; i <= taskNumber; i++) {
//       localStorage.removeItem(`radioChecked_${i}`);
//       localStorage.removeItem(`taskCompleted_${i}`);
//     }
  
//     localStorage.removeItem("completedTasksCount");
  
//     window.location.replace("login.html");
//   }

// shortest way
function LogOutForm() {
    localStorage.clear();
    window.location.replace("login.html");
  }
  

// redirectig to loginn page
function Addtask(){
    window.location.replace("Addtask.html");
}

function Dashboard(){
    window.location.replace("index.html");

}

function Calendar(){
    window.location.replace("Calendar.html");
}

function NotiFication(){
    window.location.replace("Notification.html");
}

function Clock(){
    window.location.replace("Clock.html");
}



function Signin(){
    let username = document.getElementById("user-name").value;
    let err = document.getElementById("err-alert");
    let user  = document.getElementById("user");
    if(username == ""){
        err.classList.add("show-err");
        setTimeout(() => {
            err.classList.remove("show-err");
        },2000);
    } else {
        window.location.replace("index.html");
        localStorage.setItem("User", JSON.stringify(username));
        user.innerHTML = `${username}`; // Remove the let keyword from this line
    }
}


// Get the user data from local storage
let userData = JSON.parse(localStorage.getItem("User"));

// Set the user name to the user element
let userElement = document.getElementById("user").innerHTML = `${userData}`;
userElement.innerHTML = userData;


// get the first leter of the user to dispay on the user profile



// check if user login or have a data on local storage

if (userData == null){
    let warningPage = document.getElementById("warning-page");
    let warningCard = document.getElementById("warning-card");

    warningPage.classList.add("show-warning-page");
    warningCard.classList.add("show-warning-modal");

    setTimeout(()=>{
        warningPage.classList.remove("show-warning-page");
        warningCard.classList.remove("show-warning-modal");

        window.location.replace("login.html");
    },3000)

    
}





function getGreeting() {
    const currentHour = new Date().getHours();
    let greeting;
  
    if (currentHour >= 5 && currentHour <= 11) {
      greeting = "Good Morning";
    } else if (currentHour >= 12 && currentHour <= 17) {
      greeting = "Good Afternoon";
    } else {
      greeting = "Good Evening";
    }
  
    return greeting;
  }

  
  const greeting = getGreeting();
  document.getElementById("day").innerHTML = greeting;



// addTodo()

let todoList = [];

function addTodo(){

    
    let taskTitle = document.getElementById('task-title').value;
    let taskUrl = document.getElementById('task-url').value;
    let taskTimer = document.getElementById('task-timer').value;

    
    if ((taskTitle == "") && (taskUrl == "") && (taskTimer == "")){
        // alert("Field is Empty!");
        taskTitle.classList.add("show-taskerr");
        taskUrl.classList.add("show-taskerr");
        taskTimer.classList.add("show-taskerr");
    }else{
    
    closePopupModal.classList.remove("show-task-modal");

    document.getElementById('task-title').value = '';
    document.getElementById('task-url').value = '';
    document.getElementById('task-timer').value = '';
    let TodoStorage = JSON.parse(localStorage.getItem("MyTodo")) || [];
    TodoStorage.push({Title: taskTitle, Url: taskUrl, Timer: taskTimer });
    localStorage.setItem("MyTodo", JSON.stringify(TodoStorage));

    todoList = TodoStorage;

    ShowTodoList();
    }
}

// Display the save data from Local Storage
let taskContainer = document.getElementById("task-container");

function ShowTodoList() {
    taskContainer.innerHTML = "";
    let taskNumber = 0;
    let completedTasksCount = 0;
  
    todoList.forEach(function (TodoList) {
      taskNumber++;
  
      let isCompleted = localStorage.getItem(`taskCompleted_${taskNumber}`) === "true";
      let isChecked = localStorage.getItem(`radioChecked_${taskNumber}`) === "true";
  
      if (isCompleted) {
        completedTasksCount++;
      }
  
      taskContainer.innerHTML += `
        <li>
          <div class="radiocheck" onclick="radiocheck(event, ${taskNumber}), checkcom(event)">
            <ion-icon name="radio-button-off-outline" id="uncheck" class="${isChecked ? "checkfalse" : ""}"></ion-icon>
            <ion-icon name="radio-button-on-outline" id="check" class="${isChecked ? "checktrue" : ""}"></ion-icon>
          </div>
  
          <span class="task-text ${isCompleted ? "task-textcomplete" : ""}" id="task-text_${taskNumber}">
            <label><a href="${TodoList.Url}" target="_blank">${TodoList.Title}</a></label>
          </span>
  
          <span class="task-time">
            <label>${TodoList.Timer}</label>
          </span>
  
          <span class="trash-cont" onclick="removeItem(${taskNumber - 1})">
            <ion-icon name="trash-outline"></ion-icon>
          </span>
        </li>
      `;
    });
  
    localStorage.setItem("taskNumber", taskNumber);
    localStorage.setItem("completedTasksCount", completedTasksCount);
  }






todoList = JSON.parse(localStorage.getItem("MyTodo")) || [];
ShowTodoList();



function radiocheck(event, taskNumber) {
    let radioContainer = event.currentTarget;
    let radiofalse = radioContainer.querySelector("#uncheck");
    let radiotrue = radioContainer.querySelector("#check");
    let taskText = radioContainer.parentNode.querySelector(".task-text");
  
    radiofalse.classList.toggle("checkfalse");
    radiotrue.classList.toggle("checktrue");
    taskText.classList.toggle("task-textcomplete");
  
    let isChecked = radiofalse.classList.contains("checkfalse");
    localStorage.setItem(`radioChecked_${taskNumber}`, isChecked);
  
    let isCompleted = taskText.classList.contains("task-textcomplete");
    localStorage.setItem(`taskCompleted_${taskNumber}`, isCompleted);
  
    let completedTasks = document.querySelectorAll(".task-textcomplete");
    let completedTasksCount = completedTasks.length;
    localStorage.setItem("completedTasksCount", completedTasksCount);

    // play audio when user click task completed
	const audio = new Audio("./music/ting1.mp3");
	audio.play();

  }
  
  function checkcom(event) {
    event.stopPropagation();
  }
  
  
  



function removeItem(taskNumber) {
    let TodoStorage = JSON.parse(localStorage.getItem("MyTodo")) || [];
    let DeletedStorage = JSON.parse(localStorage.getItem("DeletedTask")) || [];
    let deletedTask = TodoStorage.splice(taskNumber, 1);
    localStorage.setItem("MyTodo", JSON.stringify(TodoStorage));

   // Remove the task completed status from localStorage
    localStorage.removeItem(`taskCompleted_${taskNumber + 1}`);
  
  // Remove the radio button status from localStorage
    localStorage.removeItem(`radioChecked_${taskNumber + 1}`);
  
  // Update the DeletedStorage and save the count
    DeletedStorage.push(deletedTask);
    localStorage.setItem("DeletedTask", JSON.stringify(DeletedStorage));

    let deletedTaskCount = DeletedStorage.length;
    localStorage.setItem("DeletedTaskCount", deletedTaskCount);

    todoList = TodoStorage;
    ShowTodoList();

}








