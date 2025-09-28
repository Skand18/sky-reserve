const { StatusCodes } = require("http-status-codes");
const { FlightService } = require("../services");

const {SuccessResponse, ErrorResponse} = require("../utils/common")

async function createFlight (req, res){
    try {
        console.log("reqBody", req.body)
        const flight = await FlightService.createFlight({
            flightNumber: req.body.flightNumber,
            airplaneId: req.body.airplaneId,
            depAirportId: req.body.depAirportId,
            arrAirportId: req.body.arrAirportId,
            arrTime: req.body.arrTime,
            depTime: req.body.depTime,
            price: req.body.price,
            boardingGate: req.body.boardingGate,
            totalSeats: req.body.totalSeats

        })  
        SuccessResponse.data = flight;
        SuccessResponse.message = "Successfully created an flight";
        return res.status(StatusCodes.CREATED).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse)
    }
}

module.exports = {
    createFlight
}