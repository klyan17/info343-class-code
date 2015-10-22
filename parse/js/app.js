/*
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
        errorMessage.fadeIn();
    }

    function clearError() {
        errorMessage.hide();
    }

    function showSpinnner() {
        $('.fa-spin').show();
    }

    function hideSpinner() {
        $('.fa-spin').hide();
    }

    function fetchTasks() {
        showSpinnner();
        tasksQuery.find().then(onData, displayError)
            .always(hideSpinner); //param1: function to call, param2: function to call on ajax error
    }

    function onData(results) {
        tasks = results;
        renderTasks();
    }

    function renderTasks() {
        tasksList.empty();
        tasks.forEach(function(task) {
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