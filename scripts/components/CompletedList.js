require('./../../stylesheets/completed.sass');

'use strict'

var React = require('react');

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

module.exports = CompletedList;