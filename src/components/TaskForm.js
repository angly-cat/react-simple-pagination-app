import React, { Component } from 'react';
import ImageInput from './inputs/ImageInput';
import TextInput from './inputs/TextInput';
import StatusInput from './inputs/StatusInput';
import blueLoader from '../images/blue-loader.gif';

class TaskForm extends Component {
  renderResetButton = (fieldName, wrapperClassName) => {
    const shouldBeRendered = this.props.originalTask && this.props.originalTask[fieldName] !== this.props.task[fieldName];
    return shouldBeRendered && (
      <span key={fieldName} className={wrapperClassName}>
        <button
          className='btn btn-secondary'
          data-field-name={fieldName}
          type='button'
          onClick={this.props.resetField}
        >
          Reset
        </button>
      </span>
    );
  };

  render() {
    const { fileIndex, isBusy, originalTask, task, updateImage, updateStatus, updateTextField, upsertTask } = this.props;
    const isEditing = !!originalTask;
    return (
      <form onSubmit={upsertTask}>
        {!isEditing &&
        <ImageInput
          updateImage={updateImage}
          fileIndex={fileIndex}
          disabled={isBusy}
          required={true}
        >
          {this.renderResetButton('image_path', 'input-group-btn')}
        </ImageInput>
        }
        {['text', ...!isEditing && ['username', 'email']].map((fieldName) => (
          <TextInput
            key={fieldName}
            fieldName={fieldName}
            fieldValue={task[fieldName]}
            updateTextField={updateTextField}
            disabled={isBusy}
            required={true}
          >
            {this.renderResetButton(fieldName, 'input-group-btn')}
          </TextInput>
        ))}
        {isEditing &&
          <StatusInput
            status={task.status}
            updateStatus={updateStatus}
            disabled={isBusy}
          >
            {this.renderResetButton('status', 'col-auto')}
          </StatusInput>
        }
        <button
          type='submit'
          className={`${isBusy ? 'busy ' : ' '}submit-button btn btn-primary`}
          disabled={isBusy}
        >
          Submit
          <img src={blueLoader} alt='Loading Indicator' />
        </button>
      </form>
    );
  }
}

export default TaskForm;
