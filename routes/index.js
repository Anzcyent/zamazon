const express = require('express');
const router = express.Router();

const auth = require("./auth");
const category = require("./category");
const product = require("./product");
const comment = require("./comment");
const user = require("./user");
const order = require("./order");
const search = require("./search");

router.use("/auth", auth);
router.use("/category", category);
router.use("/product", product);
router.use("/comment", comment);
router.use("/user", user);
router.use("/order", order);
router.use("/search", search);

module.exports = router;