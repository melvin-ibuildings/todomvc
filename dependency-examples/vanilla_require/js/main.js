/**
 *
 * Main class
 *
 * @class Main
 */
require(
    [
        'models/todo',
        'models/stat',
        'collection/todos'
    ],
    function (Todo, Stat, Todos) {
        'use strict';

        var todoCollection = new Todos(),
            stat = new Stat(),
            ENTER_KEY = 13;

        window.addEventListener('load', windowLoadHandler, false);

        /**
         * Handles the window load and will refresh data and add event listeners
         */
        function windowLoadHandler() {
            todoCollection.loadTodos();
            refreshData();
            addEventListeners();
        }

        /**
         * add event listeners to toggel and new todo
         */
        function addEventListeners() {
            document.getElementById('new-todo').addEventListener('keypress', newTodoKeyPressHandler, false);
            document.getElementById('toggle-all').addEventListener('change', toggleAllChangeHandler, false);
        }

        /**
         * Adds a todo when enter key was pressed in the input box
         *
         * @param event
         */
        function inputEditTodoKeyPressHandler(event) {
            var inputEditTodo = event.target,
                trimmedText = inputEditTodo.value.trim(),
                todoId = event.target.id.slice(6);

            if (trimmedText) {
                if (event.keyCode === ENTER_KEY) {
                    todoCollection.editTodo(todoId, trimmedText);
                }
            } else {
                removeTodoById(todoId);
                refreshData();
            }
        }

        /**
         *
         * @param event
         */
        function inputEditTodoBlurHandler(event) {
            var inputEditTodo = event.target,
                todoId = event.target.id.slice(6);

            this.todos.editTodo(todoId, inputEditTodo.value);
        }

        /**
         * Adds new todo
         *
         * @param event
         */
        function newTodoKeyPressHandler(event) {
            if (event.keyCode === ENTER_KEY) {
                var success = todoCollection.addTodo(document.getElementById('new-todo').value);
                if (success === true) {
                    refreshData();
                }
            }
        }

        /**
         *
         * @param event
         */
        function toggleAllChangeHandler(event) {
            for (var i in todos) {
                todos[ i ].completed = event.target.checked;
            }

            refreshData();
        }

        /**
         *
         * @param event
         */
        function spanDeleteClickHandler(event) {
            todoCollection.removeTodoById(event.target.getAttribute('data-todo-id'));
            refreshData();
        }

        /**
         * Handles when a clear completed todos link is clicked
         */
        function hrefClearClickHandler() {
            todoCollection.removeTodosCompleted();
            refreshData();
        }

        /**
         *
         * @param event
         */
        function todoContentHandler(event) {
            var todoId = event.target.getAttribute('data-todo-id'),
                div = document.getElementById('li_' + todoId),
                inputEditTodo = document.getElementById('input_' + todoId);

            div.className = 'editing';
            inputEditTodo.focus();
        }

        /**
         *
         * @param event
         */
        function checkboxChangeHandler(event) {
            var checkbox = event.target,
                todo = todoCollection.getTodoById(checkbox.getAttribute('data-todo-id'));

            todo.completed = checkbox.checked;
            refreshData();
        }

        /**
         *
         */
        function refreshData() {
            todoCollection.saveTodos();
            computeStats();
            redrawTodosUI();
            redrawStatsUI();
            changeToggleAllCheckboxState();
        }

        /**
         *
         */
        function computeStats() {
            stat.totalTodo = todoCollection.getCount();
            stat.todoCompleted = todoCollection.getCompletedCount();

            stat.todoLeft = stat.totalTodo - stat.todoCompleted;
        }

        /**
         *
         */
        function redrawTodosUI() {

            var todo, checkbox, label, deleteLink, divDisplay, inputEditTodo, li, i, l,
                ul = document.getElementById('todo-list'), todosCount = todoCollection.getCount();

            document.getElementById('main').style.display = todosCount ? 'block' : 'none';

            ul.innerHTML = '';
            document.getElementById('new-todo').value = '';

            for (i = 0, l = todosCount; i < l; i++) {
                todo = todoCollection.getTodo(i);

                // create checkbox
                checkbox = document.createElement('input');
                checkbox.className = 'toggle';
                checkbox.setAttribute('data-todo-id', todo.id);
                checkbox.type = 'checkbox';
                checkbox.addEventListener('change', checkboxChangeHandler);

                // create div text
                label = document.createElement('label');
                label.setAttribute('data-todo-id', todo.id);
                label.appendChild(document.createTextNode(todo.title));
                label.addEventListener('dblclick', todoContentHandler);


                // create delete button
                deleteLink = document.createElement('button');
                deleteLink.className = 'destroy';
                deleteLink.setAttribute('data-todo-id', todo.id);
                deleteLink.addEventListener('click', spanDeleteClickHandler);

                // create divDisplay
                divDisplay = document.createElement('div');
                divDisplay.className = 'view';
                divDisplay.setAttribute('data-todo-id', todo.id);
                divDisplay.appendChild(checkbox);
                divDisplay.appendChild(label);
                divDisplay.appendChild(deleteLink);

                // create todo input
                inputEditTodo = document.createElement('input');
                inputEditTodo.id = 'input_' + todo.id;
                inputEditTodo.className = 'edit';
                inputEditTodo.value = todo.title;
                inputEditTodo.addEventListener('keypress', inputEditTodoKeyPressHandler);
                inputEditTodo.addEventListener('blur', inputEditTodoBlurHandler);


                // create li
                li = document.createElement('li');
                li.id = 'li_' + todo.id;
                li.appendChild(divDisplay);
                li.appendChild(inputEditTodo);


                if (todo.completed) {
                    li.className += 'complete';
                    checkbox.checked = true;
                }

                ul.appendChild(li);
            }
        }

        /**
         *
         */
        function changeToggleAllCheckboxState() {
            var toggleAll = document.getElementById('toggle-all');

            toggleAll.checked = stat.todoCompleted === todoCollection.getCount();
        }

        /**
         *
         */
        function redrawStatsUI() {
            removeChildren(document.getElementsByTagName('footer')[0]);
            document.getElementById('footer').style.display = todoCollection.getCount() ? 'block' : 'none';

            if (stat.todoCompleted) {
                drawTodoClear();
            }

            if (stat.totalTodo) {
                drawTodoCount();
            }
        }

        /**
         *
         */
        function drawTodoCount() {
            var number = document.createElement('strong'),
                remaining = document.createElement('span'),
                text = ' ' + ( stat.todoLeft === 1 ? 'item' : 'items' ) + ' left';

            // create remaining count
            number.innerHTML = stat.todoLeft;

            remaining.id = 'todo-count';
            remaining.appendChild(number);
            remaining.appendChild(document.createTextNode(text));

            document.getElementsByTagName('footer')[0].appendChild(remaining);
        }

        /**
         *
         */
        function drawTodoClear() {
            var buttonClear = document.createElement('button');

            buttonClear.id = 'clear-completed';
            buttonClear.addEventListener('click', hrefClearClickHandler);
            buttonClear.innerHTML = 'Clear completed (' + stat.todoCompleted + ')';

            document.getElementsByTagName('footer')[0].appendChild(buttonClear);
        }

        /**
         *
         * @param node
         */
        function removeChildren(node) {
            node.innerHTML = '';
        }
    });
