const { StatusCodes } = require("http-status-codes");
const {CityRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');

const cityRepository = new CityRepository();

async function createCity(data) {
    try {
        const city = await cityRepository.create(data);
        return city;
    } catch (error) {
        if(error.name === "SequelizeValidationError"|| error.name === "SequelizeUniqueConstraintError"){
            let explanation = [];
            error.errors.forEach((err)=>{
                explanation.push(err.message)
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST)
        }
        throw new AppError("Error for create city", StatusCodes.INTERNAL_SERVER_ERROR)
    }
 }

 async function deleteCity(id) {
    try {
        const deleteCity = await cityRepository.destroy(id);
        return deleteCity;
    } catch (error) {
        if(error.statusCode === StatusCodes.NOT_FOUND){
            throw new AppError("The city you are trying to delete isn't present", error.statusCode)
        }
        throw new AppError(`Cannot delete city with id ${id}`, StatusCodes.INTERNAL_SERVER_ERROR)
    }
 }

 async function updateCity(id, data) {
    try {
        const updateCity = await cityRepository.update(id, data);
        return updateCity;
    } catch (error) {
        console.log("error in udpateCity service", error)
        if(error.statusCode === StatusCodes.NOT_FOUND){
            throw new AppError("The city you are trying to update isn't present", error.statusCode)
        }
        throw new AppError(`Cannot update city with id ${id}`, StatusCodes.INTERNAL_SERVER_ERROR)
    } 
 }

 module.exports = {
    createCity,
    deleteCity,
    updateCity
 }