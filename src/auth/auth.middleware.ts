import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { AuthService } from "./auth.service";

type MiddlewareFunction = (
	req: Request,
	res: Response,
	next: NextFunction
) => void;

export class AuthMiddleware {
	static authVerify(authService: AuthService): MiddlewareFunction {
		return (req, res, next) => {
			const token = req.headers.authorization;
			if (!token) {
				res.status(401).send({
					message: "Access Token not provided",
				});
				return;
			}
			const user = authService.verifyAccessToken(token);

			res.locals = {
				user,
			};
			next();
		};
	}
}

