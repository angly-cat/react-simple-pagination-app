import { LOCAL_STORAGE_BASE_URL_KEY } from '../constants';

const DEVELOPER_QUERY = 'developer=SergeSwan';
const BASE_URL = localStorage.getItem(LOCAL_STORAGE_BASE_URL_KEY) || 'https://uxcandy.com/~shapoval/test-task-backend';

export const getAllTasksUrl = ({ page }) => `${BASE_URL}/?page=${page}&${DEVELOPER_QUERY}`;
export const CREATE_TASK_URL = `${BASE_URL}/create?${DEVELOPER_QUERY}`;
export const getEditTaskUrlById = (taskId) => `${BASE_URL}/edit/${taskId}?${DEVELOPER_QUERY}`;
