const { StatusCodes } = require("http-status-codes");
const { AirportService } = require("../services");

const {SuccessResponse, ErrorResponse} = require("../utils/common")

async function createAirport (req, res){
    try {
        console.log("reqBody", req.body)
        const   airport = await AirportService.createAirport({
            name: req.body.name,
            code: req.body.code,
            address: req.body.address,
            cityId: req.body.cityId
        })
        SuccessResponse.data = airport;
        SuccessResponse.message = "Successfully created an airport";
        return res.status(StatusCodes.CREATED).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse)
    }
}

async function getAirports(req, res) {
    try {
        const airports = await AirportService.getAirports();
        SuccessResponse.data = airports;
        return res.status(StatusCodes.OK).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

async function getAirport(req,res) {
    try {
        const id = req.params.id;
        const airports = await AirportService.getAirports(id);
        SuccessResponse.data = airports;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

async function deleteAirport(req,res) {
    try{
        const id = req.params.id;
        const destroy = await AirportService.deleteAirport(id);
        SuccessResponse.data = destroy;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    }catch(error){
        ErrorResponse.error= error;
        return res.status(error.statusCode).json(ErrorResponse);
    }  
}

async function updateAirport(req, res) {
    try {
        const id = req.params.id;
        const data = req.body;
        const updatedAirport = await AirportService.updatAirport(id,data);
        SuccessResponse.data = updatedAirport;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

module.exports = {
    createAirport,
    getAirports,
    getAirport,
    deleteAirport,
    updateAirport
}