import { Request, Response } from "express";
import { CollectionService } from "./collection.service";
import { log } from "console";
import { NoteService } from "../note/note.service";

export class CollectionController {
	constructor(
		private readonly collectionService: CollectionService,
		private readonly noteService: NoteService
	) {}
	async getAll(req: Request, res: Response) {
		try {
			const { user } = res.locals;
			const collections = await this.collectionService.getAllCollection(
				user.id
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
	async create(req: Request, res: Response) {
		try {
			const { user } = res.locals;
			const { color, name } = req.body;
			const collection = await this.collectionService.createCollection(
				user.id,
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
	async update(req: Request, res: Response) {
		try {
			const { user } = res.locals;
			const { name, color } = req.body;
			const collection = await this.collectionService.updateCollection(
				user.id,
				color,
				name
			);

			res.send({
				message: "Updated Collection",
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
	async remove(req: Request, res: Response) {
		try {
			const { collectionId } = req.params;
			const collection = await this.collectionService.deleteCollection(
				+collectionId
			);
			res.send({
				message: "Deleted",
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
	async getAllNotes(req: Request, res: Response) {
		try {
			const { collectionId } = req.params;

			const notes = await this.noteService.getAllInCollection(+collectionId);
			res.send({
				message: "All Notes in Collection",
				notes,
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
	async createNote(req: Request, res: Response) {
		try {
			const { collectionId } = req.params;
			const { title, description } = req.body;
			const { user } = res.locals;
			const file = req.file;
			const note = await this.noteService.createInCollection({
				collectionId: +collectionId,
				title,
				description,
				userId: user.id,
				imagePath: file?.path,
			});

			res.send({
				message: "Created Note",
				note,
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

