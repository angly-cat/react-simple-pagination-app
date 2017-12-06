import { combineReducers } from 'redux';

import userReducer from './user';
import selectedTaskReducer from './selectedTask';
import flashMessagesReducer from './flashMessages';

const rootReducer = combineReducers({
  user: userReducer,
  selectedTask: selectedTaskReducer,
  flashMessages: flashMessagesReducer
});

export default rootReducer;
