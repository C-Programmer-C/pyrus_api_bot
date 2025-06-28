import dotenv from 'dotenv';

export async function getAccessToken() {
    dotenv.config();
    const response = await fetch('https://accounts.pyrus.com/api/v4/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            login: process.env.LOGIN,
            security_key: process.env.SECURITY_KEY
        })
    });

    if (!response.ok) { 
        throw new Error('Ошибка получения токена: ' + response.statusText);
    }
    return (await response.json()).access_token;
}