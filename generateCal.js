// this file will be made for generating the html of the calendar by JavaScript with the use of DayJS

let currentDate = new dayjs();
console.log(`${currentDate.format("YYYY-MM-DD")}`);


let currentMonth = currentDate.format("MMMM YYYY");
document.querySelector('.month-title').innerHTML = `${currentMonth}`;

const nextBtn = document.querySelector('.next-month');
nextBtn.addEventListener('click', ()=>{
    let nextMonth = currentDate.add(1, "month");
    document.querySelector('.month-title').innerHTML = `${nextMonth.format("MMMM YYYY")}`;
    currentDate = nextMonth;
});


const lastBtn = document.querySelector('.prev-month');
lastBtn.addEventListener("click", ()=>{
    let lastMonth = currentDate.subtract(1, "month");
    document.querySelector('.month-title').innerHTML = `${lastMonth.format("MMMM YYYY")}`;
    currentDate = lastMonth;
});