import { Request, Response } from "express";
import { CollectionService } from "./collection.service";
import { NoteService } from "../note/note.service";
import { Controller } from "../common/common.service";

export class CollectionController extends Controller {
	constructor(
		private readonly collectionService: CollectionService,
		private readonly noteService: NoteService
	) {
		super();
	}
	async getAll(_: Request, res: Response) {
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
			this.handleError(404, "Collections Not Found", res);
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
			this.handleError(500, "Failed to Create Collection", res);
		}
	}
	async update(req: Request, res: Response) {
		try {
			const { collectionId } = req.params;
			const { name, color } = req.body;
			const collection = await this.collectionService.updateCollection(
				+collectionId,
				color,
				name
			);

			res.send({
				message: "Updated Collection",
				collection,
			});
		} catch (e) {
			this.handleError(500, "Failed to Update Collection", res);
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
			this.handleError(500, "Failed to Delete Collection", res);
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
			this.handleError(404, "Notes not found!", res);
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
			this.handleError(500, "Failed to Create Collection", res);
		}
	}
}



