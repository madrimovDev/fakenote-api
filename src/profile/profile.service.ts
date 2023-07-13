import { PrismaClient } from "@prisma/client";

export class ProfileService {
	constructor(private readonly prisma: PrismaClient) {}

	async createProfile(userId: number) {
		const profile = await this.prisma.profile.create({
			data: {
				userId: userId,
			},
			include: {
				user: {
					select: {
						id: true,
						name: true,
						email: true,
						surname: true,
						username: true,
					},
				},
			},
		});
		return profile;
	}

	async getProfile(userId: number) {
		const profile = await this.prisma.profile.findUnique({
			where: {
				userId: userId,
			},
			include: {
				user: {
					select: {
						id: true,
						name: true,
						email: true,
						surname: true,
						username: true,
					},
				},
			},
		});
		return profile;
	}

	async editImage(userId: number, image?: string) {
		const profile = await this.prisma.profile.update({
			where: {
				userId: userId,
			},
			data: {
				image,
			},
			select: {
				image: true,
			},
		});
		return profile;
	}
}

