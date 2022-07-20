const express = require('express');
const router = express.Router();
const { create_comment, get_comments, delete_comment, edit_comment } = require("../controllers/comment");
const get_access_to_route = require("../middlewares/auth");

router.post("/create_comment/:id", get_access_to_route, create_comment);
router.get("/comments/:id", get_comments);
router.delete("/delete_comment/:id", get_access_to_route, delete_comment);
router.put("/edit_comment/:id", get_access_to_route, edit_comment);


module.exports = router;