const { StatusCodes } = require("http-status-codes");
const { AirplaneService } = require("../services");

const {SuccessResponse, ErrorResponse} = require("../utils/common")

async function createAirplane (req, res){
    try {
        console.log("reqBody", req.body)
        const airplane = await AirplaneService.createAirplane({
            modelNumber: req.body.modelNumber,
            capacity: req.body.capacity
        })
        SuccessResponse.data = airplane;
        SuccessResponse.message = "Successfully created an airplane";
        return res.status(StatusCodes.CREATED).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse)
    }
}

async function getAirplanes (req, res) {
    try {
        const airplanes = await AirplaneService.getAirplanes();
        SuccessResponse.data = airplanes;
        return res.status(StatusCodes.OK).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

async function getAirplane(req,res) {
    try {
        const id = req.params.id;
        const airplane = await AirplaneService.getAirplane(id);
        SuccessResponse.data = airplane;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

async function deleteAirplane(req,res) {
    try{
        const id = req.params.id;
        const destroy = await AirplaneService.deleteAirplane(id);
        SuccessResponse.data = destroy;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    }catch(error){
        ErrorResponse.error= error;
        return res.status(error.statusCode).json(ErrorResponse);
    }  
}

async function updateAirplane(req, res) {
    try {
        const id = req.params.id;
        const data = req.body;
        const updatedAirplane = await AirplaneService.updatAirplane(id,data);
        SuccessResponse.data = updatedAirplane;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane,
    deleteAirplane,
    updateAirplane
}