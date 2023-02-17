'use strict';
const allInvoices = require('../../../api-imobzi/invoices-and-items').getInvoicesDetails()

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('invoices', await allInvoices, {});
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('invoices', null, {});
  }
};
