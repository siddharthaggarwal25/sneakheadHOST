const Shoes = require("../models/products");
const HttpError = require("../utils/Http-Error");

const allProducts = async (req, res, next) => {
  let products;
  try {
    products = await Shoes.find();
  } catch (err) {
    return next(new HttpError("could not found Shoes", 404));
  }
  res.json(products);
};

const productById = async (req, res, next) => {
  const id = req.params.pid;
  let shoe;
  try {
    shoe = await Shoes.findById(id);
  } catch (err) {
    return next(new HttpError("Can not find particular shoes", 404));
  }
  if (!shoe) {
    return next(new HttpError("can not find particular sneakers", 404));
  }
  res.json(shoe);
};

const filteredProducts = async (req, res, next) => {
  const filters = req.body;
  const query = {};

  Object.keys(filters).forEach((key) => {
    if (filters[key].length > 0) {
      query[key] = { $in: filters[key] };
    }
  });
  try {
    let response = await Shoes.find(query);
    res.json(response);
  } catch (error) {
    return next(new HttpError("error occured try again", 404));
  }
};

exports.allProducts = allProducts;
exports.productById = productById;
exports.filteredProducts = filteredProducts;
