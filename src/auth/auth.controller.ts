import { Request, Response } from "express";
import { AuthService } from "./auth.service";

const SUPERVISOR_SECRET_WORD = process.env.SUPERVISOR_SECRET_WORD;

export class AuthController {
	constructor(private readonly authService: AuthService) {}
	async register(req: Request, res: Response) {
		try {
			const { name, surname, username, password, email } = req.body;
			const supervisor = req.headers["x-supervisor"] as string | undefined;
			const {
				password: _password,
				supervisor: _supervisor,
				...rest
			} = await this.authService.registerUser({
				name,
				surname,
				username,
				email,
				password,
				supervisor: Boolean(supervisor),
			});
			const accessToken = this.authService.generateAccessToken(rest);
			const refreshToken = this.authService.generateRefreshToken(rest);

			if (supervisor && supervisor === SUPERVISOR_SECRET_WORD) {
				const supervisorToken = this.authService.generateSupervisorToken(rest);
				res.send({
					message: "User registered",
					user: rest,
					accessToken,
					refreshToken,
					supervisorToken,
				});
				return;
			}
			res.send({
				message: "User registered",
				user: rest,
				accessToken,
				refreshToken,
			});
		} catch (e) {
			console.log(e);
			if (e instanceof Error) {
				res.status(401).send({
					message: "Unauthorized",
					error: e.message,
				});
			}
		}
	}
	async login(req: Request, res: Response) {
		try {
			const { username, password } = req.body;
			const supervisor = req.headers["x-supervisor"] as string | undefined;

			const {
				password: _password,
				supervisor: _supervisor,
				...rest
			} = await this.authService.loginUser(username, password);

			const accessToken = this.authService.generateAccessToken(rest);
			const refreshToken = this.authService.generateRefreshToken(rest);
			if (supervisor && supervisor === SUPERVISOR_SECRET_WORD) {
				const supervisorToken = this.authService.generateSupervisorToken(rest);
				res.send({
					message: "User registered",
					user: rest,
					accessToken,
					refreshToken,
					supervisorToken,
				});
				return;
			}
			res.send({
				message: "User registered",
				user: rest,
				accessToken,
				refreshToken,
			});
		} catch (e) {
			console.log(e);
			if (e instanceof Error) {
				res.status(401).send({
					message: "Unauthorized",
					error: e.message,
				});
			}
		}
	}
	async verifyByAccess(req: Request, res: Response) {
		try {
			const accessToken = req.headers.authorization;
			if (!accessToken) throw new Error("Access Token not found!");
			const { password, supervisor, ...rest } =
				this.authService.verifyAccessToken(accessToken);
			res.send({
				message: "Verified",
				user: rest,
			});
		} catch (e) {
			if (e instanceof Error) {
				res.status(400).send({
					message: "Unauthorized",
					error: e.message,
				});
			}
		}
	}
	async refreshAccess(req: Request, res: Response) {
		try {
			const refreshToken = req.headers.authorization;
			if (!refreshToken) throw new Error("Token not found!");
			const { password, supervisor, ...rest } =
				this.authService.verifyRefreshToken(refreshToken);
			const accessToken = this.authService.generateAccessToken(rest);
			res.send({
				message: "Refresh Access Token",
				accessToken,
			});
		} catch (e) {
			if (e instanceof Error) {
				res.status(401).send({
					message: "Unauthorized",
					error: e.message,
				});
			}
		}
	}
}

