import express from "express";
import env from "dotenv";
import { phoneDB } from "./config/phoneDB";
import { mainApp } from "./mainApp";
env.config();

const app = express();
const realPort: number = parseInt(process.env.PORT!);
const port = realPort;

mainApp(app);
const Server = app.listen(port, () => {
  phoneDB();
  console.log("Server is listening to port", port);
});

process.on("uncaughtException", (error) => {
  console.log("");
  console.log("Server is shutting down due to an uncaught exception", error);

  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  console.log("");
  console.log("Server is shutting down due to an uncaught exception", reason);

  Server.close(() => {
    process.exit(1);
  });
});
