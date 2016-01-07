require('./../stylesheets/global.sass');
require('./../stylesheets/fa.sass');

'use strict'

var React = require('react');
var ReactDOM = require('react-dom');

var TodoList = React.createClass({
  handleComplete: function(e){
    var taskIndex = parseInt(e.target.value, 10);
    this.props.onCompleteTask(taskIndex);
  },
  render: function() {
    var createTask = function(task, taskIndex) {
      return <li><button className="fa fa-check" onClick={this.Complete}></button>{task}</li>;
    };
    return (
      <ul>
        {this.props.data.map((task, taskIndex) =>
          <li key={taskIndex}><button className="fa fa-check" onClick={this.handleComplete} value={taskIndex}></button>{task}</li>
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
          <li key={taskIndex}><button className="fa fa-times" onClick={this.handleDelete} value={taskIndex}></button>{task}</li>
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
  handleTaskSubmit: function(task) {
    var nextTask = this.state.data.concat([task]);
    console.log('Added Task: '+task);
    this.setState({data: nextTask});
  },
  deleteTask: function(task) {
    var tasks = this.state.completed;
    var removedTasks = tasks.splice(task, 1);
    console.log('Removed Task: '+removedTasks);
    this.setState({completed: tasks});
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
        <TodoForm  onTaskSubmit={this.handleTaskSubmit} />
        <TodoList data={this.state.data} onCompleteTask={this.completeTask} />
        <h2>COMPLETED TASKS</h2>
        <CompletedList completed={this.state.completed} onDeleteTask={this.deleteTask} />
      </div>
    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('container')
);