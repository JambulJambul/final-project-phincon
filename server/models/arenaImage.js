const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ArenaImage extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        // eslint-disable-next-line no-unused-vars
        static associate(models) {
            ArenaImage.belongsTo(models.Arena, {
                foreignKey: 'arena_id'
            });
        }
    }
    ArenaImage.init({
        arena_img_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        arena_id: DataTypes.INTEGER,
        arena_img_url: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'ArenaImage',
        tableName: 'arena_images'
    });
    return ArenaImage;
};