'use strict';
const leasesDataPromises = require('../../../api-imobzi/leases').getLeasesMainData()

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('leases', await leasesDataPromises, {});
  },

  async down (queryInterface, Sequelize) {
  await queryInterface.bulkDelete('People', null, {})
  }
};
