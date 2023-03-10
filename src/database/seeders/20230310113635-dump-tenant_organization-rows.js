'use strict';
const tenantsPromise = require("../../../api-imobzi/tenants").getOrganizationTenants()

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) { 
    const tenantsResolved = await tenantsPromise;
    for(const index in  tenantsResolved){
      // in this case. We need to catch error, because the organizations and leases from API have already more records. 
      try{
        await queryInterface.bulkUpdate(
        'leases', 
        {"tenant_organization": tenantsResolved[index].tenant}, 
        { id: tenantsResolved[index].lease}
        );
      }catch(error){console.log(error)}
    }
  },

  async down (queryInterface, Sequelize) {
    const tenantsResolved = await tenantsPromise;
    for(const index in  tenantsResolved){ 
      await queryInterface.bulkUpdate(
        'leases', 
        {"tenant_organization": null}, 
        { id: tenantsResolved[index].lease}
      )
      };
  }
};
