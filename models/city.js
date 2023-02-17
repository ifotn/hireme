const mongoose = require('mongoose');

// create schema for an city document
const citySchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'City is required',
        minlength : [1,'Name is empty'],
        maxlength : [50,'Name is too long']
    }
});

module.exports = mongoose.model('City', citySchema);