import { startServer } from "./server.js";
import { assignUserByEmail} from "./workflow/assignByEmail/assignUserByEmail.js";
import { insertUserData } from "./workflow/insertUserData/InsertUserData.js";
import { syncUserDataFromTask} from "./workflow/synchronizeUserByTask/syncUserDataFromTask.js";
import dotenv from 'dotenv';

dotenv.config();
startServer();

setInterval(() => {
   assignUserByEmail().catch(console.error);
}, 6000);

 setInterval(() => {
   syncUserDataFromTask().catch(console.error);
}, 2500);

setInterval(() => {
  insertUserData().catch(console.error);
}, 2500);

console.log('Назначение в задаче пользователя по email запущено. 🚗');
console.log('Синхронизация задач запущена. 🌀');
console.log('Сохранение данных из Telegram в форму обращения пользователя запущена. ↔️');
