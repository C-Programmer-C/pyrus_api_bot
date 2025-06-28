import {getAvailableTasks} from './getAvailableTasks.js';
import {PyrusApiClient} from 'pyrus-api';
import {getAccessToken} from '../auth.js';
import {isEmptyArray, isFieldEmpty, findUserByTask} from '../taskUtils.js';
import {markTaskAsProcessed} from './markTaskAsProcessed.js';
// import {findContractorByEmail} from './findContractorByEmail.js';
import {assignUserToTask} from './assignUserToTask.js';

export async function assignUserByEmail() { 
  
  const token = await getAccessToken();
  const api = new PyrusApiClient(token);
  const USER_FIELD_ID = 39;
  const tasks = await getAvailableTasks(api);

  if (isEmptyArray(tasks)) {
  console.log('Задачи не найдены. Нечего обрабатывать.'); 
  return;
 }

  for (const task of tasks) {
    const user_field = task.fields?.find(f => f.id === USER_FIELD_ID);
     if (!isFieldEmpty(user_field)) {
       await markTaskAsProcessed(task); 
       continue;
      }

   

    const found_user =  await findUserByTask(api, task);
    if (!found_user) {
      console.log(`Нет подходящего пользователя у задачи с id: ${task.id}`);
      continue;
    }

    let taskId = null;
    const contractorField = found_user.fields.find(f => f.name === 'Контрагент');
    if (contractorField && contractorField.value && contractorField.value.task_id) {
      taskId = contractorField.value.task_id;
    }

    // const found_contractor = await findContractorByEmail(api, task);
    // console.log(`У обращения клиента с id: ${task.id} был найден контрагент с id: ${found_contractor.id}`);



    await assignUserToTask(task, found_user, taskId);
}
}

