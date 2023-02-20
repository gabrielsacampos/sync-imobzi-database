'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.createTable('owners', { 
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      onUpdate: "CASCADE"
    },
    id_property: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {model: "properties", key: "id"},
      onUpdate: "CASCADE"
    },
    id_owner_person: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: 
        { model: "people", key: "id" }, 
    },
    id_owner_organization: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: 
        { model: "organizations", key: "id"}
    },
    share: {
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
   await queryInterface.dropTable('owners');
  }
};


