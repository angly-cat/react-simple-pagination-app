import { SIGN_IN_USER, SIGN_OUT_USER } from '../actions';
import defaultState from '../defaultState';

const userReducer = (state = defaultState.user, action) => {
  switch(action.type) {
    case SIGN_IN_USER:
      return action.user;
    case SIGN_OUT_USER:
      return null;
    default:
      return state;
  }
};

export default userReducer;
