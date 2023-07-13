import Joi from "joi";

export const collectionScheme = Joi.object({
	name: Joi.string().required().min(2),
	color: Joi.string().required().min(3),
});
