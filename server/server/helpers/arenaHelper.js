const Boom = require('boom');
const _ = require('lodash');
const db = require('../../models');
const GeneralHelper = require('./generalHelper');

const fileName = 'server/helpers/authHelper.js';

// eslint-disable-next-line arrow-body-style
const createArena = async (dataObject) => {
  const { arena_name, user_id, arena_latitude, arena_longtitude, arena_phone } = dataObject;
  try {
    await db.Arena.create({ arena_name, user_id, arena_latitude, arena_longtitude, arena_phone });
    return Promise.resolve(true);
  } catch (err) {
    console.log([fileName, 'createArena', 'ERROR'], { info: `${err}` });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
}

const addArenaImage = async (dataObject) => {
  const { arena_id, arena_img_url } = dataObject;
  try {
    await db.ArenaImage.create({ arena_id, arena_img_url });
    return Promise.resolve(true);
  } catch (err) {
    console.log([fileName, 'addArenaImage', 'ERROR'], { info: `${err}` });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
}

const getAllArena = async () => {
  try {
    const arena = await db.Arena.findAll();
    const arenaData = []
    if (_.isEmpty(arena)) {
      return Promise.reject(Boom.notFound('NO_ARENA_FOUND'));
    }
    else if (!_.isEmpty(arena)) {
      try {
        await Promise.all(arena.map(async (item) => {
          const imageObjects = await db.ArenaImage.findAll({
            where: {
              arena_id: item.arena_id
            }
          });
          const imageArray = []
          if (!_.isEmpty(imageObjects)) {
            imageObjects.map((item) => {
              imageArray.push(item.dataValues.arena_img_url)
            })
          }
          const arenaObject = {
            arena_id: item.arena_id,
            user_id: item.user_id,
            arena_name: item.arena_name,
            arena_latitude: item.arena_latitude,
            arena_longtitude: item.arena_longtitude,
            arena_phone: item.arena_phone,
            arena_img_url: imageArray
          }
          arenaData.push(arenaObject)
        }));
      } catch (error) {
        console.log(error, "FETCH ARENA IMAGE ERROR")
      }
    }
    const message = "Successfully fetched arenas."
    res = { message, arenaData }
    return Promise.resolve(res);
  } catch (err) {
    console.log([fileName, 'getAllArena', 'ERROR'], { info: `${err}` });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
}

const getOwnerArena = async (dataObject) => {
  const { user_id } = dataObject
  try {
    const arena = await db.Arena.findAll({
      where: { user_id: user_id }
    });
    const arenaData = []
    if (_.isEmpty(arena)) {
      return Promise.reject(Boom.notFound('NO_ARENA_FOUND'));
    }
    else if (!_.isEmpty(arena)) {
      try {
        await Promise.all(arena.map(async (item) => {
          const imageObjects = await db.ArenaImage.findAll({
            where: {
              arena_id: item.arena_id
            }
          });
          const imageArray = []
          if (!_.isEmpty(imageObjects)) {
            imageObjects.map((item) => {
              imageArray.push(item.dataValues.arena_img_url)
            })
          }
          const arenaObject = {
            arena_id: item.arena_id,
            user_id: item.user_id,
            arena_name: item.arena_name,
            arena_latitude: item.arena_latitude,
            arena_longtitude: item.arena_longtitude,
            arena_phone: item.arena_phone,
            arena_img_url: imageArray
          }
          arenaData.push(arenaObject)
        }));
      } catch (error) {
        console.log(error, "FETCH ARENA IMAGE ERROR")
      }
    }
    const message = "Successfully fetched arenas."
    res = { message, arenaData }
    return Promise.resolve(res);
  } catch (err) {
    console.log([fileName, 'getAllArena', 'ERROR'], { info: `${err}` });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
}

const getArenaDetails = async (dataObject) => {
  const { arena_id } = dataObject;
  let arenaData = {}
  try {
    const arena = await db.Arena.findOne({
      where: { arena_id }
    });
    if (_.isEmpty(arena)) {
      return Promise.reject(Boom.notFound('ARENA_NOT_FOUND'));
    }
    else if (!_.isEmpty(arena)) {
      try {
        const imageObjects = await db.ArenaImage.findAll({
          where: {
            arena_id: arena_id
          }
        })
        const imageArray = []
        if (!_.isEmpty(imageObjects)) {
          imageObjects.map((item) => {
            imageArray.push(item.dataValues.arena_img_url)
          })
        }
        arenaData = {
          arena_id: arena_id,
          user_id: arena.user_id,
          arena_name: arena.arena_name,
          arena_latitude: arena.arena_latitude,
          arena_longtitude: arena.arena_longtitude,
          arena_phone: arena.arena_phone,
          arena_img_url: imageArray
        }
      } catch (error) {
        console.log(error, "FETCH ARENA IMAGE ERROR")
      }
    }
    const message = "Successfully fetched arenas."
    const res = { message, arenaData }
    return Promise.resolve(res);
  } catch (err) {
    console.log([fileName, 'getArenaDetails', 'ERROR'], { info: `${err}` });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
}

const restoreArena = async (dataObject) => {
  const { arena_id } = dataObject;
  try {
    await db.Arena.restore({
      where: { arena_id }
    });
    const arena = await db.Arena.findOne({
      where: { arena_id }
    });
    if (_.isEmpty(arena)) {
      return Promise.reject(Boom.notFound('ARENA_NOT_FOUND'));
    }

    return Promise.resolve(true);
  } catch (err) {
    console.log([fileName, 'userRestore', 'ERROR'], { info: `${err}` });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
}

const deleteArena = async (dataObject) => {
  const { arena_id } = dataObject;

  try {
    const arena = await db.Arena.findOne({
      where: { arena_id }
    });
    if (_.isEmpty(arena)) {
      return Promise.reject(Boom.notFound('ARENA_NOT_FOUND'));
    }
    await db.Arena.destroy({
      where: { arena_id }
    });

    return Promise.resolve(true);
  } catch (err) {
    console.log([fileName, 'deleteArena', 'ERROR'], { info: `${err}` });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
}

module.exports = {
  createArena,
  addArenaImage,
  getAllArena,
  getArenaDetails,
  deleteArena,
  restoreArena,
  getOwnerArena
}