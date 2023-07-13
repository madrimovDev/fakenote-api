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
	async createCollection(userId: number, color: string, name: string) {
		const collection = await this.prisma.collection.create({
			data: {
				name,
				color,
				user: {
					connect: {
						id: userId,
					},
				},
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

