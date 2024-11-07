const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    Number: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Cart : [] , 
    Orders : []
});

module.exports = mongoose.model('User', userSchema);