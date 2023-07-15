import { PrismaClient, User } from "@prisma/client";
import { sign, verify } from "jsonwebtoken";
import { compare, genSalt, hash } from "bcrypt";

const ACCESS_SECRET = process.env.ACCESS_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;
const SUPERVISOR_SECRET = process.env.SUPERVISOR_SECRET;

export class AuthService {
	constructor(private readonly prisma: PrismaClient) {}
	private async getUserByUsername(username: string) {
		return await this.prisma.user.findUnique({
			where: {
				username,
			},
		});
	}
	async registerUser(user: Omit<User, "id">) {
		const foundedUser = await this.getUserByUsername(user.username);

		if (foundedUser) {
			throw new Error("This username is already exists");
		}

		const hashPassword = await this.generateHashPassword(user.password);

		const newUser = this.prisma.user.create({
			data: {
				name: user.name,
				surname: user.surname,
				email: user.email,
				username: user.username,
				password: hashPassword,
				supervisor: user.supervisor,
			},
		});

		return newUser;
	}
	async loginUser(username: string, password: string) {
		const foundedUser = await this.getUserByUsername(username);

		if (!foundedUser) {
			throw new Error("Username wrong");
		}

		const passwordValid = await this.compareHashPassword(
			password,
			foundedUser.password
		);

		if (!passwordValid) {
			throw new Error("Password wrong");
		}

		return foundedUser;
	}
	generateAccessToken(payload: any): string {
		if (!ACCESS_SECRET) throw new Error("Secret Key not found");
		return sign(payload, ACCESS_SECRET, { expiresIn: "30m" });
	}
	generateRefreshToken(payload: any): string {
		if (!REFRESH_SECRET) throw new Error("Secret Key not found");

		return sign(payload, REFRESH_SECRET, { expiresIn: "7d" });
	}
	generateSupervisorToken(payload: any): string {
		if (!SUPERVISOR_SECRET) throw new Error("Secret Key not found");
		return sign(payload, SUPERVISOR_SECRET, {
			expiresIn: "5m",
		});
	}
	verifyAccessToken(token: string): User {
		if (!ACCESS_SECRET) throw new Error("Secret Key not found");
		return verify(token, ACCESS_SECRET) as User;
	}
	verifyRefreshToken(token: string): User {
		try {
			return verify(token, "REFRESH_TOKEN") as User;
		} catch (e) {
			throw new Error("Refresh Token not valid!");
		}
	}
	verifySupervisorToken(token: string): User {
		try {
			return verify(token, "SUPERVISOR_TOKEN") as User;
		} catch (e) {
			throw new Error("Token not valid!");
		}
	}
	private async generateHashPassword(password: string) {
		const salt = await genSalt(10);
		const hashPassword = await hash(password, salt);
		return hashPassword;
	}
	private async compareHashPassword(password: string, hashPassword: string) {
		return await compare(password, hashPassword);
	}
}

