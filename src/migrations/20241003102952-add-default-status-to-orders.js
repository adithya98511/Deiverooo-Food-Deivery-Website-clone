"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("orders", "status", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "pending", // Add the default value for 'status'
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revert the change if migration is rolled back
    await queryInterface.changeColumn("orders", "status", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null, // Remove the default value
    });
  },
};
