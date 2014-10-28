
//place functions for data connect here...

function loadTasks(){
     // Create our Firebase reference
     var tasksToDisplay = 5;
     var taskListRef = new Firebase('https://designr.firebaseio.com//tasks');
     var taskListView = taskListRef.limit(tasksToDisplay);
     
     taskListRef.once('value', function(dataSnapshot) { //getting a value immediately at URL then outputing a Snapshot
            var listItems = "";
            // store dataSnapshot for use in below examples.
            taskListView = dataSnapshot.val();
            console.log(taskListView);
            
            $.each(taskListView, function(key, val) {
                    var task = [];
                    
                    console.log('Key: ' + key + ' Val: ' + val)
                    task.push(key);
                    $.each(val, function(key, val) {
                                task.push(val);
                    });
                    
                    listItems += '<dd class="accordion-navigation accordion-marginTop"><a href="#panel' + task[0] + '">'
                    listItems += '<h2 class="accordion-titleFix">' + task[5] + '</h2></a>'
                    listItems += '<div id="panel' + task[0] + '" class="content">'
                    listItems += '<div class="row"><div class="large-12 column"><div class="right"><h4 class="textRight">' + task[1] + '</h4></div>'
                    listItems += '<div class="left"><h6>' + task[3] + ' hours active<br>' + task[4] + ' estimated hours</h6></div></div><div class="large-12 column"><h3>' + task[2] + '</h3></div></div></div></dd>'
                    
            });
            console.log(listItems);
            $("#task-list").html(listItems);
     });
}

var ref = new Firebase('https://designr.firebaseio.com//tasks');
 function pushTask(){
    
    var taskName = $('#taskNameInput').val();
    var taskDate = $('#taskDateInputYear').val(); // + '#taskDateInputMonth' + '#taskDateInputDay'
    var taskDescription = $('#taskDescriptionInput').val();
    var taskActive = $('#taskActiveInput').val();
    var taskEstimate = $('#taskEstimateInput').val();
    var taskState = $('#taskStateInput').val();
    
    //var newTaskRef =taskListRef.child(taskName);
    ref.push({
                     name : taskName,
                     date : taskDate,
                     description : taskDescription,
                     hoursActive : "0",
                     hoursEstimate : taskEstimate,
                     state : "active"
                     });
    console.log(taskName);
    
    document.getElementById("newTaskForm").reset();
     
    
};

$('#submit').click(function() {
    location.reload();
});

//$('.history').click(function updateTaskState(){
    // var ref = 1
     
  //   ref.update({
    //      state : "history"
  //   })
     
//});


//function go() {
    //var searchTerm = prompt('Task name?', 'Logo Redesign');
    //checkIfUserExists(searchTerm);
//}

//var DATA_LOCATION = 'https://designr.firebaseio.com//tasks';

//function termExistsCallback(searchTerm, exists) {
   // if (exists) {
    //    alert('user ' + searchTerm +  ' exists!');
  //  } else {
   //     alert('user ' + searchTerm + ' does not exist!');
 //   }
//}

// Tests to see if /users/<searchTerm> has any data.
//function checkIfUserExists(searchTerm) {
    //var termRef = new Firebase(DATA_LOCATION);
   // termRef.child(searchTerm).once('value', function(snapshot) {
     //   var exists = (snapshot.val() !== null);
       // console.log(exists);
        //termExistsCallback(searchTerm, exists);
    //});
//}


//Set up Function
//function updateTask(){
    //var value = prompt('Change the hoursEstimate to:', '21');
   //console.log(ref);
    //var taskRef = ref.child("Logo Redesign");
    
    //taskRef.update({
        //"hoursEstimate" : value
    //});
   //console.log("done running updateTask()")

//}

//function postTask(){
  //  ref.push("App Project");
   // var taskRef = ref.child("App Project");
    //ref.push({
      //  name: "Whatevs",
      //  date: "20140401",
        //description: "this shits gone meta",
       // hoursActive: "0",
        //hoursEstimate: "9001",
       // state: "active"
    //});
//}


function onDeviceReady() {
    //needed only for mobile deployment
    console.log("onDeviceReady()");
        loadTasks()
        }

$( document ).ready(function() {
    //for browser use only
    console.log( "document ready!" );
    //function to populate menu  
    loadTasks();
    
    //go();
    
    //updateTask();
    
    //postTask();
});


