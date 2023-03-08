'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'leases', 
      'master_tenant_person', 
      { 
        type: Sequelize.BIGINT,
        references: { model: "people", key: "id"} 
      });
  },

  async down (queryInterface, Sequelize) {
     queryInterface.removeColumn('master_tenant_person');
  }
};
