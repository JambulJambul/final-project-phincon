const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Court extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        // eslint-disable-next-line no-unused-vars
        static associate(models) {
        }
    }
    Court.init({
        court_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        arena_id: DataTypes.INTEGER,
        court_name: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Court',
        paranoid: true
    });
    return Court;
};