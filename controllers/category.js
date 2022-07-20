const Category = require("../schemas/Category");
const winston = require("winston");

const get_categories = async (req, res) => {
    try {
        const categories = await Category.find();

        return res.status(200).json({ categories });
    } catch (err) {
        winston.log("info", err.message);
        return res.status(500).json({ msg: err.message });
    }
}

module.exports = {get_categories}