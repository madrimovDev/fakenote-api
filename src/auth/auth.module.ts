import { NextFunction, Request, Response, Router } from "express";
import prisma from "../prisma";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { AuthMiddleware } from "./auth.middleware";
import authModel from "./auth.model";
import { bodyValidate } from "../common/body-validate.middleware";

const service = new AuthService(prisma);
const controller = new AuthController(service);

export const authVerify = AuthMiddleware.authVerify(service);

const router = Router();

router.post(
	"/register",
	bodyValidate(authModel.registerUser),
	controller.register.bind(controller)
);
router.post(
	"/login",
	bodyValidate(authModel.loginUser),
	controller.login.bind(controller)
);
router.get("/verify", controller.verifyByAccess.bind(controller));
router.get("/refresh", controller.refreshAccess.bind(controller));
router.use((err: Error, req: Request, res: Response, next: NextFunction) => {

})

export default router;

