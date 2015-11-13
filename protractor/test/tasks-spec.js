/* Test script for the Tasks List app */
describe('the tasks app', function() {
    var taskTitleInp = element(by.model('newTask.title'));
    var addTaskBtn = element(by.buttonText('Add Task'));
    var tasksList = element.all(by.repeater('task in tasks'));

    function addTask(title) {
        taskTitleInp.sendKeys(title);
        addTaskBtn.click();
    }

    function addMultipleTasks(num) {
        var idx;
        for(idx = 0; idx < num; idx++) {
            addTask('Task' + idx);
        }
    }

    function requiredMsg() {

    }

    beforeEach(function() {
       browser.get('http://localhost:8000');
    });

    it('must have the proper page title', function() {
        expect(browser.getTitle()).toEqual('My Tasks');
    });

    it('must add a task', function() {
        addTask('Learn Protractor');
        expect(tasksList.count()).toEqual(1);
        expect(tasksList.get(0).getText()).toEqual('Learn Protractor');
    });

    it('must add a task hitting enter', function() {
        var title = 'Learn Protractor';
        taskTitleInp.sendKeys(title);
        taskTitleInp.sendKeys(protractor.Key.ENTER);
        expect(tasksList.count()).toEqual(1);
        expect(tasksList.get(0).getText()).toEqual(title);
    });

    it('must clear the title after adding', function() {
        addTask('box should get cleared');
        expect(taskTitleInp.getAttribute('value')).toEqual('');
    });

    it('must add multiple tasks', function() {
        addMultipleTasks(20);
        expect(tasksList.count()).toEqual(20);
    });

    it('must show required validation error', function() {
        expect(requiredMsg.isPresent()).toEqual(false);
        taskTitleInp.sendKeys('abc');
        taskTitleInp.clear();
        expect(requiredMsg.isPresent()).toEqual(true);
        taskTitleInp.sendKeys('abc');
        expect(requiredMsg.isPresent()).toEqual(false);
    });

    it('must disable add task button with blank title', function() {
        expect(addTaskBtn.getAttribute('disabled')).toEqual('true');
        taskTitleInp.sendKeys('abc');
        expect(addTaskBtn.getAttribute('disabled')).toBe(null);
        taskTitleInp.clear();
        taskTitleInp.sendKeys('    ');
        expect(addTaskBtn.getAttribute('disabled')).toEqual('true');
    });

    it('must toggle done with click', function() {
        addTask('test style class');
        addTask('not marked as done');
        expect(tasksList.count()).toEqual(2);
        tasksList.get(0).click();
        expect(tasksList.get(0).getAttribute('class')).toContain('completed-task');

    })

    it('must purge completed tasks', function() {
        addTask('Task 1');
        addTask('Task 2');
        expect(tasksList.count()).toEqual(2);
        tasksList.get(0).click();
        element(by.buttonText('Purge Completed Tasks')).click();
        expect(tasksList.count()).toEqual(1);
        expect(tasksList.get(0).getText()).toEqual('Task 2');
    });
});