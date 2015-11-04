/*
<<<<<<< HEAD
 script for the index.html file
 */
Parse.initialize("rnPVLff4nz9OW4qu9GnkdD18TV4AzzxfLducfGQh", "x62CpPBIqQwvj2nW1eRSo50VWvUMxFSoyJG8NuVB");
//Parse.initialize("HwGkNK09YRPy3ZajicPwpZMfX9vqCyc4ghFl2eh7", "14BQF3zAPvaOR1sh6aEzXX5Wk1LTnBFQopjr1Rbj");

$(function() {
    'use strict';

    /* New Task class for parse */
    var Task = Parse.Object.extend('Task'); /* declaring an object that acts like a class */
    /* new query that will return all tasks order by createdAt */
    var tasksQuery = new Parse.Query(Task);
    tasksQuery.ascending('createdAt');

    // reference to the task list element
    var tasksList = $('#tasks-list');

    // reference to the eroor message alert
    var errorMessage = $('#error-message');

    var tasks = [];

    var ratingElem = $('#rating');

    function displayError(err) {
        errorMessage.text(err.message); // .text does not interpret what you pass as html - it interprets it as a literal string, whereas .html does
=======
    script for the index.html file
*/


//OK to call this before the DOM is ready
Parse.initialize("u8fq2u4IqxKXBa9PuPjHB40HA39gqnxMq8lKJYkG", "R9zpakOjl4dXU3quSQ9tvTwwe0uQA2IJj3GdNKTt");

//when the document is ready...
$(function() {
    'use strict';

    //define a new Task object class with Parse
    var Task = Parse.Object.extend('Task');

    //define a query for querying Task objects
    var tasksQuery = new Parse.Query(Task);
    tasksQuery.ascending('createdAt');

    //varible to hold the current list of tasks
    var tasks = [];

    //reference to our error message alert
    var errorMessage = $('#error-message');

    //reference to the tasks list element
    var tasksList = $('#tasks-list');

    function displayError(err) {
        errorMessage.text(err.message);
>>>>>>> 0e1f3c03a332ce37c172bdee43ad742a11ba4994
        errorMessage.fadeIn();
    }

    function clearError() {
        errorMessage.hide();
    }

<<<<<<< HEAD
    function showSpinnner() {
=======
    function showSpinner() {
>>>>>>> 0e1f3c03a332ce37c172bdee43ad742a11ba4994
        $('.fa-spin').show();
    }

    function hideSpinner() {
        $('.fa-spin').hide();
    }

<<<<<<< HEAD
    function fetchTasks() {
        showSpinnner();
        tasksQuery.find().then(onData, displayError)
            .always(hideSpinner); //param1: function to call, param2: function to call on ajax error
    }

=======
>>>>>>> 0e1f3c03a332ce37c172bdee43ad742a11ba4994
    function onData(results) {
        tasks = results;
        renderTasks();
    }

    function renderTasks() {
        tasksList.empty();
        tasks.forEach(function(task) {
<<<<<<< HEAD
            var li = $(document.createElement('li'))
                .text(task.get('title') + ': ' + task.get('rating'))
                .addClass(task.get('done') ? 'completed-task' : '')
                .appendTo(tasksList)
                .click(function() {
                   task.set('done', !task.get('done'));task.save().then(renderTasks, displayError);
                });
            $(document.createElement('span'))
                .raty({readOnly: true,
                    score: (task.get('rating') || 0),
                    hints: ['crap', 'awful', 'ok', 'nice', 'legendary']}).appendTo(li);
        });
    }

    $('#new-task-form').submit(function(evt) {
        evt.preventDefault();

        var titleInput = $(this).find('[name="title"]');
        var title = titleInput.val();
        var task = new Task();
        task.set('title', title);
        task.set('rating', ratingElem.raty('score'));
        task.save().then(fetchTasks, displayError).then(function() {
            titleInput.val(''); // clears the title input
            ratingElem.raty('set', {});
        });

        return false;
    });

    // go and fetch tasks from Parse
    fetchTasks();

    //enable the rating user interface element
    ratingElem.raty();


    window.setInterval(fetchTasks, 3000); //repeatedly call function every 3 seconds
});
=======
            $(document.createElement('li'))
                .text(task.get('title'))
                .appendTo(tasksList);
        });
    }

    function fetchTasks() {
        showSpinner();
        tasksQuery.find()
            .then(onData, displayError)
            .always(hideSpinner);
    }

    $('#new-task-form').submit(function(evt) {
        //tell the browser not to do its default behavior
        evt.preventDefault();

        //find the input element in this form 
        //with a name attribute set to "title"
        var titleInput = $(this).find('[name="title"]');
        
        //get the current value
        var title = titleInput.val();

        //create a new Task and set the title
        var task = new Task();
        task.set('title', title);

        //save the new task to your Parse database
        //if save is successful, fetch the tasks again
        //otherwise display the error
        //regardless, clear the title input
        //so the user can enter the next new task
        task.save()
            .then(fetchTasks, displayError)
            .then(function() {
                titleInput.val('');
            });

        //some browsers also require that we return false to
        //prevent the default behavior
        return false;
    }); //on new task form submit

    //fetch the tasks to kick everything off...
    fetchTasks();

    //refetch the tasks every so often
    //to get new tasks created by others
    window.setInterval(fetchTasks, 10000);
}); //on doc ready
>>>>>>> 0e1f3c03a332ce37c172bdee43ad742a11ba4994
