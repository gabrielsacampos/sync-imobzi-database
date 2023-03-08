'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'leases', 
      'main_guarantor', 
      { 
        type: Sequelize.BIGINT,
        references: { model: "people", key: "id"} 
      });
  },

  async down (queryInterface, Sequelize) {
     queryInterface.removeColumn('main_guarantor');
  }
};
