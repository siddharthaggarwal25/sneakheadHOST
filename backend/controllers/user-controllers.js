const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const mailService = require("../services/mailer");
const MailTemplates = require("../services/mailTemplate");
const nodemailer = require("nodemailer");
const HttpError = require("../utils/Http-Error");
const Shoes = require("../models/products");
const User = require("../models/User");

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  let Name = req.body.Name;
  let Email = req.body.Email;
  let Address = req.body.Address;
  let Number = req.body.Number;
  let Password = req.body.Password;

  let existingUser;
  try {
    existingUser = await User.findOne({ Email: Email });
  } catch (error) {
    return next(new HttpError("signning up failed try again later", 500));
  }

  if (existingUser) {
    return next(new HttpError("User already exist try again later", 422));
  }

  let hashPassword;
  try {
    hashPassword = await bcrypt.hash(Password, 12);
  } catch (error) {
    return next(new HttpError("Could not create user , try again later ", 500));
  }

  const createUser = new User({
    Name: Name,
    Email: Email,
    Address: Address,
    Number: Number,
    Password: hashPassword,
  });
  let newUser;
  try {
    newUser = await createUser.save();
  } catch (error) {
    return next(new HttpError("Signning up failed try again later ", 500));
  }

  let token;
  try {
    token = jwt.sign({ UserId: createUser._id }, "siddharth", {
      expiresIn: "1h",
    });
  } catch (err) {
    return next(new HttpError("signning up failed try again later ", 500));
  }

  const message = {
    from: "fakeuseruser540@gmail.com",
    to: Email,
    subject: "Thanks for Signing up ",
    html: MailTemplates.SignUpMail(Name),
  };
  const transporter = mailService.ConfigMail();

  transporter
    .sendMail(message)
    .then(() => {
      return res.status(201).json({
        status: "success",
        message: "Mail sent successfully",
        Email: Email,
        Token: token,
        UserId: createUser._id,
      });
    })
    .catch(async (error) => {
      console.log(error);
    });
  res.status(201).json({
    Token: token,
    UserId: createUser._id,
  });
};

const login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  let Email = req.body.Email;
  let Password = req.body.Password;

  let existingUser;
  try {
    existingUser = await User.findOne({ Email: Email });
  } catch (error) {
    return next(new HttpError("Logging up failed try agin later ", 500));
  }

  if (!existingUser) {
    return next(new HttpError("wrong credentials", 422));
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(Password, existingUser.Password);
  } catch (err) {
    return next(
      new HttpError(
        "Could not log you in, please check your credentials and try again.",
        500
      )
    );
  }

  if (!isValidPassword) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      403
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign({ UserId: existingUser._id }, "siddharth", {
      expiresIn: "1h",
    });
  } catch (err) {
    return next(new HttpError("signning up failed try again later ", 500));
  }

  res.json({
    UserId: existingUser._id,
    Token: token,
  });
};

const getUser = async (req, res, next) => {

  const userId = req.userData.userId;
  let user;
  try {
    user = await User.findById(userId);
  } catch (error) {
    return next(new HttpError("can not get user , try again later ", 402));
  }
  if (!user) {
    return next(new HttpError("can not find user try agin later ", 404));
  }
console.log(user);
  res.json(user);
};

const updateUserProduct = async (req, res, next) => {
 
  const userId = req.userData.userId;
  const productId = req.params.pid;

  let user;
  let product;
  try {
    user = await User.findById(userId);
    product = await Shoes.findById(productId);
  } catch {
    return next(new HttpError("error occured try again later ", 404));
  }
  if (!user) {
    return next(new HttpError("error occured try agian later ", 404));
  }
  if (!product) {
    return next(new HttpError("error occured try agian later ", 404));
  }
  
  user.Cart = [...user.Cart, product];
  try {
    await user.save();
  } catch (error) {
    return next(new HttpError("error occured ", 404));
  }
  res.json("successfully added to cart");
};

const deleteUserProduct = async (req, res, next) => {
  const userId = req.userData.userId;
  let productId = req.params.pid;
  let user;
  let product;
  try {
    user = await User.findById(userId);
    product = await Shoes.findById(productId);
  } catch (error) {
    return next(new HttpError("error occured try again later ", 404));
  }

  if (!user) {
    return next(new HttpError("error occured try again later", 404));
  }

  if (!product) {
    return next(new HttpError("error occured try agian later ", 404));
  }

  let list = [];
  let check = true;
  for (items of user.Cart) {
    if (items._id == productId && check) {
      check = false;
    } else {
      list.push(items);
    }
  }
  user.Cart = [...list];
  try {
    await user.save();
  } catch (error) {
    return next(new HttpError("error occur in deleting item from cart", 404));
  }
  res.json(user);
};

exports.signup = signup;
exports.login = login;
exports.getUser = getUser;
exports.updateUserProduct = updateUserProduct;
exports.deleteUserProduct = deleteUserProduct;
