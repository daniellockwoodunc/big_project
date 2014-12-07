//Hey, Steven.  Don't know if you're gonna read this, but I want to say that I hate that I wasn't able to get further with this project this semester.
//I'd love to keep going with it until it's what I had originally planned it to be.

$(document).foundation();

function loadTasksActive(){ //-------------------------------------------MAIN TASKS POPULATED HERE--------------------------------//
      if ($('body').is('.index')){
     // Create our Firebase reference
     var tasksToDisplay = 7;  //not going to do anything without the ".limit(tasksToDisplay);" not being commented out
     var taskListRef = new Firebase('https://designr.firebaseio.com//tasks');
     var taskListView = taskListRef.length;  //.limit(tasksToDisplay);

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
                                    
                                        //var taskStatus = task[6];
                                       // console.log(taskStatus);
                                        console.log(val);
                                        console.log(key);
                                        task.push(val);
                   } );
                    
                    listItems += '<dd class="accordion-navigation accordion-topEntry taskClass"><a href="#link_' + task[0] + '">'
                    listItems += '<div class="accordion-titlebar-heightFix" id="' + task[0] + '"><div class="date-div right"><p class="accordion-titleFix date-p">' + task[1] +'</p></div>'
                    listItems += '<div class="left circle"></div>'
                    listItems += '<div class="left"><p class="darker-p">' + task[5] + '</p>'
                    listItems += '<p class="description-p">' + task[7] + '</p></div></div></a>'
                    listItems += '<div id="link_' + task[0] + '" class="content"><div class="row"><div class="large-12 column squeeze"><div class="right">'
                    listItems += '<p class="textRight time-text">' + task[4] + ' hours projected</p></div>'
                    listItems += '<div class="left" style="margin-top: -3px"><img src="img/icon-timerOff-24x24.png" alt="icon-timerOff-24x24" class="' + task[0] + '" id="img_' + task[0] + '"></div>' //------Need to remove inline style at some point
                    listItems += '<div style="margin-left: 8px" class="left time-text" id="countdown_' + task[0] +'"></div></div><div class="large-12 column squeeze">' //-----point in html where .countdown manifests
                    listItems += '<p class="description-p">' + task [2] + '</p><div class="right" style="margin-top: 5px"><img src="img/icon-cancel-24x24.png" alt="icon-cancel-24x24" class="' + task[0] + '"></div>' // -----targetting the img src for the cancel functioon
		    listItems += '<div class="left" style="margin-top: 5px"><!--<img src="img/icon-chevronLeft-big-24x24.png" alt="icon-chevronLeft-24x24">--></div></div></div></div></dd>' //HTML INCLUDES COMMENTING TO GET RID OF HISTORY ARROW.
                    
            });
            console.log("accordian finished");  //-----testing hierarchy of functions; code does not run properly unless the html is built first
            
            $("#task-list").html(listItems);
            
            setUp(); //-----initializing 
     }); //end taskListRef.once();
      }
}  // end loadTasksActive();

function loadTasksHistory(){ //--------------------------------HISTORY TASKS POPULATED HERE----------------------------------//
     if ($('body').is('.history')){

     // Create our Firebase reference
     var tasksToDisplay = 7;
     var taskListRef = new Firebase('https://designr.firebaseio.com//tasks');
     var taskListView = taskListRef.legnth; //limit(tasksToDisplay);

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
                    //listItems += '<div class="left circle"></div>'
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
      if ($('body').is('.index')){  //-----the counting function should only apply for the main page.
          console.log("setUp running"); //-----testing the hierarchy of the functions.  Both of the loadTasks(); should run before setUp();
          $('.taskClass').click((function(){
                         
                       var itemClicked = event.target.id;  //-----pulls the ID of the main accordion <div>
                       console.log(itemClicked);  //-----checking ID
                       var startDate = new Date();  //-----starts counter at 00:00:00; pulls current time in milliseconds since 1970
                       var firebaseDate = ""; //-----------COME BACK TO THIS RIGHT HERE
                       var currentAccordion =  "countdown_" + itemClicked;  //-----distinguishing ID but incorporating the same unique string
                       $("#" + currentAccordion).countdown({since: startDate, compact: true, 
                       format: 'HMS', description: ''}); //-----.countdown is defined in jquery.countdown.css
                       //checkIfUserExists(itemClicked);
                       console.log(currentAccordion); //----making sure we're getting the right result out of all this
               })//enclosing anonymous function of $('.taskClass')
               
                    
	  ); //end $('.taskClass')
          $("img[src='img/icon-cancel-24x24.png']").click((function(){
     
                       var itemClicked = $(event.target).attr('class');
                       console.log(itemClicked + " cancel button");
                       checkIfUserExists(itemClicked);
                       var currentRef = new Firebase('https://designr.firebaseio.com//tasks//' + itemClicked);
                       currentRef.remove();
                         
                       location.reload();
                       console.log(currentRef);
               })//enclosing anonymous function of $('img[src=icon cancel]')
               
               
	  ); //end $('img[src=icon cancel]')
          
           $("img[src='img/icon-timerOff-24x24.png']").click((function(){ //-----I'd love to switch out the icon with another one on each toggle, but I don't know how to write a loop for that.
                       var itemClicked = $(event.target).attr('class');  //------I used class identifiers in conjunction with the unique ID to make things easier on myself down the line with functions.
                       console.log(itemClicked + " cancel button");  //-----Because having affirmation in the Console is nice.
                      $('#countdown_' + itemClicked + '').countdown('toggle'); //-----.countdown('toggle') is a jquery.countdown.js-defined function.
                      var countData = $("#countdown_" + itemClicked).countdown('getTimes');
                      var text = '';
                      for (var i = 0; i < countData.length; i++) {
                         text += countData[i] + '' + $.countdown.regionalOptions[''].labels[i] + ' ';
                      }
                      console.log(countData);
                      console.log(text);
 //                     var countFinal //-----This variable will hold the computations necessary to convert the string countData into milliseconds to be saved on the server.
               })//enclosing anonymous function of $('img[src=icon timerOff]')
                    
	  ); //end $('img[src=icon timerOff]')
                     
                    }
                                          
         // function checkIfUserExists(itemClicked) { //Searching the database at the given location and spitting out a value of "hoursActive"
         //         var termRef = new Firebase(DATA_LOCATION);
          //        termRef.child(itemClicked).once('value', function(snapshot) {
          //        var singleTask = snapshot.val();
         //         console.log(singleTask.hoursActive);
          
         // });
          //}
          
       //----------end if statement
                                          
                                          

 } // --------- end setUp();

//$(window).unload(function() { //----------To update thevalues of hours active for each task upon reloading COMMENTING OUT FOR FUNCTIONALITY'S SAKE
 //         var taskListRef = new Firebase('https://designr.firebaseio.com//tasks'); //-----everything at this line and below was copied from elsewhere in hopes of changing specifically one object based on the time at .unload();
 //         var taskListView = taskListRef.length;  //.limit(tasksToDisplay);

//          taskListRef.once('value', function(dataSnapshot) { //getting a value immediately at URL then outputing a Snapshot
            // store dataSnapshot for use in below examples.
//           taskListView = dataSnapshot.val();
            
 //         $.each(taskListView, function(key, val) { //-----Copying pasting-to-html structure; "key" = unique ID. "val" = strings under that val
 //                var task = [];
                    
 //                task.push(key);  //-----not sure if this is necessary for executing this part
                    
  //                $.each(val, function(key, val) { //key refers to object name, val refers to object value; different thank tier above
//                                    if (key ==="hoursActive") { //only at this level of the function is "key" describing the name of the object/data, rather than the Unique ID
  //                                      $.set() //trying to set the value of hoursActive to the countData.  But how do I do that with this being out of scope?
  //                                  } else { //don't think an "else" is actually required.
 //                                       console.log("This is crap");
//                                       var taskStatus = task[3];
//                                       console.log(taskStatus); }
                                          // task.push(val);
 //                  });
//    for (test) {
          //loop through each of the variables from the data location. Get each time and append the value on the server
//     }
//     var countData = $("#countdown_" + itemClicked).countdown('getTimes');
//                      var text = '';
 //                     for (var i = 0; i < countData.length; i++) {
 //                        text += countData[i] + '' + $.countdown.regionalOptions[''].labels[i] + ' ';
  //                    }
 //                     console.log(countData);
 //                     console.log(text);
//});
          
 //         });
//});//----------end $(window).unload(function(){}); -------------------AND END OF COMMENTING-OUT CHAIN

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


//function checkIfUserExists(searchTerm) {
//          var termRef = new Firebase(DATA_LOCATION);
//          termRef.child(searchTerm).once('value', function(snapshot) {
//          var singleTask = snapshot.val();
//          console.log(singleTask.hoursActive);
          

//});
//}




    
    //taskRef.update({
        //"hoursEstimate" : value
    //});
   //console.log("done running updateTask()")

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


