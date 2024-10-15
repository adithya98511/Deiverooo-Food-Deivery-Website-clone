"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add the userId column as nullable initially
    await queryInterface.addColumn("orders", "userId", {
      type: Sequelize.INTEGER,
      allowNull: true, // Make it nullable initially
      references: {
        model: "users", // Reference to the users table
        key: "id",
      },
      onDelete: "CASCADE",
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the column if the migration is rolled back
    await queryInterface.removeColumn("orders", "userId");
  },
};
