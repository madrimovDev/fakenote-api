import { Router } from "express";
import authModule, { authVerify } from "./auth/auth.module";
import noteModule from "./note/note.module";
import asyncHandler from "express-async-handler";
import profileModule from "./profile/profile.module";
import collectionModule from "./collection/collection.module";

const router = Router();

router.use("/auth", asyncHandler(authModule));
router.use("/note", authVerify, asyncHandler(noteModule));
router.use("/profile", authVerify, asyncHandler(profileModule));
router.use("/collection", authVerify, asyncHandler(collectionModule));

export default router;

