'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('leases', { 
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        onUpdate: "CASCADE"
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false
      },
      code_imobzi: {
        type: DataTypes.STRING, 
      },
      start_at: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      property: {
        type: DataTypes.BIGINT,
        allowNull: false, 
        references: {model: "properties", key: "id"},
        onUpdate: "CASCADE"
      },
      fee: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      guarantee_type: {
        type: DataTypes.STRING,
        allowNull: false
      },
      guarantee_value: {
        type: DataTypes.FLOAT,
      },
      annual_readjustment: {
        type: DataTypes.STRING,
      },
      irrf: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      include_in_dimob: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      indeterminate: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      lease_value: {
        type: DataTypes.FLOAT,
        allowNull: false
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
   await queryInterface.dropTable('leases');
  }
};
