import React, { Component } from 'react';
import Task from './Task';
import tasks from '../data/tasks';

class TaskList extends Component {
  state = {
    tasks
  };

  render() {
    return (
      <div>
        <h1>TaskList</h1>
        <div>
          {tasks.map((task) => <Task key={task.id} task={task}/>)}
        </div>
      </div>
    );
  }
}

export default TaskList;
