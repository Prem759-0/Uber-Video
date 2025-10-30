const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.services');
const {validationResult} = require('express-validator');

module.exports.registerCaptain = async (req, res, next) => {
      try {
        console.log('Request body:', JSON.stringify(req.body, null, 2));
        const errors = validationResult(req);
        if(!errors.isEmpty()){
          console.log('Validation errors:', errors.array());
          return res.status(400).json({message: "Captain already exist"});
        }

        const {fullname, email, password, vehicle} = req.body;

        const isCaptainAlreadyExist = await captainModel.findOne({email});

        if(isCaptainAlreadyExist){
          return res.status(400).json({message: 'Captain already exist'});
        }

        const hashedPassword = await captainModel.hashPassword(password);

        const captain = await captainService.createCaptain({
          firstname: fullname.firstname,
          lastname: fullname.lastname,
          email,
          password: hashedPassword,
          color: vehicle.color,
          plate: vehicle.plate,
          capacity: vehicle.capacity,
          vehicleType: vehicle.vehicleType
        });

        const token = captain.generateAuthToken();

        res.status(201).json({token, captain});
      } catch (error) {
        next(error);
      }
}