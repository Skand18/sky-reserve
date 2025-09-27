const { StatusCodes } = require("http-status-codes");
const {AirportRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');

 const airportRepository = new AirportRepository();

 async function createAirport(data) {
    try {
        const airport = await airportRepository.create(data);
        return airport;
    } catch (error) {
        if(error.name === "SequelizeValidationError"){
            let explanation = [];
            error.errors.forEach((err)=>{
                explanation.push(err.message)
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST)
        }
        throw new AppError("Cannot create a new airport", StatusCodes.INTERNAL_SERVER_ERROR)
    }
 }

 async function getAirports(){
    try {
        const airports = await airportRepository.getAll();
        return airports;
    } catch (error) {
        throw new AppError("Cannot fetch data of all the airpots", StatusCodes.INTERNAL_SERVER_ERROR)
    }
 }

 async function getAirport(id) {
    try {
        const airport = await airportRepository.get(id);
        return airport;
    } catch (error) {
        if(error.statusCode === StatusCodes.NOT_FOUND){
            throw new AppError("The airport you requested isn't present", error.statusCode)
        }
        throw new AppError(`Cannot fetch data for airport with id${id}`, StatusCodes.INTERNAL_SERVER_ERROR)
    }
 }

 async function deleteAirport(id) {
    try {
        const destroyairport = await airportRepository.destroy(id);
        return destroyairport;
    } catch (error) {
        if(error.statusCode === StatusCodes.NOT_FOUND){
            throw new AppError("The airport you are trying to delete isn't present", error.statusCode)
        }
        throw new AppError(`Cannot delete airport with id${id}`,StatusCodes.INTERNAL_SERVER_ERROR);
    }
 }

 async function updateAirport(id, data){
    try {
        const updatedAirport = await airportRepository.update(id, data);
        return updatedAirport;
    } catch (error) {
        if(error.name === "SequelizeValidationError"){
            let explanation = [];
            error.errors.forEach((err)=>{
                explanation.push(err.message)
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST)
        }
        else if(error.statusCode === StatusCodes.NOT_FOUND){
            throw new AppError("The airport you are trying to update isn't present", error.statusCode)
        }
        
        throw new AppError(`Cannot update airport with id${id}`,StatusCodes.INTERNAL_SERVER_ERROR);
    }
 }

 module.exports = {
    createAirport,
    getAirports,
    getAirport,
    deleteAirport,
    updateAirport
 }
