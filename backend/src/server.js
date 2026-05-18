const express = require("express");
const config = require("./config");
const { pool, waitForDb } = require("./db");
const cvRoutes = require("./routes/cv");

const app = express();

app.use(express.json());
app.use(cvRoutes);

async function start() {
  try {
    await waitForDb();
    app.listen(config.port, () => {
      console.log(`Backend listening on port ${config.port}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
}

process.on("SIGTERM", async () => {
  await pool.end();
  process.exit(0);
});

start();
