import Joi from "joi";

const noteScheme = Joi.object({
	title: Joi.string().required().min(3),
	description: Joi.string().required().min(3),
});

export default { noteScheme };
