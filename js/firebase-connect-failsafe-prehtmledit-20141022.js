
//place functions for data connect here...

function loadTasks(){
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
                    var title = [];
                    
                    console.log('Key: ' + key + ' Val: ' + val)
                    title.push(key);
                    $.each(val, function(key, val) {
                                title.push(val);
                    });
                    
                    listItems+= '<li"><a href="#"><img src=" ' + title[4] + ' ">'
                    listItems += '<h2>' + title[0] + "</h2>";
                    listItems += '<p>' + title[3] + '</p></a>'
                    
            });
            console.log(listItems);
            $("#task-list").html(listItems);
     });
}

function go() {
    var searchTerm = prompt('Task name?', 'Logo Redesign');
    checkIfUserExists(searchTerm);
}

var DATA_LOCATION = 'https://designr.firebaseio.com//tasks';

function termExistsCallback(searchTerm, exists) {
    if (exists) {
        alert('user ' + searchTerm +  ' exists!');
    } else {
        alert('user ' + searchTerm + ' does not exist!');
    }
}

// Tests to see if /users/<searchTerm> has any data.
function checkIfUserExists(searchTerm) {
    var termRef = new Firebase(DATA_LOCATION);
    termRef.child(searchTerm).once('value', function(snapshot) {
        var exists = (snapshot.val() !== null);
        console.log(exists);
        termExistsCallback(searchTerm, exists);
    });
}

var ref = new Firebase("https://designr.firebaseio.com//tasks");

//Set up Function
function updateTask(){
    var value = prompt('Change the hoursEstimate to:', '21');
    console.log(ref);
    var taskRef = ref.child("Logo Redesign");
    
    taskRef.update({
        "hoursEstimate" : value
    });
    console.log("done running updateTask()")

}

function postTask(){
  //  ref.push("App Project");
   // var taskRef = ref.child("App Project");
    ref.push({
        name: "App Project",
        date: "20140401",
        description: "this shits gone meta",
        hoursActive: "0",
        hoursEstimate: "9001",
        state: "active"
    });
}


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
    
    go();
    
    updateTask();
    
    postTask();
});


