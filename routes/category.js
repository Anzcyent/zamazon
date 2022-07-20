const express = require('express');
const router = express.Router();
const { get_categories } = require("../controllers/category");

router.get("/", get_categories);

module.exports = router;