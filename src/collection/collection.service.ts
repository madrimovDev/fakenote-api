import { PrismaClient } from "@prisma/client";

export class CollectionService {
	constructor(private readonly prisma: PrismaClient) {}

	async getAllCollection(userId: number) {
		const collections = await this.prisma.collection.findMany({
			where: {
				userId,
			},
		});
		return collections;
	}
	async getAllNotesByCollection(id: number) {
		const notes = await this.prisma.collection.findMany({
			where: {
				id,
			},
			select: {
				notes: true,
			},
		});

		return notes;
	}
	async createCollection(userId: number, color: string, name: string) {
		const collection = await this.prisma.collection.create({
			data: {
				name,
				color,
				userId,
			},
		});
		return collection;
	}
	async updateCollection(id: number, color?: string, name?: string) {
		const collection = await this.prisma.collection.update({
			where: {
				id,
			},
			data: {
				name,
				color,
			},
		});
		return collection;
	}
	async deleteCollection(id: number) {
		const collection = await this.prisma.collection.delete({
			where: {
				id,
			},
		});
		return collection;
	}
}

