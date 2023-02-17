'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
      await queryInterface.createTable('invoice_items', { 
       id: {
         type: DataTypes.STRING,
         allowNull: false, 
         primaryKey: true
       },
       invoice_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {model: "invoices", key: "id" },
        onUpdate: "CASCADE"
       },
       description: {
        type: DataTypes.STRING,
        allowNull: false
       },
       behavior: {
        type: DataTypes.STRING,
        allowNull: false
       },
       include_in_dimob: {
        type: DataTypes.BOOLEAN,
        allowNull: false
       },
       management_fee: {
        type: DataTypes.BOOLEAN,
        allowNull: false
       },
       value: {
        type: DataTypes.FLOAT,
        allowNull: false,
       },
       created_at:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW")
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW")
      }
    })
  },
 
   async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('invoice_items');
   }
 };