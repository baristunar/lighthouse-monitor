import app from "./app.js";
import connectDB from "./database/db.js";
import { CONFIG } from "./config/index.js";

connectDB().then(() => {
  app.listen(CONFIG.PORT, () => {
    console.log(`Server running at http://localhost:${CONFIG.PORT}`);
    console.log('Press Ctrl+C to stop the server');
  });
});