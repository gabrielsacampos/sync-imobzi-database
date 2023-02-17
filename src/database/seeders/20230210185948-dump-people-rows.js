'use strict';
require('dotenv').config()

// treated people data to store in database
const peopleMainData = require('../../../api-imobzi/people-main-data.js');




/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try{ 
     await queryInterface.bulkInsert('people', await peopleMainData, {});
    }catch (error){console.log(error)}
},

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('people', null, {});
  }
};


