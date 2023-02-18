const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    originalURL: {
      type: String,
      required: true
    },
    shortID: {
      type: String,
      required: true
    },
    qr: {
        type: String,
        required: true
    }
  });

module.exports = mongoose.model('Url',urlSchema)