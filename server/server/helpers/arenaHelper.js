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
    console.log([fileName, 'createArena', 'ERROR'], { info: `${err}` });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
}

const getAllArena = async () => {
  try {
    const arena = await db.Arena.findAll();
    const res = []
    if (!_.isEmpty(arena)) {
      try {
        await Promise.all(arena.map(async (item) => {
          const imageObjects = await db.ArenaImage.findAll({
            where: {
              arena_id: item.arena_id
            }
          });
          const arenaObject = {
            arena_id: item.arena_id,
            user_id: item.user_id,
            arena_name: item.arena_name,
            arena_latitude: item.arena_latitude,
            arena_longtitude: item.arena_longtitude,
            arena_phone: item.arena_phone,
            arena_images: imageObjects
          }
          res.push(arenaObject)
        }));
      } catch (error) {
        console.log(error, "FETCH ARENA IMAGE ERROR")
      }
    }
    return Promise.resolve(res);
  } catch (err) {
    console.log([fileName, 'createArena', 'ERROR'], { info: `${err}` });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
}

module.exports = {
  createArena,
  addArenaImage,
  getAllArena
}