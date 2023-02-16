'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('people', {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        onUpdate: "CASCADE"
      },
      cpf: {
        type: DataTypes.STRING,
        allowNull: false
      },
      fullname: {
        type: DataTypes.STRING,
      },
      birthdate: {
        type: DataTypes.DATEONLY,
        defaultValue: null
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false
      },
      alternative_address: {
        type: DataTypes.STRING,
        defaultValue: null
      },
      alternative_address_reference: {
        type: DataTypes.STRING,
        defaultValue: null
      },
      gender: {
        type: DataTypes.STRING,
        defaultValue: null
      },
      marital_status: {
        type: DataTypes.STRING,
        defaultValue: null
      },
      code_imobzi: {
        type: DataTypes.STRING,
      },
      profession: {
        type: DataTypes.STRING,
      },
      children: {
        type: DataTypes.INTEGER,
        defaultValue: null
      },
      pets: {
        type: DataTypes.INTEGER,
        defaultValue: null
      },
      kind_of_pet: {
        type: DataTypes.STRING,
        defaultValue: null
      },
      anual_revenue: {
        type: DataTypes.DOUBLE,
        allowNull: true
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
    await queryInterface.dropTable('people')
  }
};
