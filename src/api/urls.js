import { LOCAL_STORAGE_BASE_URL_KEY } from '../constants';

const DEVELOPER_QUERY = 'developer=SergeSwan';
const BASE_URL = localStorage.getItem(LOCAL_STORAGE_BASE_URL_KEY) || 'https://uxcandy.com/~shapoval/test-task-backend';

export const getAllTasksUrl = ({ page, sort_field, sort_direction }) => {
  const sorting = sort_field && sort_direction ? `&sort_field=${sort_field}&sort_direction=${sort_direction}` : '';
  return `${BASE_URL}/?page=${page}${sorting}&${DEVELOPER_QUERY}`;
};
export const CREATE_TASK_URL = `${BASE_URL}/create?${DEVELOPER_QUERY}`;
export const getEditTaskUrlById = (taskId) => `${BASE_URL}/edit/${taskId}?${DEVELOPER_QUERY}`;
