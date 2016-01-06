require('./../stylesheets/global.sass');
require('./../stylesheets/fa.sass');

'use strict'

var React = require('react');
var ReactDOM = require('react-dom');

var TodoList = React.createClass({
  handleDelete: function(e){
    var taskIndex = parseInt(e.target.value, 10);
    this.props.onDeleteTask(taskIndex);
  },
  handleComplete: function(e){
    var taskIndex = parseInt(e.target.value, 10);
    this.props.onCompleteTask(taskIndex);
  },
  render: function() {
    var createTask = function(task, taskIndex) {
      return <li><i className="fa fa-check" onClick={this.handleComplete} value={taskIndex}></i>{task}<i className="fa fa-times" onClick={this.handleDelete} value={taskIndex}></i></li>;
    };
    return (
      <ul>
        {this.props.data.map((task, taskIndex) =>
          <li key={taskIndex}><i className="fa fa-check" onClick={this.handleComplete}value={taskIndex}></i>{task} <i className="fa fa-times" onClick={this.handleDelete} value={taskIndex}></i></li>
        )}
      </ul>
    );
  }
});

var CompletedList = React.createClass({
  render: function() {
    return (
        <ul className="completed">
        {this.props.completed.reverse().map((task, taskIndex) =>
          <li key={taskIndex}>{task}</li>
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
        <input onChange={this.onChange} value={this.state.text} />
        <button>'Add Task'</button>
      </form>
    );
  }
});

var App = React.createClass({
  getInitialState: function() {
    return {data: [], completed: []};
  },
  handleTaskSubmit: function(task) {
    var nextTask = this.state.data.concat([task]);
    console.log('Added Task: '+task);
    this.setState({data: nextTask});
  },
  deleteTask: function(task) {
    var tasks = this.state.data;
    var removedTasks = tasks.splice(task, 1);
    console.log('Removed Task: '+removedTasks);
    this.setState({data: tasks});
  },
  completeTask: function(task) {
    var tasks = this.state.data;
    var completedTask = tasks.splice(task, 1);
    console.log('Finished Task: '+completedTask);
    this.setState({data: tasks, completed: this.state.completed.concat([completedTask]) });
  },
  render: function() {
    return (
      <div>
        <h1>TODO LIST</h1>
        <TodoList data={this.state.data} onCompleteTask={this.completeTask} onDeleteTask={this.deleteTask} />
        <TodoForm  onTaskSubmit={this.handleTaskSubmit} />
        <h2>Completed Tasks</h2>
        <CompletedList completed={this.state.completed} />
      </div>
    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('container')
);