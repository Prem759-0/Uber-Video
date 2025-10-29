const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blacklistTokenModel = require('../models/blacklistToken.model');


module.exports.authUser = async (req, res, next) => {
    const authHeader = req.headers.authorization || '';
    const bearerToken = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : undefined;
    const token = req.cookies.token || bearerToken;
    if(!token){
        return res.status(401).json({message: 'Unauthorized'})
    }

    const isBlacklisted = await blacklistTokenModel.findOne({token});

    if(isBlacklisted){
        return res.status(401).json({message: 'Unauthorized'});
    }

    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id)

        req.user = user;

        return next();
        
    } catch (err) {
         return res.status(401).json({message: 'Unauthorized'})
    }
}