const app = require("./app");
const connectDB = require("./database/db");
const { CONFIG } = require("./config/index");

connectDB().then(() => {
  app.listen(CONFIG.PORT, () => {
    console.log(`Server running at http://localhost:${CONFIG.PORT}`);
    console.log('Press Ctrl+C to stop the server');
  });
});

export {};