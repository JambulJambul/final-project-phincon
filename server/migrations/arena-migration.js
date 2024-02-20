/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Arenas',
            {
                arena_id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER
                },
                user_id: {
                    type: Sequelize.INTEGER
                },
                arena_name: {
                    type: Sequelize.STRING
                },
                arena_latitude: {
                    type: Sequelize.STRING
                },
                arena_longtitude: {
                    type: Sequelize.STRING
                },
                arena_phone: {
                    type: Sequelize.STRING
                },
                createdAt: {
                    type: Sequelize.DATE
                },
                updatedAt: {
                    type: Sequelize.DATE
                },
                deletedAt: {
                    type: Sequelize.DATE
                }
            },
            {
                paranoid: true
            }
        );
    },
    // eslint-disable-next-line no-unused-vars
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Arenas');
    }
};