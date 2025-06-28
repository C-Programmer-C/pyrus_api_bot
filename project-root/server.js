import express from 'express';

export function startServer() {
 const app = express();
 const PORT = process.env.PORT || 3000;
 app.get('/ping', (req, res) => {
  console.log(`[PING] ${new Date().toISOString()}`);
  res.send('pong');
});
 app.listen(PORT, () => {
   console.log(`🔄 Сервер запущен на http://localhost:${PORT}`);
 });
}