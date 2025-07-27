export function parseUserData(user_data, task_id) {
  try {
    const result = user_data.split(',');
    if (!result || result.length === 0) {
      console.error(`Ошибка в задаче с id ${task_id} — пустые данные`);
      return null;
    }
    return result;
  } catch (error) {
    console.error(`Ошибка в задаче с id ${task_id} при разборе user_data:`, error);
    return null;
  }
}