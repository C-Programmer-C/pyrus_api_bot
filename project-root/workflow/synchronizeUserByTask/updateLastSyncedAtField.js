import {getAccessToken} from '../auth.js';

export async function updateLastSyncedAtField(taskId, fieldId, value_date) {
    const response = await fetch(`https://api.pyrus.com/v4/tasks/${taskId}/comments`, {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${await getAccessToken()}`,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
     skip_notification: true,
     field_updates: [
        { id: fieldId, value: value_date }
    ]})
});
    if (!response.ok) {
        const errText = await response.text();
        console.log(errText);
    }
    else {
        console.log(response.status);
    }
}
