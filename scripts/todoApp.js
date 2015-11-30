var React = require('react');
var ReactDOM = require('react-dom');

require('velocity-animate');
require('velocity-animate/velocity.ui');

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
              return ( <Todo onClick={this.props.deleteTask} key={todoIndex} index={todoIndex} text={todo.text} />) ;
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
    this.refs.category.value = 'Tomorrow';
    this.refs.text.value = '';
    return;
  },
  render: function() {
    return (
      <form className="todoForm" onSubmit={this.handleSubmit}>
        <select defaultValue="Tomorrow" ref="category">
          <option value="Today">Today</option>
          <option value="Tomorrow">Tomorrow</option>
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
        <div className="nav">ToDo App</div>
      </div>
    )
  }
});

var TodoApp = React.createClass({
  getInitialState: function() {
    return {data: [{category: "Today", text: "a"},{category: "Tomorrow", text: "b"},{category: "Today", text: "c"}]};
  },
  handleTodoSubmit: function(task) {
    var tasks = this.state.data;
    var newTasks = tasks.concat([task]);
    this.setState({data: newTasks});
  },
  deleteTask: function(task) {
    var taskIndex = parseInt(task.target.value);
    console.log(taskIndex);
    var tasks = this.state.data;
    var removedTasks = tasks.splice(taskIndex, 1);
    this.setState({data: tasks});
  },
  render: function(){
    return (
      <div>
        <TodoHeader />
        <div className="app">
          <h2>Today</h2>
          <TodoList category="Today" data={this.state.data} deleteTask={this.deleteTask} />
          <h2>Tomorrow</h2>
          <TodoList category="Tomorrow" data={this.state.data} deleteTask={this.deleteTask} />
          <h2>Someday</h2>
          <TodoList category="Someday" data={this.state.data} deleteTask={this.deleteTask} />
          <TodoForm onTodoSubmit={this.handleTodoSubmit} />
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