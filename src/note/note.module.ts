import { Router } from "express";
import { NoteService } from "./note.service";
import prisma from "../prisma";
import { NoteController } from "./note.controller";
import { bodyValidate } from "../common/body-validate.middleware";
import noteModel from "./note.model";
import { upload } from "../common/file-upload.middleware";

export const noteService = new NoteService(prisma);
const controller = new NoteController(noteService);

const router = Router();

router.post(
	"/",
	upload.single("img"),
	bodyValidate(noteModel.noteScheme),
	controller.create.bind(controller)
);
router.get("/", controller.getAll.bind(controller));
router.get("/:noteId", controller.getById.bind(controller));
router.put(
	"/:noteId",
	upload.single("img"),
	bodyValidate(noteModel.noteScheme),
	controller.update.bind(controller)
);
router.delete("/:noteId", controller.remove.bind(controller));

export default router;

