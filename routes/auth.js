const express = require('express');
const router = express.Router();
const { register, generate_access_token, logout, login, complete_profile } = require("../controllers/auth");
const get_access_to_route = require("../middlewares/auth");

router.post("/register", register);
router.get("/refresh_token", generate_access_token);
router.get("/logout", logout);
router.post("/login", login);
router.post("/complete_profile", get_access_to_route, complete_profile);


module.exports = router;