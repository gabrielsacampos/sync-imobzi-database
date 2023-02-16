'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable('organizations', { 
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        onUpdate: "CASCADE"
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      cnpj: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      representative: {
        type: DataTypes.BIGINT, 
        allowNull: false,
        references: {model: "people", key: "id"},
        onUpdate: "CASCADE"
      },
      representative_type: {
        type: DataTypes.STRING,
        allowNull: false
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      address: {
        type: DataTypes.STRING
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
     await queryInterface.dropTable('organizations');
  }
};
