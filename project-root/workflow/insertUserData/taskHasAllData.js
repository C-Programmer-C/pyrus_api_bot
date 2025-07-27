

export function isProccessedTask(value) {
    const choice_id = value?.value?.choice_id;
    return choice_id == 3;
}

export function HasEmptyData(raw) {
    return !raw || raw.value === undefined || raw.value === null || raw.value === '';
}