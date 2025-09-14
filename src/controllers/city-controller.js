const { StatusCodes } = require("http-status-codes");
const { CityService } = require("../services");

const {SuccessResponse, ErrorResponse} = require("../utils/common");


async function createCity (req, res){
    try {
        console.log("reqBody", req.body)
        const city = await CityService.createCity({
            name: req.body.name,
        })
        SuccessResponse.data = city;
        SuccessResponse.message = "Successfully created n city";
        return res.status(StatusCodes.CREATED).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse)
    }
}

async function deleteCity(req, res) {
    try {
        const id = req.params.id;
        const deleteCity = await CityService.deleteCity(id);
        SuccessResponse.data = deleteCity;
        SuccessResponse.message = "Successfully deleted a city";
        return res.status(StatusCodes.OK).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse)
    }
}

async function updateCity(req,res) {
    try {
        const id = req.params.id;
        const data = req.body;
        const updateCity = await CityService.updateCity(id, data);
        SuccessResponse.data = updateCity;
        return res.status(StatusCodes.OK).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse)
    } 
}

module.exports = {
    createCity,
    deleteCity,
    updateCity
}