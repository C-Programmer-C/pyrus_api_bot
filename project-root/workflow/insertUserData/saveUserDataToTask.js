import {getAccessToken} from '../auth.js';

export async function saveUserDataToTask(task_id, user_id, username_telegram)
{
    const TELEGRAM_FIELD_ID = 42;
    const USER_ID_FIELD_ID = 72;
    const IS_MESSAGE_FROM_TELEGRAM_FIELD_ID = 71;
    const USER_DATA_FIELD_ID = 73;

    const field_updates = [
    {
        id: USER_DATA_FIELD_ID,
        value: null
    },
    {
        id: IS_MESSAGE_FROM_TELEGRAM_FIELD_ID,
        value: { choice_ids: [3], choice_id: 3}
    }
];

    
    field_updates.push({
        id: USER_ID_FIELD_ID,
        value: user_id
    },);
    


    field_updates.push({
        id: TELEGRAM_FIELD_ID,
        value: `@${username_telegram}`
    },);
    

    const response = await fetch(`https://api.pyrus.com/v4/tasks/${task_id}/comments`, {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${await getAccessToken()}`,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        skip_notification: true,
        field_updates
    })
});

    if (!response.ok) {
        const errText = await response.text();
        console.log(errText);
        return;
    }
    if (response.status === 200) {
        console.log(`Сохранение данных из Telegram в форме пользователя с id ${task_id}, telegram_id: ${user_id} и username: ${username_telegram} в задаче прошло успешно!`);
        return;
    }    
}
