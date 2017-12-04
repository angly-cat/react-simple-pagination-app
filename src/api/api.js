import { getAllTasksUrl, CREATE_TASK_URL, getEditTaskUrlById } from './constants';

export function createTask({ username, email, text }, imageBlob, imageName) {
  const form = new FormData();
  form.append('username', username);
  form.append('email', email);
  form.append('text', text);
  if (imageBlob) {
    form.append('image', imageBlob, imageName);
  }

  return fetch(CREATE_TASK_URL, {
    method: 'POST',
    body: form
  })
    .then((res) => res.json())
    .then((responseJSON) => {
      if (responseJSON.status === 'error') {
        throw responseJSON;
      } else {
        return responseJSON;
      }
    });
}

export function getTasks({ page } = { page: 1 }) {
  return fetch(getAllTasksUrl({ page }))
  .then((res) => res.json())
  .then((responseJSON) => {
    if (responseJSON.status === 'error') {
      throw responseJSON;
    } else {
      return responseJSON;
    }
  });
}
