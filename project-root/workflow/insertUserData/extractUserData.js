export function extractUserData(task) {
    const USER_DATA_FIELD_ID = 73;
     // Находим поле с нужным ID
    const field = task.fields.find(f => f.id === USER_DATA_FIELD_ID);
    if (!field || !field.value) {
        console.warn("⚠️ Не удалось найти поле с ID 73");
        return null;
    }
    return field.value;
}