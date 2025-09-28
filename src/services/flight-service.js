const { StatusCodes } = require("http-status-codes");
const {FlightRepository } = require('../repositories');
const { dateTimeHelper } = require('../utils/')
const { Op } = require( 'sequelize');
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

 async function getAllFlights(query) {
    try {
        let customFilter = {};
        let sortFilter = [];
        if(query.trips){
            [depAirportId, arrAirportId] = query.trips.split('-');
            customFilter.depAirportId = depAirportId;
            customFilter.arrAirportId = arrAirportId;
        }
        if(query.price){
            [minPrice , maxPrice] = query.price.split('-');
            customFilter.price = {
                [Op.between] : [minPrice, ((maxPrice == undefined)?20000 : maxPrice)]
            }
        }
        if(query.travellers){
            customFilter.totalSeats = {
                [Op.gte]: query.travellers
            }
        }
        if(query.tripDate){
            const startOfDay = new Date(`${query.tripDate}T00:00:00.000Z`);
            const endOfDay   = new Date(`${query.tripDate}T23:59:59.999Z`);
            
            customFilter.depTime = {
                [Op.between]: [startOfDay, endOfDay]
            };
        }
        if(query.sort){
            const params = query.sort.split(',');
            const sortFilters = params.map((param)=> param.split('_'));
            sortFilter = sortFilters;
        }
        const flights = await flightRepository.getAllFlights(customFilter,sortFilter);
        return flights;
    } catch (error) {
        throw new AppError('Cannot fetch data of all the flights', StatusCodes.INTERNAL_SERVER_ERROR);
    }
 }

 module.exports = {
    createFlight,
    getAllFlights
 }
