/**
 *
 * Holds the collection of todo's and gives the functionality to get and edit todo's
 *
 * @class Todos
 */
define(['models/todo'], function (Todo) {
    "use strict";
    function Todos() {
    }

    var todos = [],
        stat = {};


    Todos.prototype = {

        /**
         * Returns the count of todo items
         *
         * @return {Number}
         */
        getCount: function () {
            return todos.length
        },

        /**
         * Returns count of completed todo's
         *
         * @return {number}
         */
        getCompletedCount: function () {
            var count = 0, i, l;

            for (i = 0, l = todos.length; i < l; i++) {
                if (todos[ i ].completed) {
                    count++;
                }
            }
            return count;
        },

        /**
         * Gets a todo based on it's index
         *
         * @param {number} index
         * @return {Todo}
         */
        getTodo: function (index) {
            return todos[index];
        },

        /**
         * Save all todo's to the local storage
         */
        saveTodos: function () {
            localStorage.setItem('todos-vanillajs', JSON.stringify(todos));
        },

        /**
         * Load all todo's from local storage
         */
        loadTodos: function () {
            if (!localStorage.getItem('todos-vanillajs')) {
                localStorage.setItem('todos-vanillajs', JSON.stringify([]));
            }

            todos = JSON.parse(localStorage.getItem('todos-vanillajs'));
        },

        /**
         * Will add an todo to the list
         *
         * @param text
         * @return {boolean} if adding was succesfull
         */
        addTodo: function (text) {
            var trimmedText = text.trim();

            if (trimmedText) {
                var todo = new Todo(trimmedText, false);
                todos.push(todo);
                return true;
            }
            return false;
        },

        /**
         * Changes the text of an todo base on it's id
         * @param {number} todoId
         * @param {string} text
         */
        editTodo: function (todoId, text) {
            var i, l;

            for (i = 0, l = todos.length; i < l; i++) {
                if (todos[ i ].id === todoId) {
                    todos[ i ].title = text;
                }
            }

            refreshData();
        },

        /**
         * Remove an id by it's id
         * @param {number   } id
         */
        removeTodoById: function (id) {
            var i = todos.length;

            while (i--) {
                if (todos[ i ].id === id) {
                    todos.splice(i, 1);
                }
            }
        },

        /**
         * removes all Todo's that have the state completed
         */
        removeTodosCompleted: function () {
            var i = todos.length;

            while (i--) {
                if (todos[ i ].completed) {
                    todos.splice(i, 1);
                }
            }
        },


        /**
         * removes all Todo's
         */
        removeAllTodos: function () {
            var i = todos.length;

            while (i--) {
                todos.splice(i, 1);
            }
        },

        /**
         * Gets todo by it's id
         *
         * @param id
         * @return {Todo}
         */
        getTodoById: function (id) {
            var i, l;

            for (i = 0, l = todos.length; i < l; i++) {
                if (todos[ i ].id === id) {
                    return todos[ i ];
                }
            }
        }
    }
    return Todos;
});