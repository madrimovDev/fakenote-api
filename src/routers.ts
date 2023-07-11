import { Router } from "express";
import authModule, { authVerify } from "./auth/auth.module";
import noteModule from "./note/note.module";

const router = Router();

router.use("/auth", authModule);
router.use("/note", authVerify, noteModule);

export default router;

