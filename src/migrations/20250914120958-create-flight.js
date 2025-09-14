'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Flight', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      flightNumber: {
        type: Sequelize.STRING,
        allowNull:false
      },
      airplaneId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model: 'Airplane',
          key:'id'
        },
        onDelete:'CASCADE'
      },
      depAirportId: {
        type: Sequelize.STRING,
        allowNull:false,
        references:{
          model: 'Airport',
          key:'code'
        },
        onDelete:'CASCADE'
      },
      arrAirportId: {
        type: Sequelize.STRING,
        allowNull:false,
        references:{
          model: 'Airport',
          key:'code'
        },
        onDelete:'CASCADE'
      },
      arrTime: {
        type: Sequelize.DATE,
        allowNull:false
      },
      depTime: {
        type: Sequelize.DATE,
        allowNull:false
      },
      price: {
        type: Sequelize.INTEGER
      },
      boardingGate: {
        type: Sequelize.STRING
      },
      totalSeats: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Flight');
  }
};