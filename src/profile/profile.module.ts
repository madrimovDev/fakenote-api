import { Router } from "express";
import { ProfileService } from "./profile.service";
import prisma from "../prisma";
import { ProfileController } from "./profile.controller";

const service = new ProfileService(prisma);
const controller = new ProfileController(service);

const router = Router();

router.get("/", controller.getProfile.bind(controller));
router.post("/", controller.createProfile.bind(controller));
router.put("/image", controller.editProfileImage.bind(controller));

export default router;

