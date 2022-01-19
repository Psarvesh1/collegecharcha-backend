const Joi = require("@hapi/joi");

//register validation
const registerValidation = (data) => {
  const schema = Joi.object().keys({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(8).required().email(),
    password: Joi.string().min(8).required(),
    cpassword: Joi.any()
      .equal(Joi.ref("password"))
      .required()
      .label("Confirm password")
      .options({ messages: { "any.only": "{{#label}} does not match" } }),
  });
  return schema.validate(data);
};
const loginValidation = (data) => {
  const schema = Joi.object().keys({
    email: Joi.string().min(8).required().email(),
    password: Joi.string().min(8).required(),
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
