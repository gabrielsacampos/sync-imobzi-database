'use strict';
const guarantorsPromise = require("../../../api-imobzi/guarantors").getGuarantors()

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) { 
    const guarantorsResolved = await guarantorsPromise;
    for(const index in  guarantorsResolved){
      // in this case. We need to catch error, because the organizations and leases from API have already more records. 
      try{
        await queryInterface.bulkUpdate(
        'leases', 
        {"main_guarantor": guarantorsResolved[index].guarantor}, 
        { id: guarantorsResolved[index].lease}
        );
      }catch(error){console.log(error)}
    }
  },

  async down (queryInterface, Sequelize) {
    const guarantorsResolved = await guarantorsPromise;
    for(const index in  guarantorsResolved){ 
      await queryInterface.bulkUpdate(
        'leases', 
        {"main_guarantor": null}, 
        { id: guarantorsResolved[index].lease}
      )
      };
  }
};
