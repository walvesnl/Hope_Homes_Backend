"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("conversations", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      hostName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      hostImage: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      seekerName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      seekerImage: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("conversations");
  },
};
