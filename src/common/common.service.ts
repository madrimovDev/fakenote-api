import { Response } from "express";

export class Controller {
	handleError(status = 500, message: string, res: Response) {
		res.status(status);
		res.send({
			message: status === 500 ? "Internal Server Error" : message,
		});
	}
}
