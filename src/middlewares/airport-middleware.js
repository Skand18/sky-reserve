const { StatusCodes } = require("http-status-codes")

const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");

function validateCreateRequest ( req, res, next) {
        if(!req?.body?.name){
            ErrorResponse.message = "Something went wrong while creating airport";
            ErrorResponse.error = new AppError(['Name not found in correct form'], StatusCodes.BAD_REQUEST)
            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse)
        }
        if(!req?.body?.code){
            ErrorResponse.message = "Something went wrong while creating airport";
            ErrorResponse.error = new AppError(['Airport Code not found in correct form'], StatusCodes.BAD_REQUEST)
            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse)
        }
        if(!req?.body?.cityId){
            ErrorResponse.message = "Something went wrong while creating airport";
            ErrorResponse.error = new AppError(['City Id not found in correct form'], StatusCodes.BAD_REQUEST)
            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse)
        }
        next()
}

function validateUpdateRequest(req, res, next) {
    if (!req?.body?.address && !req?.body?.name && !req?.body?.code && !req?.body?.cityId) {
      ErrorResponse.message = "Something went wrong while updating the airport";
      ErrorResponse.error = new AppError(
        ['Missing parameters (name, code, cityId and address) found in the incoming request'],
        StatusCodes.BAD_REQUEST
      );
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    next()
}


module.exports  = {
    validateCreateRequest,
    validateUpdateRequest
}