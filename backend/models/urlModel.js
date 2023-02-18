const mongoose = require('mongoose');

const urlSchema = mongoose.Schema({
    longUrl: {
        type: String,
        required: true,
    },
    shortUrl: {
        type: String
    },
    qrCode: {
        type: String
    },
})

module.exports = mongoose.model('Url',urlSchema)