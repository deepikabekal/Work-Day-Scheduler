var timeOfTheDay = moment().hour(); //get current time in hour
var currentDate = moment().format("dddd, Do MMMM YYYY"); //get the current date

//display current date
$("#currentDay").text(currentDate);

//color code the time blocks to indicate past, present and future
for (var i=9;i<18;i++){
    //debugger;
    var index = i-9;
    if (i===timeOfTheDay){
        $(".hour").eq(index).next().addClass("present");
    } else if (i<timeOfTheDay){
        $(".hour").eq(index).next().addClass("past");
    } else {
        $(".hour").eq(index).next().addClass("future");
    }
    
}

//click the block to enter an event.
$(".add-task").click(function(){
    var getClass = $(this).attr("class");
    console.log(getClass);
    var taskText = $(this).text().trim();
    var textInput = $("<textarea>").addClass(getClass).val(taskText);
    $(this).replaceWith(textInput);
    textInput.trigger("focus");

});

$(".add-task").on("blur", function(){


})


