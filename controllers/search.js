const User = require("../schemas/User");
const Product = require("../schemas/Product");
const winston = require('winston');

const search = async (req, res) => {
    try {
        const { value } = req.query;

        let arr = [];

        // User Search
        const users = await User.find({ full_name: new RegExp(value, "i") });

        if (users) users.map(u => arr.push(u));

        // Product Search
        const products = await Product.find({ title: new RegExp(value, "i") }) || await Product.find({ description: new RegExp(value, "i") });

        if (products) products.map(p => arr.push(p));

        return res.status(200).json({ results: arr.splice(0, 10) });

    } catch (err) {
        winston.log("info", err.message);
        return res.status(500).json({ msg: err.message });
    }
}

module.exports = { search }