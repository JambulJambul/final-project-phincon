const Router = require('express').Router();

const Middleware = require('../middlewares/authMiddleware');
const Validation = require('../helpers/validationHelper');
const ArenaHelper = require('../helpers/arenaHelper');
const GeneralHelper = require('../helpers/generalHelper');

const fileName = 'server/api/arena.js';

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

const getAllArena = async (_request, reply) => {
  try {
    const response = await ArenaHelper.getAllArena();
    return reply.send(response);
  } catch (err) {
    console.log([fileName, 'register', 'ERROR'], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
  }
}

const getArenaDetails = async (request, reply) => {
  try {
    Validation.arenaIdValidation(request.params);
    const { arena_id } = request.params;
    const response = await ArenaHelper.getArenaDetails({ arena_id });
    return reply.send(response);
  } catch (err) {
    console.log([fileName, 'register', 'ERROR'], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
  }
}

const getOwnerArena = async (request, reply) => {
  try {
    Validation.userIdValidation(request.params);
    const { user_id } = request.params;
    const response = await ArenaHelper.getOwnerArena({ user_id });
    return reply.send(response);
  } catch (err) {
    console.log([fileName, 'register', 'ERROR'], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
  }
}

const deleteArena = async (request, reply) => {
  try {
    Validation.arenaIdValidation(request.params);
    const { arena_id } = request.params;
    const response = await ArenaHelper.deleteArena({ arena_id });
    return reply.send(response);
  } catch (err) {
    console.log([fileName, 'register', 'ERROR'], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
  }
}

const restoreArena = async (request, reply) => {
  try {
    Validation.arenaIdValidation(request.params);
    const { arena_id } = request.params;
    const response = await ArenaHelper.restoreArena({ arena_id });
    return reply.send(response);
  } catch (err) {
    console.log([fileName, 'register', 'ERROR'], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
  }
}

const getCourtByArenaId = async (request, reply) => {
  console.log("here get")

  try {
    Validation.arenaIdValidation(request.params);
    const { arena_id } = request.params;
    const response = await ArenaHelper.getCourtByArenaId({ arena_id });
    return reply.send(response);
  } catch (err) {
    console.log([fileName, 'register', 'ERROR'], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
  }
}

const addCourt = async (request, reply) => {
  try {
    Validation.addCourtValidation(request.body);
    const { arena_id, court_name } = request.body;
    const response = await ArenaHelper.addCourt({ arena_id, court_name });
    return reply.send(response);
  } catch (err) {
    console.log([fileName, 'register', 'ERROR'], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
  }
}

const deleteCourt = async (request, reply) => {
  try {
    Validation.courtIdValidation(request.params);
    const { court_id } = request.params;
    const response = await ArenaHelper.deleteCourt({ court_id });
    return reply.send(response);
  } catch (err) {
    console.log([fileName, 'register', 'ERROR'], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
  }
}

const getDailyScheduleByArenaId = async (request, reply) => {
  try {
    Validation.dailyScheduleValidation(request.query);
    const { arena_id, schedule_day } = request.query;
    const response = await ArenaHelper.getDailyScheduleByArenaId({ arena_id, schedule_day });
    return reply.send(response);
  } catch (err) {
    console.log([fileName, 'schedule', 'ERROR'], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
  }
}

Router.get('/', getAllArena);
Router.get('/details/:arena_id', getArenaDetails);
Router.get('/court/:arena_id', getCourtByArenaId);
Router.get('/schedule', getDailyScheduleByArenaId);
Router.get('/owner/:user_id', Middleware.validateToken, getOwnerArena);
Router.post('/court/create', Middleware.validateToken, addCourt);
Router.post('/create', Middleware.validateToken, createArena);
Router.post('/restore/:arena_id', Middleware.validateToken, restoreArena);
Router.post('/add-arena-image', Middleware.validateToken, addArenaImage);
Router.delete('/delete/:arena_id', Middleware.validateToken, deleteArena);
Router.delete('/court/delete/:court_id', Middleware.validateToken, deleteCourt);

module.exports = Router;