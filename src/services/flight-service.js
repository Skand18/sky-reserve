const { StatusCodes } = require("http-status-codes");
const {FlightRepository } = require('../repositories');
const { dateTimeHelper } = require('../utils/')
const AppError = require('../utils/errors/app-error');

 const flightRepository = new FlightRepository();

 async function createFlight(data) {
    try {
        if(!dateTimeHelper.compareTime(data.arrTime, data.depTime)){
            throw new AppError('Departure time cannot be lesser than arrival time', StatusCodes.BAD_REQUEST);
        }
        const flight = await flightRepository.create(data);
        return flight;
    } catch (error) {
        if(error.name === "SequelizeValidationError"){
            let explanation = [];
            error.errors.forEach((err)=>{
                explanation.push(err.message)
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST)
        }
        if (error.statusCode == StatusCodes.BAD_REQUEST) {
            throw new AppError(
              "Departure time cannot be lesser than arrival time",
              StatusCodes.BAD_REQUEST
            );
          }
        throw new AppError("Cannot create a new flight", StatusCodes.INTERNAL_SERVER_ERROR)
    }
 }

 module.exports = {
    createFlight,
 }
