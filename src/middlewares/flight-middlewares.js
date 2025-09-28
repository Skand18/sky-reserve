const { StatusCodes } = require("http-status-codes")

const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");

function validateCreateRequest ( req, res, next) {
        if(!req?.body?.flightNumber){
            ErrorResponse.message = "Something went wrong while creating flight";
            ErrorResponse.error = new AppError(['Flight number not found '], StatusCodes.BAD_REQUEST)
            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse)
        }
        if(!req?.body?.airplaneId){
            ErrorResponse.message = "Something went wrong while creating flight";
            ErrorResponse.error = new AppError(['Airplane Id not found '], StatusCodes.BAD_REQUEST)
            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse)
        }
        if(!req?.body?.depAirportId){
            ErrorResponse.message = "Something went wrong while creating flight";
            ErrorResponse.error = new AppError(['Departure Airport Id not found '], StatusCodes.BAD_REQUEST)
            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse)
        }
        if(!req?.body?.arrAirportId){
            ErrorResponse.message = "Something went wrong while creating flight";
            ErrorResponse.error = new AppError(['Arrival Airport Id not found '], StatusCodes.BAD_REQUEST)
            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse)
        }
        if(!req?.body?.arrTime){
            ErrorResponse.message = "Something went wrong while creating flight";
            ErrorResponse.error = new AppError(['Arrival Time  not found '], StatusCodes.BAD_REQUEST)
            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse)
        }
        if(!req?.body?.depTime){
            ErrorResponse.message = "Something went wrong while creating flight";
            ErrorResponse.error = new AppError(['Departure Time not found '], StatusCodes.BAD_REQUEST)
            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse)
        }
        if(!req?.body?.price){
            ErrorResponse.message = "Something went wrong while creating flight";
            ErrorResponse.error = new AppError(['Price not found '], StatusCodes.BAD_REQUEST)
            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse)
        }
        if(!req?.body?.totalSeats){
            ErrorResponse.message = "Something went wrong while creating flight";
            ErrorResponse.error = new AppError(['Total Seats not found '], StatusCodes.BAD_REQUEST)
            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse)
        }
        next()
}


module.exports  = {
    validateCreateRequest
}