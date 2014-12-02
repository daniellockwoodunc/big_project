
//place functions for data connect here...

$(document).foundation();

function loadTasksActive(){
      if ($('body').is('.index')){
     // Create our Firebase reference
     var tasksToDisplay = 7;
     var taskListRef = new Firebase('https://designr.firebaseio.com//tasks');
     var taskListView = taskListRef.limit(tasksToDisplay);

     taskListRef.once('value', function(dataSnapshot) { //getting a value immediately at URL then outputing a Snapshot
            var listItems = "";
            // store dataSnapshot for use in below examples.
            taskListView = dataSnapshot.val();
            console.log(taskListView);
            
            $.each(taskListView, function(key, val) {
                    var task = [];
                    
                    console.log('Key: ' + key + ' Val: ' + val);
                    
                    task.push(key);
                    
                    $.each(val, function(key, val) {
                                    
                                        var taskStatus = task[6];
                                        console.log(taskStatus);
                                             task.push(val);
                    });
                    
                    listItems += '<dd class="accordion-navigation accordion-topEntry taskClass"><a href="#link_' + task[0] + '">'
                    listItems += '<div class="accordion-titlebar-heightFix" id="' + task[0] + '"><div class="date-div right"><p class="accordion-titleFix date-p">' + task[1] +'</p></div>'
                    listItems += '<div class="left circle"></div>'
                    listItems += '<div class="left"><p class="darker-p">' + task[5] + '</p>'
                    listItems += '<p class="description-p">' + task[7] + '</p></div></div></a>'
                    listItems += '<div id="link_' + task[0] + '" class="content"><div class="row"><div class="large-12 column squeeze"><div class="right">'
                    listItems += '<p class="textRight time-text">' + task[4] + ' hours projected</p></div>'
                    listItems += '<div class="left timerToggle" style="margin-top: -3px"><img src="img/icon-timerOff-24x24.png" alt="icon-timerOff-24x24"></div>' //------Need to remove inline style at some point
                    listItems += '<div style="margin-left: 8px" class="left time-text" id="countdown_' + task[0] +'"></div></div><div class="large-12 column squeeze">'
                    listItems += '<p class="description-p">' + task [2] + '</p><div class="right" style="margin-top: 5px"><img src="img/icon-cancel-24x24.png" alt="icon-cancel-24x24"></div>'
		    listItems += '<div class="left" style="margin-top: 5px"><img src="img/icon-chevronLeft-big-24x24.png" alt="icon-chevronLeft-24x24"></div></div></div></div></dd>'
                    
            });
            console.log("accordian finished");
            
            $("#task-list").html(listItems);
            
            setUp();
     }); //end taskListRef.once();
      }
}  // end loadTasksActive();

function loadTasksHistory(){
     if ($('body').is('.history')){

     // Create our Firebase reference
     var tasksToDisplay = 7;
     var taskListRef = new Firebase('https://designr.firebaseio.com//tasks');
     var taskListView = taskListRef.limit(tasksToDisplay);

     taskListRef.once('value', function(dataSnapshot) { //getting a value immediately at URL then outputing a Snapshot
            var listItems = "";
            // store dataSnapshot for use in below examples.
            taskListView = dataSnapshot.val();
            console.log(taskListView);
            
            $.each(taskListView, function(key, val) {
                    var task = [];
                    
                    console.log('Key: ' + key + ' Val: ' + val);
                    
                    task.push(key);
                    
                    $.each(val, function(key, val) {
                                    
                                        var taskStatus = task[6];
                                        console.log(taskStatus);
                                             task.push(val);
                    });
                    
                    listItems += '<dd class="accordion-navigation accordion-topEntry taskClass"><a href="#link_' + task[0] + '">'
                    listItems += '<div class="accordion-titlebar-heightFix" id="' + task[0] + '"><div class="date-div right"><p class="accordion-titleFix date-p">' + task[1] +'</p></div>'
                    listItems += '<div class="left circle"></div>'
                    listItems += '<div class="left"><p class="darker-p">' + task[5] + '</p>'
                    listItems += '<p class="description-p">' + task[7] + '</p></div></div></a>'
                    listItems += '<div id="link_' + task[0] + '" class="content"><div class="row"><div class="large-12 column squeeze"><div class="right">'
                    listItems += '<p class="textRight time-text">' + task[4] + ' hours projected</p></div>'
                    listItems += '<div style="margin-left: 8px" class="left time-text" id="countdown_' + task[0] +'"></div></div><div class="large-12 column squeeze">'
                    listItems += '<p class="description-p">' + task [2] + '</p><div class="right" style="margin-top: 5px"><img src="img/icon-cancel-24x24.png" alt="icon-cancel-24x24"></div>'
		    listItems += '<div class="left" style="margin-top: 5px"><img src="img/icon-chevronLeft-big-24x24.png" alt="icon-chevronLeft-24x24"></div></div></div></div></dd>'
                    
            });
            console.log("HISTORY ACCORDION");
            
            $("#task-list").html(listItems);
            
            setUp();
     }); //end taskListRef.once();
}  //end if statement
} // end loadTasksHistory();

var DATA_LOCATION = 'https://designr.firebaseio.com//tasks';

function setUp(){
      if ($('body').is('.index')){
          console.log("setUp running");
          $('.taskClass').click((function(){
     
                       var itemClicked = event.target.id;
                       console.log(itemClicked);
                       var startDate = new Date();
                       var currentAccordion =  "countdown_" + itemClicked;
                       $("#" + currentAccordion).countdown({since: startDate, compact: true, 
                       format: 'HMS', description: ''});
                       console.log(itemClicked);
                       checkIfUserExists(itemClicked);
                       console.log(currentAccordion);
               })//enclosing anonymous function of $('.taskClass')
               
                    
	  ); //end $('.taskClass')
      }
                                          
          function checkIfUserExists(itemClicked) { //Searching the database at the given location and spitting out a value of "hoursActive"
                  var termRef = new Firebase(DATA_LOCATION);
                  termRef.child(itemClicked).once('value', function(snapshot) {
                  var singleTask = snapshot.val();
                  console.log(singleTask.hoursActive);
          
          });
          }
          
       //----------end if statement
                                          
 } // --------- end setUp();



var ref = new Firebase('https://designr.firebaseio.com//tasks');


 function pushTaskActive(){
    
    var taskName = $('#taskNameInput').val();
    var taskDate = $('#taskDateInput');
    var taskDescription = $('#taskDescriptionInput').val();
    var taskActive = $('#taskActiveInput').val();
    var taskEstimate = $('#taskEstimateInput').val();
    var taskState = $('#taskStateInput').val();
    
    //var newTaskRef =taskListRef.child(taskName);
    ref.push({
                     name : taskName,
                     date : taskDate,
                     description : taskDescription,
                     hoursActive : 0,
                     hoursEstimate : taskEstimate,
                     state : "active",
                     zproject : "Miscellaneous"
                     });
    console.log(taskName);
    
    document.getElementById("newTaskForm").reset();
     
    
};

$('.task').click(function(){
          
          var dateFunction = new Date();
          var clickTime = dateFunction.getTime();
          
          
          
     
});

$('#submit').click(function() {
    location.reload();
});

$('#pageTransfer').click(function(){
        loadTasksHistory(); 
});

//$('.history').click(function updateTaskState(){
    // var ref = 1
     
  //   ref.update({
    //      state : "history"
  //   })
     
//});

//var searchTerm = prompt('Task name?', '-JZu_PngKDVu-VuJDbRm');

//function go() {
          
 //         checkIfUserExists(searchTerm);
//}



//function termExistsCallback(searchTerm, exists) {
   //       if (exists) {
 //         alert('user ' + searchTerm +  ' exists!');
   //       } else {
   //       alert('user ' + searchTerm + ' does not exist!');
 //}
//}

//function checkIfUserExists(searchTerm) {
//          var termRef = new Firebase(DATA_LOCATION);
//          termRef.child(searchTerm).once('value', function(snapshot) {
//          var singleTask = snapshot.val();
//          console.log(singleTask.hoursActive);
          

//});
//}

// Tests to see if /users/<searchTerm> has any data.



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
        loadTasksActive()
        loadTasksHistory()
        }
        
$( document ).ready(function() {
    //for browser use only
    console.log( "document ready!" );
    //function to populate menu
    
    
    loadTasksActive();
    loadTasksHistory();
     
    
    //go();
    
    //updateTask();
    
    //postTask();
    
function countUp(target){
     
     console.log(target);
     
}
});


