// this file will be made for generating the html of the calendar by JavaScript with the use of DayJS
import { setTaskListeners } from "./cal.js";

let currentDate = new dayjs(); // initialize the current day var
let numberOfWeeks;

let currentMonth = currentDate.format("MMMM YYYY");
document.querySelector('.month-title').innerHTML = `${currentMonth}`;
numberOfWeeks = numOfWeeks(currentDate);
generateWeeks(numberOfWeeks);
generateNumbers(currentDate);
setTaskListeners();

// to test if the number of weeks is working console.log(numberOfWeeks); PASSED

const nextBtn = document.querySelector('.next-month');
nextBtn.addEventListener('click', ()=>{
    let nextMonth = currentDate.add(1, "month");
    document.querySelector('.month-title').innerHTML = `${nextMonth.format("MMMM YYYY")}`;
    currentDate = nextMonth;
    numberOfWeeks = numOfWeeks(currentDate);
    generateWeeks(numberOfWeeks);
    generateNumbers(currentDate);
    setTaskListeners();
    // to test if numberOfWeeks is working console.log(numberOfWeeks); PASSED
    
});


const lastBtn = document.querySelector('.prev-month');
lastBtn.addEventListener("click", ()=>{
    let lastMonth = currentDate.subtract(1, "month");
    document.querySelector('.month-title').innerHTML = `${lastMonth.format("MMMM YYYY")}`;
    currentDate = lastMonth;
    numberOfWeeks = numOfWeeks(currentDate);
    generateWeeks(numberOfWeeks);
    generateNumbers(currentDate);
    setTaskListeners();
    // To check if the numberOfWeeks is working console.log(numberOfWeeks); PASSED
});

// function here for calculating how many weeks in a month for how many rows necessary

function numOfWeeks(currentDay){
    const firstDay = currentDay.startOf('month');
    const lastDay = currentDay.endOf('month');
    const numberWeeks = ((lastDay.date() + firstDay.day()) / 7);

    return Math.ceil(numberWeeks);

}   

function generateWeeks(numWeeks){
    // take input of number of weeks
    // divide 550 px by that number
    // generate rows and give them heights of the previous steps result
    
    let weeksHTML = '';
    let rowHeight = Math.floor(550 / numWeeks);
    for(let i = 0; i<numWeeks; i++){
        let rowHTML = `
        <div class = "week-container" style = "height: ${rowHeight}px">
            <div class = "day">
                <div class = "number">
                </div>
            </div>
            <div class = "day">
                <div class = "number">
                </div>
            </div>
            <div class = "day">
                <div class = "number">
                </div>
            </div>
            <div class = "day">
                <div class = "number">
                </div>
            </div>
            <div class = "day">
                <div class = "number">
                </div>
            </div>
            <div class = "day">
                <div class = "number">
                </div>
            </div>
            <div class = "day">
                <div class = "number">
                </div>
            </div>
        </div>
        `;
        weeksHTML += rowHTML;
    }

    document.querySelector('.month-container').innerHTML = weeksHTML;
}


// function here for looping through the remaining cells 
function generateNumbers(currentDay){
    const firstDay = currentDay.startOf('month');
    const dayOne = firstDay.day(); // 0-6 for sun -> sat

    const totalDays = currentDay.daysInMonth();
    const numOfDivs = document.querySelectorAll('.number');

    let day = 1;
    let otherDays;
    let otherDays2 = 1;

    //get the starting point from last months days
    let prevMonth = currentDay.subtract(1, 'month');
    let daysLastMonth = prevMonth.daysInMonth();
    otherDays = daysLastMonth - (dayOne-1);


    //get the starting point for days next month
    
    for(let i = 0; i< numOfDivs.length; i++){
        if(i < dayOne){ // if day is not part of current month I just don't add a number to it
            numOfDivs[i].textContent = otherDays;
            numOfDivs[i].classList.add('inactive');
            otherDays++;
        }
        else if(day > totalDays){
            numOfDivs[i].classList.add('inactive');
            numOfDivs[i].textContent = otherDays2;
            otherDays2++;
        }
        else{
            numOfDivs[i].textContent = day;
            numOfDivs[i].classList.remove('inactive');
            day++;
        }
    }

}