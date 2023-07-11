import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import routers from "./routers";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/v1/", routers);

app.listen(1998, () => console.log("Server is running"));

