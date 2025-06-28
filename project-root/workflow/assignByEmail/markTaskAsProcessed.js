import {getAccessToken} from '../auth.js'

export async function markTaskAsProcessed(task) {
    const FIELD_PROCESSED_ID = 67;
    const FIELD_PROCESSED_VALUE = 'YES';
    const FIELD_PROCESSED_YES_CHOICE_ID = 1;
    const response = await fetch(`https://api.pyrus.com/v4/tasks/${task.id}/comments`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${await getAccessToken()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          skip_notification: true,
          field_updates: [
            {
              id: FIELD_PROCESSED_ID,
              value: { choice_ids: [FIELD_PROCESSED_YES_CHOICE_ID], choice_id: FIELD_PROCESSED_YES_CHOICE_ID, choice_names: [FIELD_PROCESSED_VALUE] } 
            }]
          })
      });
         if (!response.ok) {
          const errText = await response.text();
          console.log(`Произошла ошибка в задаче с id: ${task.id}:\n${errText} 👎`);
        }
        else {
          console.log(response.status);
          console.log(`Ставим задаче с id: ${task.id}, что она обработана в поле IsProcessed 👍.`);
            } 
}