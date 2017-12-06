import React from 'react';
import UpsertTask from './UpsertTask';
import { connect } from 'react-redux';

const EditTask = (props) => {
  return (
    <UpsertTask isEditing={true} selectedTask={props.selectedTask} />
  );
};

const mapStateToProps = ({ selectedTask }) => {
  return {
    selectedTask
  };
};

export default connect(mapStateToProps)(EditTask);
