import { SIGN_IN_USER, SIGN_OUT_USER } from '../actions';
import { LOCAL_STORAGE_USER_KEY } from '../../constants';

const storeUserInfo = store => next => action => {
  if (action.type === SIGN_IN_USER) {
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(action.user));
  } else if (action.type === SIGN_OUT_USER) {
    localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
  }

  next(action);
};

export default storeUserInfo;
