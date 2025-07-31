import {getAccessToken} from '../auth.js';




export async function updateUserFromTask(task, found_user) {

    const FIELD_FIRST_TELEPHONE_ID_FORM_REQUEST = 6;
    const FIELD_FIRST_TELEPHONE_ID_FORM_USER = 6;

    const FIELD_SECOND_TELEPHONE_ID_FORM_REQUEST = 58;
    const FIELD_SECOND_TELEPHONE_ID_FORM_USER = 13;
    
    const FIELD_TELEGRAM_ID_FORM_REQUEST = 42;
    const FIELD_TELEGRAM_ID_FORM_USER = 8;

    const FIELD_WHATSAPP_ID_FORM_REQUEST = 43;
    const FIELD_WHATSAPP_ID_FORM_USER = 9;

    const FIELD_NAME_PC_ID_FORM_REQUEST = 44;
    const FIELD_NAME_PC_ID_FORM_USER = 11;

    const FIELD_NOTE_ID_FORM_REQUEST = 45;
    const FIELD_NOTE_ID_FORM_USER = 12;

    const FIELD_EMAIL_ID_FORM_REQUEST = 5;
    const FIELD_EMAIL_ID_FORM_USER = 7;

    const FIELD_CONTRACTOR_ID_FORM_USER = 10;

    const FIELD_USER_ID_FORM_REQUEST = 73;
    const FIELD_USER_ID_FORM_USER = 14;

    let taskId = task.fields.find(f => f.name === 'Контрагент')?.value?.task_id;
    
    const fields = [
        {
            id: FIELD_CONTRACTOR_ID_FORM_USER,
            value: {
                task_id: taskId,
                task_ids: [taskId],
                subject: taskId || `Задача №${taskId}`
            }
        },
        {
            id: FIELD_FIRST_TELEPHONE_ID_FORM_USER,
            value: task.fields.find(f => f.id === FIELD_FIRST_TELEPHONE_ID_FORM_REQUEST)?.value || ''
        },
        {
            id: FIELD_SECOND_TELEPHONE_ID_FORM_USER,
            value: task.fields.find(f => f.id === FIELD_SECOND_TELEPHONE_ID_FORM_REQUEST)?.value || ''
        },
        {
            id: FIELD_TELEGRAM_ID_FORM_USER,
            value: task.fields.find(f => f.id === FIELD_TELEGRAM_ID_FORM_REQUEST)?.value || ''
        },
        {
            id: FIELD_WHATSAPP_ID_FORM_USER,
            value: task.fields.find(f => f.id === FIELD_WHATSAPP_ID_FORM_REQUEST)?.value || ''
        },
        {
            id: FIELD_NAME_PC_ID_FORM_USER,
            value: task.fields.find(f => f.id === FIELD_NAME_PC_ID_FORM_REQUEST)?.value || ''
        },
        {
            id: FIELD_NOTE_ID_FORM_USER,
            value: task.fields.find(f => f.id === FIELD_NOTE_ID_FORM_REQUEST)?.value || ''
        },
        {
            id: FIELD_EMAIL_ID_FORM_USER,
            value: task.fields.find(f => f.id === FIELD_EMAIL_ID_FORM_REQUEST)?.value || ''
        },
        {
            id: FIELD_USER_ID,
            value: task.fields.find(f => f.id === FIELD_USER_ID_FORM_REQUEST)?.value || ''
        }
    ];
    
    const response = await fetch(`https://api.pyrus.com/v4/tasks/${found_user.id}/comments`, {
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
        console.log(`Синхронизация между задачей с id: ${task.id} и пользователем с id: ${found_user.id} прошла успешно 👍`);
    }
}
