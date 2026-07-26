const STORAGE_KEY = "tasks";

const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");
const errorMessage = document.getElementById("errorMessage");

let tasks = loadTasks();

function createTask(taskText) {
    return {
        id: Date.now(),
        text: taskText,
        completed: false
    };
}

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        errorMessage.textContent = "Please enter a task.";
        return;
    }

    const newTask = createTask(taskText);

    tasks.push(newTask);
    saveTasks();
    renderTasks();

    taskInput.value = "";
    errorMessage.textContent = "";
    taskInput.focus();
}

function toggleTask(taskId) {
    tasks = tasks.map((task) => {
        if (task.id === taskId) {
            return {
                ...task,
                completed: !task.completed
            };
        }

        return task;
    });

    saveTasks();
    renderTasks();
}

function deleteTask(taskId) {
    tasks = tasks.filter((task) => task.id !== taskId);

    saveTasks();
    renderTasks();
}

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task) => {
        const listItem = document.createElement("li");
        const taskText = document.createElement("span");
        const completeButton = document.createElement("button");
        const deleteButton = document.createElement("button");

        listItem.classList.add("task-item");

        if (task.completed) {
            listItem.classList.add("completed");
        }

        taskText.classList.add("task-text");
        taskText.textContent = task.text;

        completeButton.classList.add("complete-button");
        completeButton.textContent = task.completed ? "Undo" : "Complete";
        completeButton.addEventListener("click", () => {
            toggleTask(task.id);
        });

        deleteButton.classList.add("delete-button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            deleteTask(task.id);
        });

        listItem.append(taskText, completeButton, deleteButton);
        taskList.appendChild(listItem);
    });
}

function saveTasks() {
     localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function loadTasks() {
   const savedTasks = localStorage.getItem(STORAGE_KEY);

    if (savedTasks === null) {
        return [];
    }

    try {
        return JSON.parse(savedTasks);
    } catch (error) {
        console.error("Unable to load saved tasks:", error);
        return [];
    }
}

addTaskButton.addEventListener("click", addTask);

taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});

renderTasks();