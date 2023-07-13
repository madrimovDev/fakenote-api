import { Note, PrismaClient } from "@prisma/client";

export class NoteService {
	constructor(private readonly prisma: PrismaClient) {}
	async create(note: {
		title: string;
		description: string;
		userId: number;
		imagePath?: string;
	}) {
		const newNote = await this.prisma.note.create({
			data: {
				title: note.title,
				description: note.description,
				userId: note.userId,
				coverImage: note.imagePath,
			},
		});
		return newNote;
	}
	async createInCollection(note: {
		collectionId: number;
		title: string;
		description: string;
		userId: number;
		imagePath?: string;
	}) {
		const newNote = await this.prisma.note.create({
			data: {
				...note,
			},
		});
		return newNote;
	}
	async getAllInCollection(collectionId: number) {
		const newNote = await this.prisma.note.findMany({
			where: {
				collectionId,
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
	async update(note: {
		title: string;
		description: string;
		id: number;
		imagePath?: string;
	}) {
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

