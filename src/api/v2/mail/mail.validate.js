import Joi from "joi";

export const sendMailValidate = (data) => {
  const userSchema = Joi.object({
    email: Joi.string()
      .pattern(new RegExp("gmail.com$"))
      .email()
      .lowercase()
      .required(),
    password: Joi.string().min(4).max(32).required(),
  });

  return userSchema.validate(data);
};
