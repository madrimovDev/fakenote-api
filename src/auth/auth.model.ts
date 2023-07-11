import Joi from "joi";

const registerUser = Joi.object({
	name: Joi.string().required().min(3),
	surname: Joi.string().min(3),
	email: Joi.string().email().required(),
	username: Joi.string().required().min(3),
	password: Joi.string().required().min(3),
});

const loginUser = Joi.object({
	username: Joi.string().required().min(3),
	password: Joi.string().required().min(3),
});

export default {
	registerUser,
	loginUser,
};
