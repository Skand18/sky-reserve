const express = require('express');
const { AirPlaneController } = require('../../controllers');
const router = express.Router();

// /air/v1/airplanes POST 
router.post('/', AirPlaneController.createAirplane)

module.exports = router;