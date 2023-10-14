import express, { Application, Request, Response } from "express";
import cors from "cors";
import users from "./router/userRouter";
import contacts from "./router/contactRouter";

export const mainApp = (app: Application) => {
  app.use(express.json());
  app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "DELETE", "PATCH"],
    })
  );
  app.get("/", (req: Request, res: Response) => {
    return res.status(200).json({
      message: "You're using Kossyrisochuwku Francis Uzoigwe's phonebook api",
    });
  });
  app.use("/api", users);
  app.use("/api", contacts);
};
