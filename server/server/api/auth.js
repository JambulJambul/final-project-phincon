const Router = require('express').Router();

const Middleware = require('../middlewares/authMiddleware');
const Validation = require('../helpers/validationHelper');
const AuthHelper = require('../helpers/authHelper');
const GeneralHelper = require('../helpers/generalHelper');
const Decryptor = require('../utils/decryptor');

const fileName = 'server/api/auth.js';

const register = async (request, reply) => {
  try {
    const decryptedData = Decryptor.decryptObject(request.body);
    Validation.registerValidation(decryptedData);
    const { user_name, user_email, user_password, user_role } = decryptedData;
    const response = await AuthHelper.registerUser({ user_name, user_email, user_password, user_role });
    return reply.send(response);
  } catch (err) {
    console.log([fileName, 'register', 'ERROR'], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
  }
}

const login = async (request, reply) => {
  try {
    const decryptedData = Decryptor.decryptObject(request.body);
    Validation.loginValidation(decryptedData);
    const { user_email, user_password } = decryptedData;
    const response = await AuthHelper.login({ user_email, user_password });
    return reply.send(response);
  } catch (err) {
    console.log([fileName, 'login', 'ERROR'], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
  }
}

const userDelete = async (request, reply) => {
  try {
    Validation.userIdValidation(request.params);
    const { user_id } = request.params;
    const response = await AuthHelper.userDelete({ user_id });
    return reply.send(response);
  } catch (err) {
    console.log([fileName, 'userDelete', 'ERROR'], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
  }
}

const userRestore = async (request, reply) => {
  try {
    Validation.userIdValidation(request.params);
    const { user_id } = request.params;
    const response = await AuthHelper.userRestore({ user_id });
    return reply.send(response);
  } catch (err) {
    console.log([fileName, 'userRestore', 'ERROR'], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
  }
}

const getAllUsers = async (_request, reply) => {
  try {
    const response = await AuthHelper.getAllUsers();
    return reply.send(response);
  } catch (err) {
    console.log([fileName, 'getAllUsers', 'ERROR'], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
  }
}

const getUserById = async (request, reply) => {
  try {
    Validation.userIdValidation(request.params);
    const { user_id } = request.params;
    const response = await AuthHelper.getUserById({user_id});
    return reply.send(response);
  } catch (err) {
    console.log([fileName, 'getAllUsers', 'ERROR'], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
  }
}

const hello = async (_request, reply) => {
  return reply.send('HELLO');
}

Router.get('/', Middleware.validateToken, getAllUsers);
Router.get('/details/:user_id', Middleware.validateToken, getUserById);
Router.get('/validate-token', Middleware.validateToken, hello);
Router.post('/register', register);
Router.post('/login', login);
Router.post('/user-restore/:user_id', userRestore);
Router.delete('/user-delete/:user_id', userDelete);

module.exports = Router;