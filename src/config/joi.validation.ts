import * as Joi from 'joi';

export const JoiValidationEnvSchema = Joi.object({
  MONGODB: Joi.required(),
  PORT: Joi.number().default(3000),
});
