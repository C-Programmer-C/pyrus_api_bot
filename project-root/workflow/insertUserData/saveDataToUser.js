import {getAccessToken} from '../auth.js';




export async function saveDataToUser(task_user_id, name, telegram_user_id) {

    
    const FIELD_TELEGRAM_ID_FORM_REQUEST = 14;
    const FIELD_TELEGRAM_USERNAME_FORM_USER = 8;

    
    const fields = [
        {
            id: FIELD_TELEGRAM_ID_FORM_REQUEST,
            value: telegram_user_id
        },
        {
            id: FIELD_TELEGRAM_USERNAME_FORM_USER,
            value: name
        },
    ];
    
    const response = await fetch(`https://api.pyrus.com/v4/tasks/${task_user_id}/comments`, {
        method: 'POST',
        headers: {
        'Authorization': `Bearer ${await getAccessToken()}`,
        'Content-Type': 'application/json'},
        body: JSON.stringify({
            skip_notification: true,
            field_updates: fields
        })
    });

    if (!response.ok) {
        const errText = await response.text();
        console.log(errText);
    }
    else {
        console.log(response.status);
        console.log(`Данные были успешно загружены Пользователю`);
    }
}
