document.addEventListener("DOMContentLoaded", function () {
    var taskInput = document.getElementById("new-task");
    var addButton = document.querySelector("button");
    var addButton = document.querySelector("#add-task button");
    var incompleteTaskHolder = document.getElementById("incomplete-tasks");
    var completedTasksHolder = document.getElementById("completed-tasks");
    var resetButton = document.getElementById("reset");
@@ -29,23 +29,29 @@ document.addEventListener("DOMContentLoaded", function () {
    };

    var addTask = function () {
        var listItem = createNewTaskElement(taskInput.value);
        var taskContent = taskInput.value.trim(); // Trim to remove whitespace
        if (taskContent === "") {
            alert("Please enter a task."); // Alert if input is empty
            return;
        }

        var listItem = createNewTaskElement(taskContent);
        incompleteTaskHolder.appendChild(listItem);
        bindTaskEvents(listItem, taskCompleted);

        taskInput.value = "";
        taskInput.value = ""; // Clear input field
    };

    var editTask = function () {
        var listItem = this.parentNode;
        var editInput = listItem.querySelector('input[type=text]');
        var label = listItem.querySelector("label");
        var containsClass = listItem.classList.contains("editMode");
        var editInput = document.createElement("input");
        editInput.type = "text";
        editInput.value = listItem.querySelector("label").innerText;
        listItem.insertBefore(editInput, listItem.firstChild);

        var containsClass = listItem.classList.contains("editMode");
        if (containsClass) {
            label.innerText = editInput.value;
        } else {
            editInput.value = label.innerText;
            listItem.querySelector("label").innerText = editInput.value;
        }

        listItem.classList.toggle("editMode");
@@ -71,27 +77,29 @@ document.addEventListener("DOMContentLoaded", function () {

    var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
        var checkBox = taskListItem.querySelector("input[type=checkbox]");
        var editButton = taskListItem.querySelector("button.edit");
        var deleteButton = taskListItem.querySelector("button.delete");
        var editButton = taskListItem.querySelector(".edit");
        var deleteButton = taskListItem.querySelector(".delete");

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
    // Binding existing tasks
    var incompleteTasks = incompleteTaskHolder.querySelectorAll("li");
    incompleteTasks.forEach(function(task) {
        bindTaskEvents(task, taskCompleted);
    });

    for (var i = 0; i < completedTasksHolder.children.length; i++) {
        bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
    }
    var completedTasks = completedTasksHolder.querySelectorAll("li");
    completedTasks.forEach(function(task) {
        bindTaskEvents(task, taskIncomplete);
    });
});
