var timeOfTheDay = moment().hour(); //get current time in hour
var currentDate = moment().format("dddd, Do MMMM YYYY"); //get the current date


//console.log(currentDate);

//display current date
$("#currentDay").text(currentDate);

//color code the time blocks to indicate past, present and future
for (var i=9;i<17;i++){
    var index = i-9;
    if (i===timeOfTheDay){
        $(".hour").eq(index).next().addClass("present");
    } else if (i<timeOfTheDay){
        $(".hour").eq(index).next().addClass("past");
    } else {
        $(".hour").eq(index).next().addClass("future");
    }
    
}

