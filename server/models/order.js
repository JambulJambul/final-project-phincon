const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        // eslint-disable-next-line no-unused-vars
        static associate(models) {
        }
    }
    Order.init({
        order_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        user_id: DataTypes.INTEGER,
        schedule_id: DataTypes.INTEGER,
        order_date: DataTypes.DATEONLY,
    }, {
        sequelize,
        modelName: 'Order',
        paranoid: true
    });
    return Order;
};