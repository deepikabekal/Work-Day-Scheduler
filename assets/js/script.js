var timeOfTheDay = moment().hour(); //get current time in hour
var currentDate = moment().format("dddd, Do MMMM YYYY"); //get the current date
var getTaskClass = ""; //get the class of the task saved
var getTaskId = ""; //get the id of the task saved
var taskText = ""; //get the text entered by the user
var saveTask = []; //array to save the contents of the local storage

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
    //console.log(getTaskId);

   if ($(this).text()!== ""){
        //get the text entered by the user
        taskText = $(this).text().trim();
        //console.log(taskText);
   } else {
       taskText = "";
   }

   
    //change td element to textarea
    var textInput = $("<textarea>").addClass(getTaskClass).val(taskText);
    textInput.attr("id",getTaskId);
    $(this).replaceWith(textInput);
    //console.log(savedTaskId);

    textInput.trigger("focus");
});

//click save button to save the task
$(".saveBtn").on("click", function(){

    //change textarea element back to td element
    taskText = $(this).prev().val().trim();
    console.log(taskText);

    if (taskText===""){
        alert("Please enter valid text.");
        return;
        
    }

    var taskTd = $("<td>").addClass(getTaskClass);
    $(taskTd).attr("id", getTaskId);
    $(taskTd).text(taskText);

    $(this).prev().replaceWith(taskTd);  

    saveTaskToLocal();
    
});

//when the user reloads the page

$(window).on("load",function(){

    var reloadGetTask = JSON.parse(localStorage.getItem("workScheduler")) || [];

    if (reloadGetTask===[]){
        return;
    }

    //display the saved events from the local storage
    $(".add-task").each(function(){

        var taskId = $(this).attr("id");
        for (var i=0;i<reloadGetTask.length;i++){
            if (taskId === reloadGetTask[i].id){
                $(this).text(reloadGetTask[i].textValue);
                break;
            }
        }
        
    });

});

//function for saving the task to the local storage

function saveTaskToLocal(){
    //get the saved task from the local storage
    saveTask = JSON.parse(localStorage.getItem("workScheduler")) || [];
    console.log("savetask",saveTask);    

    //object to save the task id and task content
    var taskObject = {date:currentDate,id:getTaskId,textValue:taskText};
    console.log("taskObject",taskObject);
   
    //check if an existing task is being edited
    //if yes then replace it in the local storage with the new text
    if (saveTask !== []){

       for (var i=0;i<saveTask.length;i++){
           if (getTaskId===saveTask[i].id){
               saveTask.splice(i,1);
               console.log(saveTask);
           }
       }
    }
    
    //push th eobject in the array
    saveTask.push(taskObject);
    console.log(saveTask);

    //save the array in the local storage
    localStorage.setItem("workScheduler", JSON.stringify(saveTask));
}