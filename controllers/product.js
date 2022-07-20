const User = require("../schemas/User");
const Product = require("../schemas/Product");
const Category = require("../schemas/Category");
const winston = require("winston");
const flCapital = require("../utils/flCapital");

const get_products = async (req, res) => {
    try {
        const products = await Product.find().populate({ path: "seller", select: "full_name" });
        return res.status(200).json({ products });
    } catch (err) {
        winston.log("info", err.message);
        return res.status(500).json({ msg: err.message });
    }
}

const get_products_by_category_name = async (req, res) => {
    try {
        const { category } = req.params;
        const products = await Product.find({ category });

        if (products.length === 0) return res.status(404).json({ msg: "Category not found!" });

        return res.status(200).json({ products });
    } catch (err) {
        winston.log("info", err.message);
        return res.status(500).json({ msg: err.message });
    }
}

const get_product = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id).populate({ path: "seller", select: "full_name" });
        if (!product) return res.status(404).json({ msg: 'Product not found' });

        return res.status(200).json({ product });
    } catch (err) {
        winston.log("info", err.message);
        return res.status(500).json({ msg: err.message });
    }
}

const get_random_product = async (req, res) => {
    try {
        const { category } = req.query;
        const current_product_id = req.params.id

        const products = await Product.find({ category });
        const filtered_products = products.filter(p => String(p._id) !== String(current_product_id));

        const product = filtered_products[Math.floor(Math.random() * filtered_products.length)]

        return res.status(200).json({ product });
    } catch (err) {
        winston.log("info", err.message);
        return res.status(500).json({ msg: err.message });
    }
}

const get_other_products = async (req, res) => {
    try {
        const { id } = req.params;

        const current_product = await Product.findById(id);
        const products = await Product.find({ category: current_product.category });
        const filtered_products = products.filter(p => String(p._id) !== String(current_product._id))

        return res.status(200).json({ filtered_products });
    } catch (err) {
        winston.log("info", err.message);
        return res.status(500).json({ msg: err.message });
    }
}

const create_product = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        const product = await Product.create({ ...req.body, seller: user._id, category: flCapital(req.body.category) });

        user.products.push(product);

        await user.save();

        product.viewers.push(user._id);
        product.view_count = 1;

        await product.save();

        const category = await Category.findOne({ name: product.category });

        if (!category) {
            const category = await Category.create({ name: flCapital(req.body.category) });
            return res.status(201).json({ product, category });
        } else {
            return res.status(201).json({ product });
        }



    } catch (err) {
        winston.log("info", err.message);
        return res.status(500).json({ msg: err.message });
    }
}

const increase_view_count = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);

        const user_already_viewed = product.viewers.includes(req.user._id);

        if (user_already_viewed) return res.status(200).json({ msg: "You viewed this product before." });

        product.viewers.push(req.user._id);

        await product.save();

        return res.status(200).json({ product });
    } catch (err) {
        winston.log("info", err.message);
        return res.status(500).json({ msg: err.message });
    }
}

const rate_product = async (req, res) => {
    try {
        const { id } = req.params;
        const user = req.user;
        const { rate } = req.body;

        const product = await Product.findById(id);

        if (String(product.seller._id) === String(user._id)) return res.status(400).json({ msg: "You can't vote your own product." });

        if (!product.voters.includes(String(user._id))) {
            product.voters.push(String(user._id));

            if (product.rate) {
                product.rate = (product.rate + rate) / 2;
            } else {
                product.rate = rate;
            }
        } else {
            return res.status(400).json({ msg: "You have already voted this product." });
        }

        await product.save();

        return res.status(200).json({ product });
    } catch (err) {
        winston.log("info", err.message);
        return res.status(500).json({ msg: err.message });
    }
}

const edit_product = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        return res.status(200).json({ product });
    } catch (err) {
        winston.log("info", err.message);
        return res.status(500).json({ msg: err.message });
    }
}

const delete_product = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByIdAndDelete(id);

        const categories = await Category.find({ name: product.category });

        if (categories.length === 1) await Category.findOneAndRemove({ name: product.category });

        const user = await User.findById(req.user._id);

        user.products.remove(product);

        await user.save();

    
        return res.status(200).json({ product });
    } catch (err) {
        winston.log("info", err.message);
        return res.status(500).json({ msg: err.message });
    }
}


module.exports = {
    get_products,
    get_products_by_category_name,
    get_product,
    get_random_product,
    get_other_products,
    create_product,
    increase_view_count,
    rate_product,
    edit_product,
    delete_product
};