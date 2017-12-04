import React, { Component } from 'react';
import TaskForm from './TaskForm';
import Task from './Task';
import { createTask } from '../api/api';

const MAX_IMAGE_WIDTH = 320;
const MAX_IMAGE_HEIGHT = 240;

const emptyTask = {
  text: '',
  username: '',
  email: '',
  status: 0,
  image_path: null
};

class AddTask extends Component {
  state = {
    task: {
      ...emptyTask,
      //...originalTask
    },
    //originalTask: null,
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

    createTask(this.state.task, this.state.imageBlob, this.state.imageName)
      .then((json) => console.log(json))
      .then(() => {
        this.setState((prevState) => {
          window.URL.revokeObjectURL(prevState.task.image_path);
          return {
            isUpserting: false,
            task: {
              ...emptyTask
            },
            fileIndex: prevState.fileIndex + 1,
            imageBlob: null,
            imageName: null
          };
        });
      })
      .catch((error) => console.error(error))
      .then(() => {
        this.setState({
          isUpserting: false
        });
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
