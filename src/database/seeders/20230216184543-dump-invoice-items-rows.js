'use strict';
const allItems = require('../../../api-imobzi/invoices-and-items').getAllItems()


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('invoice_items', await allItems, {});
  
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('invoice_items', null, {});
  }
};
