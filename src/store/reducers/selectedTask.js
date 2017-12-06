import { SET_SELECTED_TASK } from '../actions';
import defaultState from '../defaultState';

const selectedTaskReducer = (state = defaultState.selectedTask, action) => {
  switch(action.type) {
  case SET_SELECTED_TASK:
    return action.task;
  default:
    return state;
  }
};

export default selectedTaskReducer;
