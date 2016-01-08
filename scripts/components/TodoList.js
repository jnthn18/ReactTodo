require('./../../stylesheets/todolist.sass');

'use strict'

var React = require('react');

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

module.exports = TodoList;