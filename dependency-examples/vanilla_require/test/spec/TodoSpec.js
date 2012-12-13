describe("HelloWorldTest", function () {
    beforeEach(function() {
        var flag = false,
            that = this;

        require(  [
            'collection/todos'
        ], function(Todos) {
            that.todos = new Todos();

            that.todos.removeAllTodos();
        });
    });

    it("Adding an todo should result in 1 todo", function() {
        this.todos.addTodo('test');
        expect( this.todos.getCount()).toEqual(1);
    });

    it("Adding an 5 todo should result in 5 todo's", function() {
        this.todos.addTodo('test');
        this.todos.addTodo('test1');
        this.todos.addTodo('test2');
        this.todos.addTodo('test3');
        this.todos.addTodo('test4');
        expect( this.todos.getCount()).toEqual(5);
    });

    it("Setting one todo completed from 5 todos should result in count 5 and countCompleted 1", function() {
        this.todos.addTodo('test');
        this.todos.addTodo('test1');
        this.todos.addTodo('test2');
        this.todos.addTodo('test3');
        this.todos.addTodo('test4');

        var todo = this.todos.getTodo(2).completed = true;

        expect( this.todos.getCount()).toEqual(5);
        expect( this.todos.getCompletedCount()).toEqual(1);
    });

    it("With 5 todos of which 1 completed calling removeTodosCompleted will result in total count of 4", function() {
        this.todos.addTodo('test');
        this.todos.addTodo('test1');
        this.todos.addTodo('test2');
        this.todos.addTodo('test3');
        this.todos.addTodo('test4');

        var todo = this.todos.getTodo(2).completed = true;

        expect( this.todos.getCount()).toEqual(5);
        expect( this.todos.getCompletedCount()).toEqual(1);

        this.todos.removeTodosCompleted();

        expect( this.todos.getCount()).toEqual(4);
    });
});