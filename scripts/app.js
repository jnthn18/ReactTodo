require('./../stylesheets/global.sass');
require('./../stylesheets/completed.sass');
require('./../stylesheets/todolist.sass');
require('./../stylesheets/todoform.sass');

'use strict'

var React = require('react');
var ReactDOM = require('react-dom');

var TodoList = React.createClass({
  handleComplete: function(e){
    var taskIndex = parseInt(e.target.value, 10);
    this.props.onCompleteTask(taskIndex);
  },
  render: function() {
    return (
      <ul>
        {this.props.data.map((task, taskIndex) =>
          <li key={taskIndex}><span><button className="fa fa-check" onClick={this.handleComplete} value={taskIndex}></button></span>{task}</li>
        )}
      </ul>
    );
  }
});

var CompletedList = React.createClass({
  handleDelete: function(e){
    var taskIndex = parseInt(e.target.value, 10);
    this.props.onDeleteTask(taskIndex);
  },
  render: function() {
    return (
        <ul className="completed">
        {this.props.completed.reverse().map((task, taskIndex) =>
          <li key={taskIndex}><span><button className="fa fa-times" onClick={this.handleDelete} value={taskIndex}></button></span>{task}</li>
        )}
      </ul>
    );
  }
});

var TodoForm = React.createClass({
  getInitialState: function() {
    return {text: ''};
  },
  onChange: function(e){
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var text = this.state.text.trim();
    if (!text){
      console.log("please enter a task");
      return;
    }
    this.props.onTaskSubmit(text);
    this.setState({text: ''});
  },
  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input onChange={this.onChange} value={this.state.text} placeholder="What do you want to do?" />
      </form>
    );
  }
});

var App = React.createClass({
  getInitialState: function() {
    return {data: [], completed: []};
  },
  componentDidMount: function(){
    var storedData = [];
    var storedCompleted = [];
    if(localStorage.getItem('data') !== null) {
      var storedData = JSON.parse(localStorage.getItem('data'));
    }
    if(localStorage.getItem('completed') !== null) {
      var storedCompleted = JSON.parse(localStorage.getItem('completed'));
    }
    this.setState({data: storedData, completed: storedCompleted});
  },
  handleTaskSubmit: function(task) {
    var nextTask = this.state.data.concat([task]);
    console.log('Added Task: '+task);
    this.setState({data: nextTask});
    localStorage.setItem('data', JSON.stringify(nextTask));
  },
  deleteTask: function(task) {
    var tasks = this.state.completed;
    var removedTasks = tasks.splice(task, 1);
    console.log('Removed Task: '+removedTasks);
    this.setState({completed: tasks});
    localStorage.setItem('completed', JSON.stringify(tasks));
  },
  completeTask: function(task) {
    var tasks = this.state.data;
    var completedTask = tasks.splice(task, 1);
    console.log('Finished Task: '+completedTask);
    var newCompleted = this.state.completed.concat([completedTask]);
    this.setState({data: tasks, completed: newCompleted });
    localStorage.setItem('data', JSON.stringify(tasks));
    localStorage.setItem('completed', JSON.stringify(newCompleted));
  },
  render: function() {
    return (
      <div>
        <h1>TODO LIST</h1>
        <TodoForm  onTaskSubmit={this.handleTaskSubmit} />
        <TodoList data={this.state.data} onCompleteTask={this.completeTask} />
        <h2>{this.state.completed.length} COMPLETED TASKS</h2>
        <CompletedList completed={this.state.completed} onDeleteTask={this.deleteTask} />
      </div>
    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('container')
);