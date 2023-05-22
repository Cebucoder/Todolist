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
function LogOutForm(){
    localStorage.removeItem("User");
    localStorage.removeItem("MyTodo");
    localStorage.removeItem("taskNumber");
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
    taskTitle.value = '';
    taskUrl.value = '';
    taskTimer.value = '';   

    let TodoStorage = JSON.parse(localStorage.getItem("MyTodo")) || [];
    TodoStorage.push({Title: taskTitle, Url: taskUrl, Timer: taskTimer });
    localStorage.setItem("MyTodo", JSON.stringify(TodoStorage));

    todoList = TodoStorage;

    ShowTodoList();
    }
}

// Display the save data from Local Storage
let taskContainer = document.getElementById("task-container");

function ShowTodoList(){
    taskContainer.innerHTML = "";
    let taskNumber = 0;
    todoList.forEach(function(TodoList){
        taskNumber++;
        taskContainer.innerHTML +=

        `
        <li >
            <div class="check-status">
            <input type="radio" name="radio">
            <span class="checkmark"></span>
            </div>

            <span class="task-text">
            <!--<label><a href="${"https://"+TodoList.Url}" target="_blank">${TodoList.Title}</a></label>-->
            <label><a href="${TodoList.Url}" target="_blank">${TodoList.Title}</a></label>
            </span>

            <span class="task-time">
            <!--<label><a href="${"https://"+TodoList.Url}" target="_blank">${TodoList.Title}</a></label>-->
            <label>${TodoList.Timer}</label>
            </span>

            <span class="trash-cont" onclick="removeItem(${taskNumber - 1})">
                <ion-icon name="trash-outline"></ion-icon>
            </span>

        </li>
        `;
    });
    // let taskCount = 0;
    localStorage.setItem("taskNumber", taskNumber);
    // let taskCount = JSON.parse(localStorage.getItem("taskNumber")) || 0;
    // document.getElementById("task-count").innerHTML = taskCount;
}

todoList = JSON.parse(localStorage.getItem("MyTodo")) || [];
ShowTodoList();



function removeItem(taskNumber) {
    let TodoStorage = JSON.parse(localStorage.getItem("MyTodo")) || [];
    TodoStorage.splice(taskNumber, 1);
    localStorage.setItem("MyTodo", JSON.stringify(TodoStorage));
    todoList = TodoStorage;
    ShowTodoList();

}






