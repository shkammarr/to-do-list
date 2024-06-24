document.addEventListener("DOMContentLoaded", function () {
    var taskInput = document.getElementById("new-task");
    var addButton = document.querySelector("#add-task button");
    var incompleteTaskHolder = document.getElementById("incomplete-tasks");
    var completedTasksHolder = document.getElementById("completed-tasks");
    var resetButton = document.getElementById("reset");

    var createNewTaskElement = function (taskString) {
        var listItem = document.createElement("li");

        var checkBox = document.createElement("input");
        checkBox.type = "checkbox";

        var label = document.createElement("label");
        label.innerText = taskString;

        var deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.className = "delete";

        listItem.appendChild(checkBox);
        listItem.appendChild(label);
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
        var editInput = listItem.querySelector('input[type=text]');
        var label = listItem.querySelector("label");
        var containsClass = listItem.classList.contains("editMode");

        if (containsClass) {
            label.innerText = editInput.value;
            listItem.removeChild(editInput);
        } else {
            editInput = document.createElement("input");
            editInput.type = "text";
            editInput.value = label.innerText;
            listItem.insertBefore(editInput, label);
        }

        listItem.classList.toggle("editMode");
    };

    var deleteTask = function () {
        var listItem = this.parentNode;
        listItem.parentNode.removeChild(listItem);
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
        var deleteButton = taskListItem.querySelector("button.delete");

        checkBox.onchange = checkBoxEventHandler;
        deleteButton.onclick = deleteTask;
    };

    addButton.addEventListener("click", addTask);

    resetButton.onclick = function () {
        incompleteTaskHolder.innerHTML = "";
        completedTasksHolder.innerHTML = "";
    };

    var incompleteTasks = incompleteTaskHolder.querySelectorAll("li");
    incompleteTasks.forEach(function (task) {
        bindTaskEvents(task, taskCompleted);
    });

    var completedTasks = completedTasksHolder.querySelectorAll("li");
    completedTasks.forEach(function (task) {
        bindTaskEvents(task, taskIncomplete);
    });
});
