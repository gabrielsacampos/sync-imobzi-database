'use strict';
const owners = require('../../../api-imobzi/owners').getOwners();

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('owners', await owners, {});
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('owners', null, {});
  }
};
