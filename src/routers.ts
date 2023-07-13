import { Router } from "express";
import authModule, { authVerify } from "./auth/auth.module";
import noteModule from "./note/note.module";
import asyncHandler from "express-async-handler";
import profileModule from "./profile/profile.module";

const router = Router();

router.use("/auth", asyncHandler(authModule));
router.use("/note", authVerify, asyncHandler(noteModule));
router.use("/profile", authVerify, asyncHandler(profileModule));

export default router;
