const express = require('express');
const router = express.Router();
const checkoutPaymentControllers= require('../controllers/checkoutPayment-controllers');
const userAuthMiddleware= require('../middleware/user-auth');

router.post("/order",userAuthMiddleware, checkoutPaymentControllers.MakeOrder);  

router.post("/order/validate",userAuthMiddleware,  checkoutPaymentControllers.ValidateOrderPayment);

module.exports =router;