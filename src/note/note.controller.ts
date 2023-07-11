import { Request, Response } from "express";
import { NoteService } from "./note.service";

export class NoteController {
	constructor(private readonly noteService: NoteService) {}
	async create(req: Request, res: Response) {
		try {
			const note = req.body as { title: string; description: string };
			const id = +res.locals.user.id;
			const newNote = await this.noteService.create({
				...note,
				userId: id,
			});

			res.send({
				message: "Note Created",
				note: newNote,
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
	async getAll(req: Request, res: Response) {
		try {
			const id = +res.locals.user.id;
			const notes = await this.noteService.getAll(id);
			res.send({
				message: "All Notes",
				notes,
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
			const note = req.body as {
				title: string;
				description: string;
				id: number;
			};
			const newNote = await this.noteService.update(note);

			res.send({
				message: "Note Updated",
				note: newNote,
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
	async remove(req: Request, res: Response) {
		try {
			const { noteId } = req.params;
			const deletedNote = await this.noteService.remove(+noteId);

			res.send({
				message: "Note Deleted",
				note: deletedNote,
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
}

