'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Flight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Airplane, {
        foreignKey:'airplaneId',
        as: 'airplaneDetail'
      });
      this.belongsTo(models.Airport, {
        foreignKey:'depAirportId',
        as: 'departureAirport'
      });
      this.belongsTo(models.Airport, {
        foreignKey:'arrAirportId',
        as: 'arrivalAirport'
      });
    }
  }
  Flight.init({
    flightNumber:{
      type:  DataTypes.STRING,
      allowNull:false
    },
    airplaneId: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    depAirportId:  {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    arrAirportId:  {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    arrTime: {
      type:DataTypes.DATE,
      allowNull:false
    },
    depTime: {
      type:DataTypes.DATE,
      allowNull:false
    },
    price:  {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    boardingGate:{
      type: DataTypes.STRING,
    },
    totalSeats: {
      type: DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Flight',
    tableName: 'Flight'
  });
  return Flight;
};