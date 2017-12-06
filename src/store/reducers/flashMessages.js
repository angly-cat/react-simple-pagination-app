import { ADD_FLASH_MESSAGE, REMOVE_FLASH_MESSAGE } from '../actions';
import defaultState from '../defaultState';

const selectedTaskReducer = (state = defaultState.flashMessages, action) => {
  switch(action.type) {
  case ADD_FLASH_MESSAGE:
    return [
      ...state,
      {
        ...action.message,
        id: Math.max(...state.map((message) => message.id), -1) + 1
      }
    ];
  case REMOVE_FLASH_MESSAGE:
    return state.filter((message) => message.id !== action.id);
  default:
    return state;
  }
};

export default selectedTaskReducer;
