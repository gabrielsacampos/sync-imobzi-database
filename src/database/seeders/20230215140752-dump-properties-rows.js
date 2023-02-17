'use strict';

const propertiesData = require('../../../api-imobzi/properties').getPropertiesMainData()

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('properties', await propertiesData, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('properties', null, {});
  }
};
