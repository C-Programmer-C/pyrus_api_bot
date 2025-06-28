function getField(fields, id) {
    const result_field = fields.find(f => f.id === id);
    if (!result_field || result_field === undefined)
        console.log(`Поле ${fields} не было найдено при id: ${id}`)
    return result_field;
}

export function userDiffersFromTask(user, task) {
    let FIELD_PAIRS = [
        [6, 6],    // first telephone
        [58, 13],  // second telephone
        [42, 8],   // telegram
        [43, 9],   // whatsapp
        [44, 11],  // name PC
        [45, 12],  // note
        [40, 10],  // contractor (special case)
        [5, 7], // эл. почта
    ];


    const CONSTRACTOR_FIELD_ID_USER = 10;
    const CONSTRACTOR_FIELD_ID_TASK = 40;


    for (const [taskFieldId, userFieldId] of FIELD_PAIRS) {
        const taskField = getField(task.fields, taskFieldId);
        const userField = getField(user.fields, userFieldId);

        // === SPECIAL CASE: contractor field (form-link)
        if (taskFieldId === CONSTRACTOR_FIELD_ID_TASK && userFieldId === CONSTRACTOR_FIELD_ID_USER) {
            const taskIdTask = taskField?.value?.task_id || null;
            const taskIdUser = userField?.value?.task_id || null;

            if (taskIdTask !== taskIdUser) {
                return true;
            }
        } else {
            // === Regular string fields
            const taskValue = taskField?.value?.trim?.() || '';
            const userValue = userField?.value?.trim?.() || '';

            if (taskValue !== userValue) {
                return true;
            }
        }
    }

    return false;
}