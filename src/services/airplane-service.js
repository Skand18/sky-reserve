const { StatusCodes } = require("http-status-codes");
const {AirplaneRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');

 const airplaneRepository = new AirplaneRepository();

 async function createAirplane(data) {
    try {
        const airplane = await airplaneRepository.create(data);
        return airplane;
    } catch (error) {
        if(error.name === "SequelizeValidationError"){
            let explanation = [];
            error.errors.forEach((err)=>{
                explanation.push(err.message)
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST)
        }
        throw new AppError("Error for sequelize database", StatusCodes.INTERNAL_SERVER_ERROR)
    }
 }

 async function  getAirplanes(){
    try {
        const airplanes = await airplaneRepository.getAll();
        return airplanes;
    } catch (error) {
        throw new AppError("Cannot fetch data of all the airplanes", StatusCodes.INTERNAL_SERVER_ERROR)
    }
 }

 async function getAirplane(id) {
    try {
        const airplane = await airplaneRepository.get(id);
        return airplane;
    } catch (error) {
        if(error.statusCode === StatusCodes.NOT_FOUND){
            throw new AppError("The airplane you requested isn't present", error.statusCode)
        }
        throw new AppError(`Cannot fetch data for airplane with id${id}`, StatusCodes.INTERNAL_SERVER_ERROR)
    }
 }

 async function deleteAirplane(id) {
    try {
        const destroyAirplane = await airplaneRepository.destroy(id);
        return destroyAirplane;
    } catch (error) {
        if(error.statusCode === StatusCodes.NOT_FOUND){
            throw new AppError("The airplane you are trying to delete isn't present", error.statusCode)
        }
        throw new AppError(`Cannot delete airplane with id${id}`,StatusCodes.INTERNAL_SERVER_ERROR);
    }
 }

 async function updatAirplane(id, data){
    try {
        const updatedAirplane = await airplaneRepository.update(id, data);
        return updatedAirplane;
    } catch (error) {
        if(error.name === "SequelizeValidationError"){
            let explanation = [];
            error.errors.forEach((err)=>{
                explanation.push(err.message)
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST)
        }
        else if(error.statusCode === StatusCodes.NOT_FOUND){
            throw new AppError("The airplane you are trying to update isn't present", error.statusCode)
        }
        
        throw new AppError(`Cannot update airplane with id${id}`,StatusCodes.INTERNAL_SERVER_ERROR);
    }
 }

 module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane,
    deleteAirplane,
    updatAirplane
 }
