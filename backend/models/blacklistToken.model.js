const mongoose = require('mongoose');



const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // TTL index: document will be removed 24 hours (86400 seconds) after createdAt
        expires: 86400,
    },
});



module.exports = mongoose.model('BlacklistToken', blacklistTokenSchema);