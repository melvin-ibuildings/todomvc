/**
 *
 * Single todo item
 *
 * @class Todo
 */
define([], function () {
        'use strict';

        /**
         * Generate a Uuid for a todo
         *
         * @return {string}
         */
        function getUuid() {
            var i, random,
                uuid = '';

            for (i = 0; i < 32; i++) {
                random = Math.random() * 16 | 0;
                if (i === 8 || i === 12 || i === 16 || i === 20) {
                    uuid += '-';
                }
                uuid += ( i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random) ).toString(16);
            }
            return uuid;
        }

        /**
         * Constructor for todo item
         *
         * @param {string} title
         * @param {boolean} completed
         * @constructor constructor
         */
        function Todo(title, completed) {
            this.id = getUuid();
            this.title = title;
            this.completed = completed;
        }
        return Todo;
    }
);