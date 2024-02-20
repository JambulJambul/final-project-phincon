const Joi = require('joi');
const Boom = require('boom');

const registerValidation = (data) => {
  const schema = Joi.object({
    user_name: Joi.string().required().description('Person\'s full name'),
    user_email: Joi.string().required().description('Active email'),
    user_password: Joi.string().min(8).max(20).required().description('Should be between 8-20 characters'),
    confirmPassword: Joi.string().min(8).max(20).required().valid(Joi.ref('user_password')).description('Should match password'),
    user_role: Joi.number().required().description('1 = admin, 2 = arena_owner, 3 = public'),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const loginValidation = (data) => {
  const schema = Joi.object({
    user_email: Joi.string().required().description('Active email'),
    user_password: Joi.string().min(8).max(20).required().description('Should be between 8-20 characters')
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const userIdValidation = (data) => {
  const schema = Joi.object({
    user_id: Joi.number().required().description('id i.e. 1'),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const createArenaValidation = (data) => {
  const schema = Joi.object({
    arena_name: Joi.string().required().description('Arena Name'),
    user_id: Joi.number().required().description('id i.e. 1'),
    arena_latitude: Joi.string().optional().description('latitude'),
    arena_longtitude: Joi.string().optional().description('longtitude'),
    arena_phone: Joi.string().required().description('phone number i.e 081278428742'),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const addArenaImageValidation = (data) => {
  const schema = Joi.object({
    arena_id: Joi.number().required().description('id i.e. 1'),
    arena_img_url: Joi.string().required().description('https://www.images.com'),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

module.exports = {
  registerValidation,
  loginValidation,
  userIdValidation,
  createArenaValidation,
  addArenaImageValidation
};
