import { Router } from "express";

import prisma from "../prisma";

import { bodyValidate } from "../common/body-validate.middleware";
import { noteService } from "../note/note.module";

import { CollectionService } from "./collection.service";
import { CollectionController } from "./collection.controller";
import { collectionScheme } from "./collection.model";
import noteModel from "../note/note.model";
import { upload } from "../common/file-upload.middleware";

const service = new CollectionService(prisma);
const controller = new CollectionController(service, noteService);

const router = Router();

router.get("/", controller.getAll.bind(controller));
router.post(
	"/",
	bodyValidate(collectionScheme),
	controller.create.bind(controller)
);
router.put(
	"/:collectionId",
	bodyValidate(collectionScheme),
	controller.update.bind(controller)
);
router.delete("/:collectionId", controller.remove.bind(controller));

router.get("/:collectionId", controller.getAllNotes.bind(controller));
router.post(
	"/:collectionId",
	upload.single("img"),
	bodyValidate(noteModel.noteScheme),
	controller.createNote.bind(controller)
);

export default router;

