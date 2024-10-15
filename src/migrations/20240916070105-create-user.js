"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Example: Create a users table
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "user",
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Example: Drop the users table
    await queryInterface.dropTable("users");
  },
};
