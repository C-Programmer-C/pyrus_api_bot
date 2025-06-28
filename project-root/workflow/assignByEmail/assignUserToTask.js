import {getAccessToken} from '../auth.js';

export async function assignUserToTask(task, found_user, task_contractor_id)
{
    const FIELD_USER_ID_FORM_REQUEST = 39;

    const FIELD_FIO_ID_FORM_REQUEST = 32;
    const FIELD_FIO_ID_FORM_USER = 5;

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

    const FIELD_PROCESSED_ID_FORM_REQUEST = 67;
    const FIELD_SYNCRONIZED_DATE_ID_FORM_REQUEST = 68;
    const FIELD_CONTRACTOR_ID_FORM_REQUEST = 40;
    const FIELD_CONTRACTOR_DEFAULT_ID_FORM_REQUEST = 285633782;
    const field_updates = [
    {
        id: FIELD_USER_ID_FORM_REQUEST,
        value: {
            task_id: found_user.id,
            task_ids: [found_user.id],
            subject: found_user.text || `Задача №${found_user.id}`
        }
    },
    {
        id: FIELD_FIO_ID_FORM_REQUEST,
        value: found_user.fields.find(f => f.id === FIELD_FIO_ID_FORM_USER)?.value || ''
    },
    {
        id: FIELD_FIRST_TELEPHONE_ID_FORM_REQUEST,
        value: found_user.fields.find(f => f.id === FIELD_FIRST_TELEPHONE_ID_FORM_USER)?.value || ''
    },
    {
        id: FIELD_SECOND_TELEPHONE_ID_FORM_REQUEST,
        value: found_user.fields.find(f => f.id === FIELD_SECOND_TELEPHONE_ID_FORM_USER)?.value || ''
    },
    {
        id: FIELD_TELEGRAM_ID_FORM_REQUEST,
        value: found_user.fields.find(f => f.id === FIELD_TELEGRAM_ID_FORM_USER)?.value || ''
    },
    {
        id: FIELD_WHATSAPP_ID_FORM_REQUEST,
        value: found_user.fields.find(f => f.id === FIELD_WHATSAPP_ID_FORM_USER)?.value || ''
    },
    {
        id: FIELD_NAME_PC_ID_FORM_REQUEST,
        value: found_user.fields.find(f => f.id === FIELD_NAME_PC_ID_FORM_USER)?.value || ''
    },
    {
        id: FIELD_NOTE_ID_FORM_REQUEST,
        value: found_user.fields.find(f => f.id === FIELD_NOTE_ID_FORM_USER)?.value || ''
    },
    {
        id: FIELD_PROCESSED_ID_FORM_REQUEST,
        value: { choice_ids: [1], choice_id: 1, choice_names: ['NO'] }
    },
    {
        id: FIELD_SYNCRONIZED_DATE_ID_FORM_REQUEST,
        value: task.created_at || new Date().toISOString()
    }
];

    
if (task_contractor_id) {
    field_updates.push({
        id: FIELD_CONTRACTOR_ID_FORM_REQUEST,
        value: {
            task_id: task_contractor_id,
            task_ids: [task_contractor_id],
            subject: task_contractor_id || `Задача №${task_contractor_id}`
        }
    });
}
else {
       field_updates.push({
        id: FIELD_CONTRACTOR_ID_FORM_REQUEST,
        value: {
            task_id: FIELD_CONTRACTOR_DEFAULT_ID_FORM_REQUEST,
            task_ids: [FIELD_CONTRACTOR_DEFAULT_ID_FORM_REQUEST],
            subject: FIELD_CONTRACTOR_DEFAULT_ID_FORM_REQUEST || `Задача №${FIELD_CONTRACTOR_DEFAULT_ID_FORM_REQUEST}`
        }
    });
    
}

    const responce = await fetch(`https://api.pyrus.com/v4/tasks/${task.id}/comments`, {
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

    if (!responce.ok) {
        const errText = await responce.text();
        console.log(errText);
    }
    else {
        console.log(responce.status);
        console.log(`Данные были успешно изменены в задаче формы "Обращение клиента" c id: ${task.id}`);
        }
}