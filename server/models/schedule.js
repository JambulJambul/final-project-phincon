const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Schedule extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        // eslint-disable-next-line no-unused-vars
        static associate(models) {
        }
    }
    Schedule.init({
        schedule_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        court_id: DataTypes.INTEGER,
        schedule_day: DataTypes.TINYINT,
        schedule_start: DataTypes.TIME,
        schedule_end: DataTypes.TIME,
        schedule_price: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Schedule',
    });
    return Schedule;
};