/* 
Steps for Algo:
    1. Let user click on day, pull up event menu
        a. this event menu will display all events for that day
        b. this menu will need a create and delete button
    2. Turn task into a list and display it on the day
    3. Store the change in local storage 
    
*/


// This file is for handling the task management 
export function setTaskListeners(){
    const popMenuButton = document.querySelectorAll('.day');

    popMenuButton.forEach((day) => {
        // Avoid duplicate containers
        if (day.querySelector('.task-container')) return;

        const taskContainer = document.createElement('div');
        taskContainer.classList.add("task-container");
        taskContainer.style.display = "none";

        const taskList = document.createElement('ul');
        taskList.classList.add('task-list');

        taskContainer.appendChild(taskList);
        day.appendChild(taskContainer); 

        taskContainer.style.display = "block";

        // Add click listener to the day only once
        day.addEventListener('click', ()=> {
            const input = prompt("Enter task:", "Enter Task");
            if (!input) return;

            const li = document.createElement('li');
            li.textContent = input;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = "X";
            deleteButton.classList.add("delete-item-btn");
            deleteButton.addEventListener("click", (event) => {
                event.stopPropagation(); // prevent triggering day click again
                li.remove();
            });

            li.appendChild(deleteButton);
            taskList.appendChild(li);
        });
    });
}


function saveLocalData(){
    
}


function getLocalData(){

}