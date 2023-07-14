import { Request, Response } from "express";
import { ProfileService } from "./profile.service";
import { Controller } from "../common/common.service";

export class ProfileController extends Controller {
	constructor(private readonly profileService: ProfileService) {
		super();
	}

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
			this.handleError(404, "Profile not found", res);
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
			this.handleError(500, "Failed to Create Profile", res);
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
			this.handleError(500, "Failed to Update Profile Image", res);
		}
	}
}

