const mongoose = require('mongoose');

const ShoeSchema = new mongoose.Schema(  
        {
            name:String ,
            brand: String,
            gender: String,
            category:String,
            imageURL :String,
            price:String
        }
)

module.exports = mongoose.model('Shoes' , ShoeSchema);