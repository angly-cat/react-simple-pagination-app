import { SIGN_IN_USER, SIGN_OUT_USER, SET_SELECTED_TASK, ADD_FLASH_MESSAGE, REMOVE_FLASH_MESSAGE } from '.';

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

export function addFlashMessage(message) {
  return {
    type: ADD_FLASH_MESSAGE,
    message
  };
}

export function removeFlashMessage(id) {
  return {
    type: REMOVE_FLASH_MESSAGE,
    id
  };
}
