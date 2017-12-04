import React, { Component } from 'react';
import Task from './Task';

class TaskList extends Component {
  state = {
    tasks: []
  };

  componentDidMount() {

  }

  render() {
    return (
      <div>
        <h1>TaskList</h1>
        <div>
          {this.state.tasks.map((task) => <Task key={task.id} task={task}/>)}
        </div>
      </div>
    );
  }
}

export default TaskList;
