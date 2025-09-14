'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Airport', {
      fields: ['cityId'],
      type: 'FOREIGN KEY',
      name: 'city_fk_constraint',
      references:{
        table:'City',
        field:'id'
      },
    onDelete: 'CASCADE'
    });
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.removeConstraint('Airport','city_fk_constraint')
  }
};