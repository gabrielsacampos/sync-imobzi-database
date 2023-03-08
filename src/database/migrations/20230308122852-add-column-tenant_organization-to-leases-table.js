'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'leases', 
      'tenant_organization', 
      { 
        type: Sequelize.BIGINT,
        references: { model: "organizations", key: "id"} 
      });
  },

  async down (queryInterface, Sequelize) {
     queryInterface.removeColumn('tenant_organization');
  }
};
