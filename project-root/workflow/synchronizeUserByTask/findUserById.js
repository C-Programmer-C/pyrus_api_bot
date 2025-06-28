export async function findUserById(token, task) {
    const USER_FIELD_ID = 39
     // Находим поле с нужным ID
    const field39 = task.fields.find(f => f.id === USER_FIELD_ID);
    if (!field39 || !field39.value || !field39.value.task_id) {
        console.warn("⚠️ Не удалось найти поле с ID 39 или task_id отсутствует");
        return;
    }
    const userTaskId = field39.value.task_id;
    const response = await fetch(`https://api.pyrus.com/v4/tasks/${userTaskId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        console.error(`❌ Ошибка при получении задачи ${userTaskId}: ${response.status} ${response.statusText}`);
    }

    const userTaskData = await response.json();
    return userTaskData.task;
}