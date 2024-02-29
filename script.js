document.addEventListener("DOMContentLoaded", function () {
    var taskInput = document.getElementById("new-task");
    var addButton = document.querySelector("button");
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
        var listItem = createNewTaskElement(taskInput.value);
        incompleteTaskHolder.appendChild(listItem);
        bindTaskEvents(listItem, taskCompleted);

        taskInput.value = "";
    };

    var editTask = function () {
        var listItem = this.parentNode;
        var editInput = listItem.querySelector('input[type=text]');
        var label = listItem.querySelector("label");
        var containsClass = listItem.classList.contains("editMode");

        if (containsClass) {
            label.innerText = editInput.value;
        } else {
            editInput.value = label.innerText;
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
        var editButton = taskListItem.querySelector("button.edit");
        var deleteButton = taskListItem.querySelector("button.delete");

        editButton.onclick = editTask;
        deleteButton.onclick = deleteTask;
        checkBox.onchange = checkBoxEventHandler;
    };

    addButton.onclick = addTask;
    addButton.addEventListener("click", addTask);

    resetButton.onclick = function () {
        incompleteTaskHolder.innerHTML = "";
        completedTasksHolder.innerHTML = "";
    };

    for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
        bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
    }

    for (var i = 0; i < completedTasksHolder.children.length; i++) {
        bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
    }
});
