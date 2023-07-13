import { Request, Response } from "express";
import { CollectionService } from "./collection.service";

export class CollectionController {
	constructor(private readonly collectionService: CollectionService) {}

	async getAllCollection(req: Request, res: Response) {
		try {
			const { userId } = req.params;
			const collections = await this.collectionService.getAllCollection(
				+userId
			);
			res.send({
				message: "All Collection",
				collections,
			});
		} catch (e) {
			if (e instanceof Error) {
				res.status(400).send({
					message: "Bad Request",
					error: e.message,
				});
			}
		}
	}
	async getAllNotesByCollection(req: Request, res: Response) {
		try {
			const { collectionId } = req.query;
			if (!collectionId) {
				throw new Error("Query not found");
			}
			const collections = await this.collectionService.getAllNotesByCollection(
				+collectionId
			);
			res.send({
				message: "All Notes in Collection",
				collections,
			});
		} catch (e) {
			if (e instanceof Error) {
				res.status(400).send({
					message: "Bad Request",
					error: e.message,
				});
			}
		}
	}

	async createCollection(req: Request, res: Response) {
		try {
			const { userId } = req.params;
			const { color, name } = req.body;
			const collection = await this.collectionService.createCollection(
				+userId,
				color,
				name
			);

			res.send({
				message: "Collection Created",
				collection,
			});
		} catch (e) {
			if (e instanceof Error) {
				res.status(400).send({
					message: "Bad Request",
					error: e.message,
				});
			}
		}
	}
}

