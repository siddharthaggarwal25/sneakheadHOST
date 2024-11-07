const express =require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require("dotenv").config();
const app = express();
app.use(bodyParser.json());


mongoose.connect('mongodb+srv://aggarwalsiddharth49:goT3ZU4UDYDNoerP@cluster0.xnmra.mongodb.net/')
.then(()=> console.log('connected to database'))   
.catch((error)=> console.log(error));
const userRoutes= require('./routes/user-routes');
const productsRoutes=require('./routes/products-routes');
const checkoutPaymentRoutes=require('./routes/checkoutPayment-routes');
const HttpError =require('./utils/Http-Error');
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader( 'Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE ,PUT')
    next();
});
app.use(checkoutPaymentRoutes);
app.use(productsRoutes);
app.use(userRoutes);
app.use((req, res, next) => next (new HttpError('Could not find this route.', 404)));
app.use((error, req, res, next) => {1
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occurred!' });
});
app.listen(5000 ,()=> console.log("listening to port 5000"));