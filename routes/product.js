const express = require('express');
const router = express.Router();
const { get_products,
    get_products_by_category_name,
    get_product,
    get_random_product,
    get_other_products,
    create_product,
    increase_view_count,
    rate_product,
    edit_product,
    delete_product
} = require("../controllers/product");
const get_access_to_route = require("../middlewares/auth");

router.get("/", get_products);
router.get("/:category", get_products_by_category_name);
router.get("/get_product/:id", get_product);
router.get("/get_random_product/:id", get_random_product);
router.get("/get_other_products/:id", get_other_products);
router.post("/create_product", get_access_to_route, create_product);
router.post("/increase_view_count/:id", get_access_to_route, increase_view_count);
router.post("/rate_product/:id", get_access_to_route, rate_product);
router.put("/edit_product/:id", get_access_to_route, edit_product);
router.delete("/delete_product/:id", get_access_to_route, delete_product);

module.exports = router;