import React, { Component } from 'react';
import TaskForm from './TaskForm';
import Task from './Task';

class AddTask extends Component {
  state = {
    task: {
      text: '',
      username: '',
      email: '',
      status: 0,
      image_path: null,
      //...originalTask
    },
    //originalTask: null,
    fileIndex: 0,
    isUpserting: false
  };

  updateTextField = ({ target }) => {
    this.setState((prevState) => {
      return {
        task: {
          ...prevState.task,
          [target.dataset.field]: target.value
        }
      };
    });
  };

  updateStatus = ({ target }) => {
    this.setState((prevState) => {
      return {
        task: {
          ...prevState.task,
          status: target.checked ? 10 : 0
        }
      };
    });
  };

  updateImage = ({ target: input }) => {
    if (input.files && input.files[0]) {
      const reader = new FileReader();

      reader.onload = ({ target }) => {
        this.setState((prevState) => {
          return {
            task: {
              ...prevState.task,
              image_path: target.result
            }
          };
        });
      };

      reader.readAsDataURL(input.files[0]);
    }
  };

  resetField = ({ target }) => {
    this.setState((prevState) => {
      return {
        task: {
          ...prevState.task,
          [target.dataset.fieldName]: prevState.originalTask[target.dataset.fieldName]
        },
        ...(target.dataset.fieldName === 'image_path' && {fileIndex: prevState.fileIndex + 1})
      };
    });
  };

  upsertTask = (e) => {
    e.preventDefault();

    this.setState({
      isUpserting: true
    });


  };

  render() {
    return (
      <div>
        <h1>Task Creation</h1>
        <div className='row'>
          <div className='col'>
            <TaskForm
              upsertTask={this.upsertTask}
              task={this.state.task}
              fileIndex={this.state.fileIndex}
              originalTask={this.state.originalTask}
              updateTextField={this.updateTextField}
              updateStatus={this.updateStatus}
              updateImage={this.updateImage}
              resetField={this.resetField}
              isBusy={this.state.isUpserting}
            />
          </div>
          <div className='col col-task-preview'>
            <label>Live Preview:</label>
            <Task task={this.state.task} />
          </div>
        </div>
      </div>
    );
  }
}

export default AddTask;
