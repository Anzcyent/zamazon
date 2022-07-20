const express = require('express');
const router = express.Router();
const { get_orders } = require("../controllers/order");
const get_access_to_route = require("../middlewares/auth");

router.get("/get_orders", get_access_to_route, get_orders);

module.exports = router;