'use strict';
const tenantsPromise = require("../../../api-imobzi/tenants").getPersonTenants()

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) { 
    const tenantsResolved = await tenantsPromise;
    for(const index in  tenantsResolved){
      await queryInterface.bulkUpdate(
        'leases', 
        {"master_tenant_person": tenantsResolved[index].tenant}, 
        { id: tenantsResolved[index].lease}
      );
    }
  },

  async down (queryInterface, Sequelize) {
    const tenantsResolved = await tenantsPromise;
    for(const index in  tenantsResolved){ 
      await queryInterface.bulkDelete(
        'leases', 
        {"master_tenant_person": null}, 
        { id: tenantsResolved[index].lease}
      )
      };
  }
};
