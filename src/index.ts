import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

import app from "./app";
import { connectDB } from "./config";

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
app.use(cors({ origin: "*" }));

app.listen(PORT, () => {
  connectDB();
  // lightweight console logger for startup
  console.log(
    `Server listening on http://localhost:${PORT} (env: ${process.env.NODE_ENV || "development"})`,
  );
});
