const Order = require("../schemas/Order");
const User = require("../schemas/User");
const winston = require("winston");

const get_orders = async (req, res) => {
    try {
        const orders = await Order.find({ owner: req.user._id }).populate({ path: "products", select: "title images" });

        return res.status(200).json({ orders });
    } catch (err) {
        winston.log("info", err.message);
        return res.status(500).json({ msg: err.message });
    }
}

module.exports = {
    get_orders
}