import { getAvailableTasks } from "./getAvailableTasks.js";
import {isEmptyArray, isFieldEmpty} from '../taskUtils.js';
import { parsePyrusDate } from "./parsePyrusDate.js";
import { updateUserFromTask } from "./updateUserFromTask.js";
import {getAccessToken} from '../auth.js';
import { updateLastSyncedAtField } from "./updateLastSyncedAtField.js";
import {PyrusApiClient} from 'pyrus-api';
import { userDiffersFromTask } from "./userDiffersFromTask.js";
import { findUserById } from "./findUserById.js";

export async function syncUserDataFromTask() {
    const token = await getAccessToken();
    const api = new PyrusApiClient(token);
    const LAST_SYNCED_FIELD_ID = 68;
    const USER_FIELD_ID = 39;
    let tasks = await getAvailableTasks(api);

    if (isEmptyArray(tasks)) {
        console.log('Задачи для синхронизации не найдены. Нечего обрабатывать.');
        return;
    }

    for (const task of tasks) {
        const userField = task.fields?.find(f => f.id === USER_FIELD_ID);
        if (isFieldEmpty(userField)) continue;
        
        const found_user = await findUserById(token, task)
        
        if (!found_user) continue;

        const rawSync = task.fields.find(f => f.id === LAST_SYNCED_FIELD_ID)?.value;
        const lastSyncedValue = rawSync ? new Date(rawSync) : new Date(0);

        const taskLastModified = parsePyrusDate(task.last_modified_date);

        if (lastSyncedValue < taskLastModified && userDiffersFromTask(found_user, task)) { 
            await updateUserFromTask(task, found_user);
            await updateLastSyncedAtField(task.id, LAST_SYNCED_FIELD_ID, new Date().toISOString());
            console.log(`[INFO] Обновлён пользователь ${found_user.id} по задаче ${task.id}`);
        }
    }
}