import { getAllTasksUrl, CREATE_TASK_URL, getEditTaskUrlById } from './urls';
import { EDIT_TOKEN } from '../constants';
const md5 = require('../md5');

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

export function updateTask({ text, status, id }) {
  // Hack for allowing at least whitespaces
  text = text.replace(/ /g, '\t');

  let params = [];
  params.push(`text=${encodeURIComponent(text)}`);
  params.push(`status=${status}`);
  params = params.sort();
  params.push(`token=${EDIT_TOKEN}`);
  const params_string = params.join('&');
  const signature = md5(params_string);

  const form = new FormData();
  form.append('text', text);
  form.append('status', status);
  form.append('token', EDIT_TOKEN);
  form.append('signature', signature);

  return fetch(getEditTaskUrlById(id), {
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

export function getTasks({ page = 1, sort_field, sort_direction }) {
  return fetch(getAllTasksUrl({ page, sort_field, sort_direction }))
  .then((res) => res.json())
  .then((responseJSON) => {
    if (responseJSON.status === 'error') {
      throw responseJSON;
    } else {
      return responseJSON;
    }
  });
}

export function login({ username, password }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === 'Admin' && password === '123') {
        resolve({ username: 'Admin' });
      } else {
        reject('Invalid credentials!');
      }
    }, 500 + 1500*Math.random());
  });
}
