import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TaskForm from './TaskForm';
import Task from './Task';
import { createTask, updateTask } from '../api';
import { addFlashMessage } from '../store/actions/creators';

const MAX_IMAGE_WIDTH = 320;
const MAX_IMAGE_HEIGHT = 240;

const emptyTask = {
  text: '',
  username: '',
  email: '',
  status: 0,
  image_path: null
};

class UpsertTask extends Component {
  state = {
    task: {
      ...emptyTask,
      ...this.props.isEditing && this.props.selectedTask
    },
    imageName: null,
    imageBlob: null,
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
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const image  = new Image();
        image.onload = () => {
          const scaledImageHeight = image.height/image.width*MAX_IMAGE_WIDTH;

          const canvas = document.createElement('canvas');
          canvas.width = MAX_IMAGE_WIDTH;
          canvas.height = Math.min(MAX_IMAGE_HEIGHT, scaledImageHeight);

          const ctx = canvas.getContext('2d');
          ctx.drawImage(image, 0, Math.min(0, (MAX_IMAGE_HEIGHT - scaledImageHeight)/2), MAX_IMAGE_WIDTH, scaledImageHeight);

          canvas.toBlob((blobOfScaledImage) => {
            this.setState((prevState) => {
              if (prevState.imageBlob) {
                window.URL.revokeObjectURL(prevState.task.image_path);
              }

              return {
                task: {
                  ...prevState.task,
                  image_path: window.URL.createObjectURL(blobOfScaledImage)
                },
                imageName: file.name,
                imageBlob: blobOfScaledImage
              };
            });
          });

          window.URL.revokeObjectURL(image.src);
        };

        image.src = window.URL.createObjectURL(file);
      };

      reader.readAsDataURL(file);
    }
  };

  resetField = ({ target }) => {
    this.setState((prevState) => {
      return {
        task: {
          ...prevState.task,
          [target.dataset.fieldName]: this.props.selectedTask[target.dataset.fieldName]
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

    (this.props.isEditing
      ? updateTask(this.state.task)
      : createTask(this.state.task, this.state.imageBlob, this.state.imageName))
      .then(() => {
        window.URL.revokeObjectURL(this.state.task.image_path);

        this.props.addFlashMessage({
          text: `Task ${this.props.isEditing ? 'updated' : 'created'} successfully!`,
          type: 'success'
        });

        this.props.history.push('/');
      })
      .catch((error) => {
        this.props.addFlashMessage({
          text: JSON.stringify(error.message || error),
          type: 'danger',
          topic: this.props.isEditing ? 'errorOnEditing' : 'errorOnCreation'
        });

        this.setState({
          isUpserting: false
        });
      });
  };

  componentWillMount() {
    if (
      this.props.isEditing && (
        !this.props.selectedTask || this.props.selectedTask.id !== +this.props.match.params.taskId
      )
    ) {
      this.props.addFlashMessage({
        text: `Can't find task with id=${this.props.match.params.taskId} in cache.`,
        type: 'warning'
      });

      this.props.history.push('/');
    }
  }

  render() {
    return (
      <div>
        <h1 className='text-center'>{this.props.isEditing ? 'Task Editing' : 'Task Creation'}</h1>
        <div className='row'>
          <div className='col'>
            <TaskForm
              upsertTask={this.upsertTask}
              task={this.state.task}
              fileIndex={this.state.fileIndex}
              originalTask={this.props.isEditing && this.props.selectedTask}
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

const mapDispatchToProps = (dispatch) => {
  return {
    addFlashMessage: (id) => dispatch(addFlashMessage(id))
  };
};

export default withRouter(connect(null, mapDispatchToProps)(UpsertTask));
