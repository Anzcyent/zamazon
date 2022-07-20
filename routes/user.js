const express = require('express');
const router = express.Router();
const { get_user, edit_profile, purchase, read_notifications, show_notification } = require("../controllers/user");
const get_access_to_route = require("../middlewares/auth");

router.get("/get_user/:id", get_user);
router.put("/edit_profile", get_access_to_route, edit_profile);
router.post("/purchase", get_access_to_route, purchase);
router.get("/read_notifications", get_access_to_route, read_notifications);
router.get("/show_notification/:id", get_access_to_route, show_notification);

module.exports = router;