require('./../stylesheets/global.sass');

'use strict'

var React = require('react');
var ReactDOM = require('react-dom');
var TodoForm = require('./components/TodoForm');
var CompletedList = require('./components/CompletedList');
var TodoList = require('./components/TodoList');

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