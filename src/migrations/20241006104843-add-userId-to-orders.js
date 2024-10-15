"use strict";

/** @type {import('sequelize-cli').Migration} */
"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add userId column to orders table, allowing NULL values temporarily
    // await queryInterface.addColumn("orders", "userId", {
    //   type: Sequelize.INTEGER,
    //   allowNull: true, // Temporarily allow NULL values
    //   references: {
    //     model: "users",
    //     key: "id",
    //   },
    //   onUpdate: "CASCADE",
    //   onDelete: "SET NULL",
    // });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the userId column
    // await queryInterface.removeColumn("orders", "userId");
  },
};
