const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Arena extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        // eslint-disable-next-line no-unused-vars
        static associate(models) {
            Arena.hasMany(models.ArenaImage, {
                foreignKey: 'arena_id',
                as: 'images'
            });
        }
    }
    Arena.init({
        arena_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        user_id: DataTypes.INTEGER,
        arena_name: DataTypes.STRING,
        arena_desc: DataTypes.TEXT,
        arena_latitude: DataTypes.STRING,
        arena_longtitude: DataTypes.STRING,
        arena_phone: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Arena',
        paranoid: true
    });
    return Arena;
};