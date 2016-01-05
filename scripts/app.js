require('./../stylesheets/global.sass');

'use strict'

var React = require('react');
var ReactDOM = require('react-dom');

var TodoList = React.createClass({
  handleDelete: function(e){
    var taskIndex = parseInt(e.target.value, 10);
    this.props.onDeleteTask(taskIndex);
  },
  render: function() {
    var createTask = function(task, taskIndex) {
      return <li>{task} <button onClick={this.Delete} value={taskIndex}>Delete</button></li>;
    };
    return (
      <ul>
        {this.props.data.map((task, taskIndex) =>
          <li key={taskIndex}>{task} <button onClick={this.handleDelete} value={taskIndex}>Delete</button></li>
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
    return {data: []};
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
  render: function() {
    return (
      <div>
        <h1>TODO LIST</h1>
        <TodoList data={this.state.data} onDeleteTask={this.deleteTask} />
        <TodoForm  onTaskSubmit={this.handleTaskSubmit} />
      </div>
    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('container')
);