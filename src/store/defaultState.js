import { LOCAL_STORAGE_USER_KEY } from '../constants';

let defaultState = {
  user: null,
  selectedTask: null
};

try {
  defaultState.user = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_KEY));
} catch(e) {
  localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
}

export default defaultState;
