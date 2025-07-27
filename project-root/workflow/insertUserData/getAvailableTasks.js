import {OperatorId } from 'pyrus-api';

export function isEmptyArray(arr) {
  return !Array.isArray(arr) || arr.length === 0;
}


export async function getTasksByField(api, choice_id) {
    const FORM_ID = 2303165;
    const IS_MESSAGE_FROM_TELEGRAM_FIELD_ID = 71;
    


    const filters = [
        {
            operator_id: OperatorId.Equals,
            field_id: IS_MESSAGE_FROM_TELEGRAM_FIELD_ID,
            values: [choice_id]
        }
    ];


    const result = await api.forms.getTasks(FORM_ID, { filters });

    return result?.tasks ?? [];
}