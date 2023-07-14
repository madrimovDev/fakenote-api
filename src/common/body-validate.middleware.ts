import { NextFunction, Request, Response } from "express";
import Joi from "joi";

type MiddlewareFunction = (
	req: Request,
	res: Response,
	next: NextFunction
) => void;

export function bodyValidate(scheme: Joi.Schema): MiddlewareFunction {
	return (req, res, next) => {
		const { error } = scheme.validate(req.body, { abortEarly: false });
		if (error) {
			res.status(400).send({
				message: 'Bad Request',
				error: error.message,
			});
			return;
		}
		next();
	};
}

