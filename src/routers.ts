import { Router } from "express";
import authModule, { authVerify } from "./auth/auth.module";
import noteModule from "./note/note.module";
import asyncHandler from "express-async-handler";

const router = Router();

router.use("/auth", asyncHandler(authModule));
router.use("/note", authVerify, asyncHandler(noteModule));

export default router;

