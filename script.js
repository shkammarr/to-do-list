document.addEventListener("DOMContentLoaded", function () {
    var taskInput = document.getElementById("new-task");
    var addButton = document.querySelector("#add-task button");
    var incompleteTaskHolder = document.getElementById("incomplete-tasks");
    var completedTasksHolder = document.getElementById("completed-tasks");
    var resetButton = document.getElementById("reset");

    var createNewTaskElement = function (taskString) {
        var listItem = document.createElement("li");
        var checkBox = document.createElement("input");
        var label = document.createElement("label");
        var editButton = document.createElement("button");
        var deleteButton = document.createElement("button");

        checkBox.type = "checkbox";
        editButton.innerText = "Edit";
        editButton.className = "edit";
        deleteButton.innerText = "Delete";
        deleteButton.className = "delete";

        label.innerText = taskString;

        listItem.appendChild(checkBox);
        listItem.appendChild(label);
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);

        return listItem;
    };

    var addTask = function () {
        var taskContent = taskInput.value.trim(); // Trim to remove whitespace
        if (taskContent === "") {
            alert("Please enter a task."); // Alert if input is empty
            return;
        }

        var listItem = createNewTaskElement(taskContent);
        incompleteTaskHolder.appendChild(listItem);
        bindTaskEvents(listItem, taskCompleted);

        taskInput.value = ""; // Clear input field
    };

    var editTask = function () {
        var listItem = this.parentNode;
        var editInput = document.createElement("input");
        editInput.type = "text";
        editInput.value = listItem.querySelector("label").innerText;
        listItem.insertBefore(editInput, listItem.firstChild);

        var containsClass = listItem.classList.contains("editMode");
        if (containsClass) {
            listItem.querySelector("label").innerText = editInput.value;
        }

        listItem.classList.toggle("editMode");
    };

    var deleteTask = function () {
        var listItem = this.parentNode;
        var ul = listItem.parentNode;
        ul.removeChild(listItem);
    };

    var taskCompleted = function () {
        var listItem = this.parentNode;
        completedTasksHolder.appendChild(listItem);
        bindTaskEvents(listItem, taskIncomplete);
    };

    var taskIncomplete = function () {
        var listItem = this.parentNode;
        incompleteTaskHolder.appendChild(listItem);
        bindTaskEvents(listItem, taskCompleted);
    };

    var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
        var checkBox = taskListItem.querySelector("input[type=checkbox]");
        var editButton = taskListItem.querySelector(".edit");
        var deleteButton = taskListItem.querySelector(".delete");

        editButton.onclick = editTask;
        deleteButton.onclick = deleteTask;
        checkBox.onchange = checkBoxEventHandler;
    };

    addButton.onclick = addTask;

    resetButton.onclick = function () {
        incompleteTaskHolder.innerHTML = "";
        completedTasksHolder.innerHTML = "";
    };

    // Binding existing tasks
    var incompleteTasks = incompleteTaskHolder.querySelectorAll("li");
    incompleteTasks.forEach(function(task) {
        bindTaskEvents(task, taskCompleted);
    });

    var completedTasks = completedTasksHolder.querySelectorAll("li");
    completedTasks.forEach(function(task) {
        bindTaskEvents(task, taskIncomplete);
    });
});
