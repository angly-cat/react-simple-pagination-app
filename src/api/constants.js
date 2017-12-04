const DEVELOPER_QUERY = 'developer=SergeSwan';
const BASE_URL = 'https://uxcandy.com/~shapoval/test-task-backend';
export const ALL_TASKS_URL = `${BASE_URL}/?${DEVELOPER_QUERY}`;
export const CREATE_TASK_URL = `${BASE_URL}/create?${DEVELOPER_QUERY}`;
export const getEditTaskUrlById = (taskId) => `${BASE_URL}/edit/${taskId}?${DEVELOPER_QUERY}`;
