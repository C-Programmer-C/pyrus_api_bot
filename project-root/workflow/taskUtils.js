import {OperatorId } from 'pyrus-api';

export function isEmptyArray(arr) {
  return !Array.isArray(arr) || arr.length === 0;
}


export async function getTasksByChannel(api, channelChoiceId, includeProcessedFilter = true) {
    const FORM_ID = 2303165;
    const CHANNEL_FIELD_ID = 12;
    const IS_PROCESSED_FIELD_ID = 67;
    const IS_PROCESSED_CHOICE_ID = 2;

    const filters = [
        {
            operator_id: OperatorId.Equals,
            field_id: CHANNEL_FIELD_ID,
            values: [channelChoiceId]
        }
    ];

    if (includeProcessedFilter) {
        filters.push({
            operator_id: OperatorId.Equals,
            field_id: IS_PROCESSED_FIELD_ID,
            values: [IS_PROCESSED_CHOICE_ID]
        });
    }

    const result = await api.forms.getTasks(FORM_ID, { filters });

    return result?.tasks ?? [];
}


export function extractEmailsFromTask(task) {
    const email_value = task.fields.find(f => f.code === 'SenderEmail')?.value;
    if (!email_value) return [];

    return email_value
        .split(',')
        .map(e => e.trim())
        .filter(e => e.length > 0);
}


export async function findUserByEmail(api, email) {
    const FORM_ID_USER = 2304966;
    const EMAIL_FIELD_ID = 7;

    const result = await api.forms.getTasks(FORM_ID_USER, {
        filters: [
            {
                operator_id: OperatorId.Equals,
                field_id: EMAIL_FIELD_ID,
                values: [String(email)]
            },
        ],
    });

    return result;
}

export function isFieldEmpty(field) {
    return !field || field.value === undefined || field.value === null || field.value === '';
}

export async function findUserByTask(api, task) {
    const emails = extractEmailsFromTask(task);

    if (emails.length === 0) return undefined;

    // 1. Пробуем найти пользователя по всем почтам сразу
    const emailString = emails.join(', ');
    let result = await findUserByEmail(api, emailString);
    if (result?.tasks?.length > 0) {
        return result.tasks[0];
    }

    // 2. Пробуем по первой почте
    if (emails[0]) {
        result = await findUserByEmail(api, emails[0]);
        if (result?.tasks?.length > 0) {
            return result.tasks[0];
        }
    }

    // 3. Пробуем по второй почте
    if (emails[1]) {
        result = await findUserByEmail(api, emails[1]);
        if (result?.tasks?.length > 0) {
            return result.tasks[0];
        }
    }

    return undefined;
}


export function getChannelName(task, field_id = 12) {
    const channelField = task.fields.find(f => f.id === field_id);
    return channelField?.value?.choice_names?.[0]?.toLowerCase() || null;
}

export function isChannel(task, expectedChannel, field_id = 12) {
    const actualChannel = getChannelName(task, field_id);
    return actualChannel === expectedChannel.toLowerCase();
}