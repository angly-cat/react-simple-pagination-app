import { combineReducers } from 'redux';

import userReducer from './user';
import selectedTaskReducer from './selectedTask';

const rootReducer = combineReducers({
  user: userReducer,
  selectedTask: selectedTaskReducer
});

export default rootReducer;
