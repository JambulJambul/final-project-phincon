const Boom = require('boom');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const jwt = require('jsonwebtoken');

const db = require('../../models');
const GeneralHelper = require('./generalHelper');

const jwtSecretToken = process.env.JWT_SECRET_TOKEN || 'super_strong_key';
const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '24h';
const fileName = 'server/helpers/authHelper.js';
const salt = bcrypt.genSaltSync(10);

// eslint-disable-next-line arrow-body-style
const __hashPassword = (user_password) => {
  return bcrypt.hashSync(user_password, salt);
}

// eslint-disable-next-line arrow-body-style
const __comparePassword = (payloadPass, dbPass) => {
  return bcrypt.compareSync(payloadPass, dbPass);
}

// eslint-disable-next-line arrow-body-style
const __generateToken = (data) => {
  return jwt.sign(data, jwtSecretToken, { expiresIn: jwtExpiresIn });
}

const registerUser = async (dataObject) => {
  const { user_name, user_email, user_password, user_role } = dataObject;

  try {
    const user = await db.User.findOne({
      where: { user_email }
    });
    if (!_.isEmpty(user)) {
      return Promise.reject(Boom.badRequest('EMAIL_HAS_BEEN_USED'));
    }

    const hashedPass = __hashPassword(user_password)
    await db.User.create({ user_name, user_email, user_password: hashedPass, user_role: user_role });

    return Promise.resolve(true);
  } catch (err) {
    console.log([fileName, 'registerUser', 'ERROR'], { info: `${err}` });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
}

const login = async (dataObject) => {
  const { user_email, user_password } = dataObject;

  try {
    const user = await db.User.findOne({
      where: { user_email }
    });
    if (_.isEmpty(user)) {
      return Promise.reject(Boom.notFound('USER_NOT_FOUND'));
    }

    const isPassMatched = __comparePassword(user_password, user.user_password)
    if (!isPassMatched) {
      return Promise.reject(Boom.badRequest('WRONG_CREDENTIALS'));
    }

    const token = __generateToken({
      user_name: user.user_name,
      user_email: user.user_email,
      user_role: user.user_role,
    });

    return Promise.resolve({ token });
  } catch (err) {
    console.log([fileName, 'login', 'ERROR'], { info: `${err}` });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
}

const userDelete = async (dataObject) => {
  const { user_id } = dataObject;

  try {
    const user = await db.User.findOne({
      where: { user_id }
    });
    if (_.isEmpty(user)) {
      return Promise.reject(Boom.notFound('USER_NOT_FOUND'));
    }
    await db.User.destroy({
      where: { user_id }
    });

    return Promise.resolve(true);
  } catch (err) {
    console.log([fileName, 'login', 'ERROR'], { info: `${err}` });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
}

const userRestore = async (dataObject) => {
  const { user_id } = dataObject;

  try {

    await db.User.restore({
      where: { user_id }
    });
    const user = await db.User.findOne({
      where: { user_id }
    });
    if (_.isEmpty(user)) {
      return Promise.reject(Boom.notFound('USER_NOT_FOUND'));
    }

    return Promise.resolve(true);
  } catch (err) {
    console.log([fileName, 'login', 'ERROR'], { info: `${err}` });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
}

const getAllUsers = async () => {
  try {
    const users = await db.User.findAll({
      attributes: { exclude: ['user_password', 'createdAt', 'updatedAt', 'deletedAt'] },
      order: [['user_id', 'ASC']]
    });
    if (_.isEmpty(users)) {
      return Promise.reject(Boom.notFound('NO_USER_FOUND'));
    }
    const message = "Successfully fetched users."
    res = { message, users }
    return Promise.resolve(res);
  } catch (error) {

  }
}

const getUserById = async (dataObject) => {
  const { user_id } = dataObject
  try {
    const users = await db.User.findOne({
      where: { user_id },
      attributes: { exclude: ['user_password', 'createdAt', 'updatedAt', 'deletedAt'] },
      order: [['user_id', 'ASC']]
    });
    if (_.isEmpty(users)) {
      return Promise.reject(Boom.notFound('USER_NOT_FOUND'));
    }
    const message = "Successfully fetched user."
    res = { message, users }
    return Promise.resolve(res);
  } catch (error) {

  }
}

module.exports = {
  registerUser,
  login,
  userDelete,
  userRestore,
  getAllUsers,
  getUserById
}