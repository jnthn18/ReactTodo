var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
// require('velocity-animate');
// require('velocity-animate/velocity.ui');

var VelocityComponent = require('../velocity-component');
var VelocityTransitionGroup = require('../velocity-transition-group');

var Todo = React.createClass({
  render: function() {
    return ( <li><button onClick={this.props.onClick} value={this.props.index}></button><span className="listText">{this.props.text}</span></li> );
  }
});

var TodoList = React.createClass({
  render: function(){
    var category = this.props.category;
    return (
      <ul>
        {this.props.data.map(function(todo, todoIndex) {
            if (category == todo.category) {
              return ( <Todo onClick={this.props.completeTask} key={todoIndex} index={todoIndex} text={todo.text} />) ;
            }
            //Map accepts 'this' as a context parameter 
          }, this)
        }
      </ul>
    )
  }
});

var TodoForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var category = this.refs.category.value;
    var text = this.refs.text.value.trim();
    if (!text) {
      return;
    }
    this.props.onTodoSubmit({category: category, text: text});
    //Send data to server (I think local storage would be the same)
    this.refs.category.value = 'Today';
    this.refs.text.value = '';
    return;
  },
  render: function() {
    return (
      <form className="todoForm" onSubmit={this.handleSubmit}>
        <select ref="category">
          <option value="Today">Today</option>
          <option value="Tomorrow">Tomorrow</option>
          <option value="Someday">Someday</option>
        </select>
        <input type="text" placeholder="Do what?" ref="text" />
        <input type="submit" value="Create" />
      </form>
    );
  }
});

var TodoHeader = React.createClass({
  render: function() {
    return (
      <div className="navbar" >
        <div className="statusbar"></div>
        <span className="nav">ToDo App</span>
        <span className="menu"><button onClick={this.props.changeScreen}>Menu</button></span>
      </div>
    )
  }
});

var TodoApp = React.createClass({
  getInitialState: function() {
    return {data: [{category: "Today", text: "a"},{category: "Tomorrow", text: "b"},{category: "Today", text: "c"}], done: []};
  },
  handleTodoSubmit: function(task) {
    var tasks = this.state.data;
    var newTasks = tasks.concat([task]);
    this.setState({data: newTasks});
  },
  deleteTask: function(task) {
    var taskIndex = parseInt(task.target.value);
    var tasks = this.state.data;
    var removedTasks = tasks.splice(taskIndex, 1);
    this.setState({data: tasks});
  },
  completeTask: function(task) {
    var taskIndex = parseInt(task.target.value);
    this.state.data[taskIndex].category = "Completed";
    var completedTasks = this.state.done;
    var tasks = this.state.data;
    var completedTask = tasks.splice(taskIndex, 1);
    var newDone = completedTasks.concat([completedTask[0]]);
    this.setState({done: newDone});
  },
  changeScreen: function(){
    if($(".doneContainer").css("opacity") == 0){
      $(".listContainer").css("opacity", "0");
      $(".doneContainer").css("opacity", "1");
    } else {
      $(".doneContainer").css("opacity", "0");
      $(".listContainer").css("opacity", "1");
    }
  },
  render: function(){
    return (
      <div>
        <TodoHeader changeScreen={this.changeScreen} />
        <div className="app">
          <div className="listContainer">
            <TodoForm onTodoSubmit={this.handleTodoSubmit} />
            <h2>Today</h2>
            <TodoList category="Today" data={this.state.data} completeTask={this.completeTask} />
            <h2>Tomorrow</h2>
            <TodoList category="Tomorrow" data={this.state.data} completeTask={this.completeTask} />
            <h2>Someday</h2>
            <TodoList category="Someday" data={this.state.data} completeTask={this.completeTask} />
          </div>
          <div className="doneContainer">
            <h2>Completed</h2>
            <TodoList category="Completed" data={this.state.done.reverse()} completeTask={this.completeTask} />
          </div>
        </div>
      </div>
    );
  }
});

ReactDOM.render(
  //The local storage will eventually go in TodoApp 
  <TodoApp />,
  document.getElementById("container")
);