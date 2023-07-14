import multer from "multer";
import path from "path";
import { v4 } from "uuid";

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "uploads/");
	},
	filename: function (req, file, cb) {
		const fileExtension = path.extname(file.originalname);
		const filename = `${v4()}${fileExtension}`;
		cb(null, filename);
	},
});

export const upload = multer({
	storage,
	fileFilter(_, file, cb) {
		const extName = path.extname(file.originalname);

		if (extName !== ".jpg" && extName !== ".jpeg" && extName !== ".png") {
			cb(new Error("Only images are allowed"));
			return;
		}
		cb(null, true);
	},
});

