import {getTasksByField} from './getAvailableTasks.js';
import {PyrusApiClient} from 'pyrus-api';
import {getAccessToken} from '../auth.js';
import {isEmptyArray, isFieldEmpty, findUserByTask} from '../taskUtils.js';
import { HasEmptyData, isProccessedTask } from './taskHasAllData.js';
import { saveUserDataToTask } from './saveUserDataToTask.js';
import { parseUserData } from './parseUserData.js';
import { saveDataToUser } from './saveDataToUser.js';

export async function insertUserData() { 
  
  const token = await getAccessToken();
  const api = new PyrusApiClient(token);
  const tasks = await getTasksByField(api, 1);
  const USER_FIELD_ID = 39;
  const IS_PROCESSED_FIELD_CHOICE_ID = 71;
  const USER_DATA_FIELD_ID = 73;

  if (isEmptyArray(tasks)) {
  return;
 }

  for (const task of tasks) {

    const user_field = task.fields?.find(f => f.id === USER_FIELD_ID);

    const is_processed_field = task.fields?.find(f => f.id === IS_PROCESSED_FIELD_CHOICE_ID);
    const user_data_field = task.fields?.find(f => f.id === USER_DATA_FIELD_ID);

    if (isFieldEmpty(user_field) || isProccessedTask(is_processed_field) || HasEmptyData(user_data_field)) {
      continue;
      }
    
    
    const user_data_value = user_data_field.value;

    const task_id = task.id;

    if (!task_id) {
      console.error(`id задачи не была найдена`);
      continue;
    }

    console.log(user_data_value)
    const result = parseUserData(user_data_value, task_id);
    if (!result) {
      continue; 
    }

    const user_id = result[0];

    const name = result[1];

    const trimmedName = name?.trim();

    // Проверяем, что user_id пустой ИЛИ name пустой после обрезки пробелов
    if (!user_id || !trimmedName) {
      console.error("Пользовательские данные отсутствуют в задаче с task_id", task_id);
      continue;
    }
    
    await saveUserDataToTask(task.id, user_id, name)
    console.log(user_field)
    const task_user_id = user_field.value.task_id
    await saveDataToUser(task_user_id, name, user_id)

  }

}

