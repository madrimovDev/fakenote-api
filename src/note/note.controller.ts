import { Request, Response } from "express";
import { NoteService } from "./note.service";
import { Controller } from "../common/common.service";

export class NoteController extends Controller {
	constructor(private readonly noteService: NoteService) {
		super();
	}
	async create(req: Request, res: Response) {
		try {
			const file = req.file;
			const note = req.body as { title: string; description: string };
			const id = +res.locals.user.id;
			const newNote = await this.noteService.create({
				...note,
				userId: id,
				imagePath: file?.path,
			});

			res.send({
				message: "Note Created",
				note: newNote,
			});
		} catch (err) {
			this.handleError(500, "Failed to Create Note", res);
		}
	}
	async getAll(req: Request, res: Response) {
		try {
			const id = +res.locals.user.id;
			const notes = await this.noteService.getAll(id);
			res.send({
				message: "All Notes",
				notes,
			});
		} catch (err) {
			this.handleError(404, "Notes not found", res);
		}
	}
	async getById(req: Request, res: Response) {
		try {
			const { noteId } = req.params;
			const note = await this.noteService.getById(+noteId);
			res.send({
				message: "Note",
				note,
			});
		} catch (err) {
			if (err instanceof Error) {
				res.status(403).send({
					message: "Forbidden",
					error: err.message,
				});
			}
		}
	}
	async update(req: Request, res: Response) {
		try {
			const { noteId } = req.params;
			const note = req.body as {
				title: string;
				description: string;
			};
			const file = req.file;
			const newNote = await this.noteService.update({
				...note,
				imagePath: file?.path,
				id: +noteId,
			});

			res.send({
				message: "Note Updated",
				note: newNote,
			});
		} catch (err) {
			this.handleError(500, "Failed to Update Note", res);
		}
	}
	async remove(req: Request, res: Response) {
		try {
			const { noteId } = req.params;
			const deletedNote = await this.noteService.remove(+noteId);

			res.send({
				message: "Note Deleted",
				note: deletedNote,
			});
		} catch (err) {
			this.handleError(500, "Failed to Delete Note", res);
		}
	}
}

