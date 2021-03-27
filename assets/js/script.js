var timeOfTheDay = moment().hour(); //get current time in hour
var currentDate = moment().format("dddd, Do MMMM YYYY"); //get the current date
var getTaskClass = ""; //get the class of the task saved
var getTaskId = ""; //get the id of the task saved
var saveTask = [];

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
$(".row").on("click",".add-task",function(){

    //save the edited time blocks id and class
    getTaskClass = $(this).attr("class");
    getTaskId = $(this).attr("id");
    //console.log(getTaskClass);

    //get the text entered by the user
    var taskText = $(this).text().trim();

    //change td element to textarea
    var textInput = $("<textarea>").addClass(getTaskClass).val(taskText);
    $(this).replaceWith(textInput);
    //console.log(savedTaskId);

    textInput.trigger("focus");
});

//click save button to save the task
$(".saveBtn").on("click", function(){

    //change textarea element back to td element
    var taskText = $(this).prev().val().trim();

    var taskTd = $("<td>").addClass(getTaskClass);
    $(taskTd).attr("id", getTaskId);
    $(taskTd).text(taskText);

    $(this).prev().replaceWith(taskTd);     

    //get the saved task from the local storage
    getTask = JSON.parse(localStorage.getItem("workScheduler")) || [];
    console.log("savetask",saveTask);    

    //object to save the task id and task content
    taskObject = {date:currentDate,id:getTaskId,textValue:saveTaskText};
    console.log("taskObject",taskObject);

    //push th eobject in the array
    saveTask.push(taskObject);

    //save the array in the local storage
    localStorage.setItem("workScheduler", JSON.stringify(saveTask));

});

//when the user reloads the page

$(window).on("load",function{

    var reloadGetTask = JSON.parse(localStorage.getItem("workScheduler")) || [];

    if (reloadGetTask===[]){
        return;
    }

    

})

