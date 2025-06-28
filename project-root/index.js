import { startServer } from "./server.js";
import { assignUserByEmail} from "./workflow/assignByEmail/assignUserByEmail.js";
import { syncUserDataFromTask} from "./workflow/synchronizeUserByTask/syncUserDataFromTask.js";

startServer();

setInterval(() => {
  assignUserByEmail().catch(console.error);
}, 6000);

setInterval(() => {
  syncUserDataFromTask().catch(console.error);
}, 2500);

console.log('Назначение в задаче пользователя по email запущено. 🚗');
console.log('Синхронизация задач запущена. 🌀');