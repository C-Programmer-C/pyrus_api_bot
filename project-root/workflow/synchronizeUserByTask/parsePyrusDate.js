
export function parsePyrusDate(rawDate) {
  if (typeof rawDate === 'string') {
    const cleaned = rawDate.replace(/:(\d{3})Z$/, '.$1Z');
    return new Date(cleaned);
  }

  return new Date(rawDate || 0);

}