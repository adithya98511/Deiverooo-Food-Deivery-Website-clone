"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Alter the 'status' column to include the ENUM with new values
    await queryInterface.changeColumn("orders", "status", {
      type: Sequelize.ENUM("pending", "completed", "canceled"), // Define your enum here
      allowNull: false,
      defaultValue: "pending",
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revert the 'status' column to its previous state if needed
    await queryInterface.changeColumn("orders", "status", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "pending",
    });
  },
};
