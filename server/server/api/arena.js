const Router = require('express').Router();

const Middleware = require('../middlewares/authMiddleware');
const Validation = require('../helpers/validationHelper');
const ArenaHelper = require('../helpers/arenaHelper');
const GeneralHelper = require('../helpers/generalHelper');

const fileName = 'server/api/auth.js';

const createArena = async (request, reply) => {
  try {
    Validation.createArenaValidation(request.body);
    const { arena_name, user_id, arena_latitude, arena_longtitude, arena_phone } = request.body;
    const response = await ArenaHelper.createArena({ arena_name, user_id, arena_latitude, arena_longtitude, arena_phone });
    return reply.send(response);
  } catch (err) {
    console.log([fileName, 'register', 'ERROR'], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
  }
}

const addArenaImage = async (request, reply) => {
  try {
    Validation.addArenaImageValidation(request.body);
    const { arena_id, arena_img_url } = request.body;
    const response = await ArenaHelper.addArenaImage({ arena_id, arena_img_url });
    return reply.send(response);
  } catch (err) {
    console.log([fileName, 'register', 'ERROR'], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
  }
}

const getAllArena = async (request, reply) => {
  try {
    const response = await ArenaHelper.getAllArena();
    return reply.send(response);
  } catch (err) {
    console.log([fileName, 'register', 'ERROR'], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
  }
}

Router.post('/create-arena', Middleware.validateToken, createArena);
Router.post('/add-arena-image', Middleware.validateToken, addArenaImage);
Router.get('/get-all-arena', getAllArena);

module.exports = Router;