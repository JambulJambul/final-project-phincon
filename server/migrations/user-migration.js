/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users',
      {
        user_id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        user_name: {
          type: Sequelize.STRING
        },
        user_email: {
          type: Sequelize.STRING
        },
        user_img_url: {
          type: Sequelize.TEXT
        },
        user_password: {
          type: Sequelize.STRING
        },
        user_role: {
          type: Sequelize.TINYINT
        },
        user_suspension: {
          defaultValue: 1,
          type: Sequelize.TINYINT
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
    await queryInterface.dropTable('Users');
  }
};