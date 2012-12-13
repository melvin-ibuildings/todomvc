/**
 *
 * Stats model
 *
 * @class Stat
 */
define([], function () {
    'use strict';
    /**
     * Constructor for stat
     *
     * @constructor  constructor
     */
    function Stat() {
        this.todoLeft = 0;
        this.todoCompleted = 0;
        this.totalTodo = 0;
    }
    return Stat;
});