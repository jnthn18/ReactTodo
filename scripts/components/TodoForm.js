require('./../../stylesheets/todoform.sass');

'use strict'

var React = require('react');

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

module.exports = TodoForm;