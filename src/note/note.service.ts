import { Note, PrismaClient } from "@prisma/client";

export class NoteService {
	constructor(private readonly prisma: PrismaClient) {}
	async create(note: Omit<Note, "id">) {
		const newNote = await this.prisma.note.create({
			data: {
				title: note.title,
				description: note.description,
				userId: note.userId,
			},
		});
		return newNote;
	}
	async getAll(userId: number) {
		const notes = await this.prisma.note.findMany({
			where: {
				userId,
			},
		});
		return notes;
	}
	async getById(id: number) {
		const note = await this.prisma.note.findUnique({
			where: {
				id,
			},
		});
		return note;
	}
	async update(note: Omit<Note, "userId">) {
		const updatedNote = await this.prisma.note.update({
			where: {
				id: note.id,
			},
			data: {
				title: note.title,
				description: note.description,
			},
		});
		return updatedNote;
	}
	async remove(id: number) {
		const deletedNote = await this.prisma.note.delete({
			where: {
				id,
			},
		});
		return deletedNote;
	}
}

