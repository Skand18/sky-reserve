const express = require('express');
const { AirplaneController } = require('../../controllers');
const { AirplaneMiddleware } = require('../../middlewares')
const router = express.Router();

// /air/v1/airplanes POST 
router.post('/', AirplaneMiddleware.validateCreateRequest, AirplaneController.createAirplane)
// /air/v1/airplanes GET
router.get('/', AirplaneController.getAirplanes)

module.exports = router;