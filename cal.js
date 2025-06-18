/* 
Steps for Algo:
    1. Let user click on day, pull up event menu
        a. this event menu will display all events for that day
        b. this menu will need a create and delete button
    2. Turn task into a list and display it on the day
    3. Store the change in local storage 
    
*/
import localForage from 'https://cdn.jsdelivr.net/npm/localforage/+esm';
import { currentDate } from "./generateCal.js";


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

        const numberDiv = day.querySelector('.number');
        const dayNum = numberDiv?.textContent;
        if(!dayNum || day.classList.contains('inactive')){
            return; 
        }

        const fullDate = day.dataset.date;
        getLocalData(fullDate, taskList);

        taskContainer.style.display = "block";

        
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
                deleteLocal(fullDate, input);
            });

            li.appendChild(deleteButton);
            taskList.appendChild(li);
            saveLocalData(fullDate, input);
        });
    });
}


function saveLocalData(date, item){
    localForage.getItem(date).then(tasks => {
        tasks = tasks || [];
        tasks.push(item);
        localForage.setItem(date, tasks);
    });
}


function getLocalData(date, taskList){
    localForage.getItem(date).then(tasks =>{
        if(!tasks){
            return;
        }
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = "X";
            deleteButton.classList.add("delete-item-btn");
            deleteButton.addEventListener("click", (event) => {
                event.stopPropagation(); // prevent triggering day click again
                li.remove();
                deleteLocal(date, task);
            });

            li.appendChild(deleteButton);
            taskList.appendChild(li);
        });
    });
}


function deleteLocal(date, taskToDelete){
    localForage.getItem(date).then(tasks=>{
        if (!tasks){
            return;
        }
        const newTasks = tasks.filter(task => task !== taskToDelete);
        localForage.setItem(date, newTasks);
    });
}

