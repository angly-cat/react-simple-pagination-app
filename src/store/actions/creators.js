import { SIGN_IN_USER, SIGN_OUT_USER, SET_SELECTED_TASK } from '.';

export function signInUser(user) {
  return {
    type: SIGN_IN_USER,
    user
  };
}

export function signOutUser() {
  return {
    type: SIGN_OUT_USER
  };
}

export function setSelectedTask(task) {
  return {
    type: SET_SELECTED_TASK,
    task
  };
}

