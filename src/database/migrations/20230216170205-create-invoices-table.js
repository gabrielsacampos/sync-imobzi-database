'use strict';

const { DataTypes } = require('sequelize');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable('invoices', { 
      id: {
        type: DataTypes.STRING,
        allowNull: true, 
        primaryKey: true
      },
      status: {
        type:DataTypes.STRING,
        allowNull: false
      },
      reference: {
        type: DataTypes.DATEONLY,
      },
      due_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      lease_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {model: "leases", key: "id"},
        onUpdate: "CASCADE"
      },
      management_fee: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      invoice_url: {
        type: DataTypes.STRING,
        allowNull: false
      },
      barcode: {
        type: DataTypes.STRING,
      },
      bank_slip_url: {
        type: DataTypes.STRING,
      },
      bank_slip_id: {
        type: DataTypes.STRING,
      },
      total_value: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      interest_value: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      paid_at: {
        type: DataTypes.DATEONLY,
      },
      paid_manual: {
        type: DataTypes.BOOLEAN
      },
      bank_fee_value: {
        type: DataTypes.FLOAT,
      },
      account_credit: {
        type: DataTypes.STRING,
      },
      onlending_value: {
        type: DataTypes.FLOAT,
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
   await queryInterface.dropTable('invoices');
  }
};
