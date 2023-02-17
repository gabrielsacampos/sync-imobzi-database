'use strict';
const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable('properties', {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false, 
        primaryKey: true,
        onUpdate: "CASCADE"
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false
      },
      active: {
        type: DataTypes.BOOLEAN, 
        allowNull: false, 
      },
      status: {
        type: DataTypes.STRING, 
        allowNull: false
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false
      },
      building: {
        type: DataTypes.STRING,
      },
      area: {
        type: DataTypes.FLOAT
      },
      bedroom: {
        type: DataTypes.INTEGER
      },
      suite: {
        type: DataTypes.INTEGER
      },
      garage: {
        type: DataTypes.INTEGER
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false
      }, 
      zipcode: {
        type: DataTypes.STRING,
        allowNull: false
      },
      rental_value: {
        type: DataTypes.FLOAT
      },
      sale_value: {
        type: DataTypes.FLOAT
      },
      alternative_id: {
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
     await queryInterface.dropTable('properties');
  }
};
