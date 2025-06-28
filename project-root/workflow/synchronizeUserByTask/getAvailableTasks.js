import {getTasksByChannel} from '../taskUtils.js';

export async function getAvailableTasks(api) {
    const EMAIL_CHANNEL_CHOICE_ID = 2;
    const TELEPHONE_CHANNEL_CHOICE_ID = 1;

    const emailTasks = await getTasksByChannel(api, EMAIL_CHANNEL_CHOICE_ID, false);
    const telephoneTasks = await getTasksByChannel(api, TELEPHONE_CHANNEL_CHOICE_ID, false);

    return emailTasks.concat(telephoneTasks);
    
}