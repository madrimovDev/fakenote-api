import express from "express";
import cors from "cors";
import routers from "./routers";
import path from "path";
import { marked } from "marked";
import { readFileSync } from "fs";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use(express.static(path.join(__dirname, "../public")));

app.use("/api/v1/", routers);
app.get("/", (_, res) => {
	var paths = path.join(__dirname, "../public/README.md");
	var file = readFileSync(paths, "utf8");
	res.send(marked(file.toString()));
});

app.listen(1998, () => console.log("Server is running"));

