import { Request, Response } from "express";
import { ProfileService } from "./profile.service";

export class ProfileController {
	constructor(private readonly profileService: ProfileService) {}

	async getProfile(req: Request, res: Response) {
		try {
			const { userId } = req.params;

			const profile = await this.profileService.getProfile(+userId);

			if (!profile) {
				throw new Error("Profile not found");
			}

			res.send({
				message: "Profile",
				profile,
			});
		} catch (e) {
			if (e instanceof Error) {
				res.status(403).send({
					message: "Forbidden",
					error: e.message,
				});
			}
		}
	}
	async createProfile(req: Request, res: Response) {
		try {
			const { userId } = req.params;
			const profile = await this.profileService.createProfile(+userId);

			res.send({
				message: "Profile Created",
				profile,
			});
		} catch (e) {
			if (e instanceof Error) {
				res.status(403).send({
					message: "Forbidden",
					error: e.message,
				});
			}
		}
	}
	async editProfileImage(req: Request, res: Response) {
		try {
			const { userId } = req.params;
			const file = req.file;
			if (!file) {
				throw new Error("Image not found");
			}
			const profile = await this.profileService.editImage(+userId, file.path);

			res.send({
				message: "Update Image",
				profile,
			});
		} catch (e) {
			if (e instanceof Error) {
				res.status(403).send({
					message: "Forbidden",
					error: e.message,
				});
			}
		}
	}
}

