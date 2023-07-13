import { Router } from "express";
import { ProfileService } from "./profile.service";
import prisma from "../prisma";
import { ProfileController } from "./profile.controller";
import { upload } from "../common/filte-upload.middleware";

const service = new ProfileService(prisma);
const controller = new ProfileController(service);

const router = Router();

router.get("/:userId", controller.getProfile.bind(controller));
router.post("/:userId", controller.createProfile.bind(controller));
router.put(
	"/:userId/image",
	upload.single("img"),
	controller.editProfileImage.bind(controller)
);

export default router;

