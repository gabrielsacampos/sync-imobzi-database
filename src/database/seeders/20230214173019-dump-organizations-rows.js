'use strict';

const organizationsMainData = require('../../../api-imobzi/organizations-main-data')


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try{
      await queryInterface.bulkInsert('organizations', await organizationsMainData, {});
    }catch(error){ console.log(error) }
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('organizations', null, {});
  }
};
