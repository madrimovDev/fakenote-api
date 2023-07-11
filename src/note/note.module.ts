import { Router } from "express";
import { NoteService } from "./note.service";
import prisma from "../prisma";
import { NoteController } from "./note.controller";
import { bodyValidate } from "../common/body-validate.middleware";
import noteModel from "./note.model";

const service = new NoteService(prisma);
const controller = new NoteController(service);

const router = Router();

router.post(
	"/",
	bodyValidate(noteModel.noteScheme),
	controller.create.bind(controller)
);
router.get("/", controller.getAll.bind(controller));
router.get("/:noteId", controller.getById.bind(controller));
router.put(
	"/:noteId",
	bodyValidate(noteModel.noteScheme),
	controller.update.bind(controller)
);
router.delete("/:noteId", controller.remove.bind(controller));

export default router;

