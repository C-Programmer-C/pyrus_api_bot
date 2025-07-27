export async function getAccessToken() {
    const response = await fetch('https://accounts.pyrus.com/api/v4/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            login: process.env.LOGIN,
            security_key: process.env.SECURITY_KEY
        })
    });

    if (!response.ok) {
        // Попытаться прочитать тело с ошибкой (json или текст)
        let errorDetails;
        try {
            errorDetails = await response.json();
        } catch {
            errorDetails = await response.text();
        }
        throw new Error(`Ошибка получения токена: ${response.status} ${response.statusText} — ${JSON.stringify(errorDetails)}`);
    }

    const data = await response.json();
    return data.access_token;
}
