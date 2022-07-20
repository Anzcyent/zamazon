const User = require("../schemas/User");
const Order = require("../schemas/Order");
const Product = require("../schemas/Product");
const winston = require("winston");
const uniqid = require("uniqid");

const get_user = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id).populate({ path: "products" });

        return res.status(200).json({ user });
    } catch (err) {
        winston.log("info", err.message);
        return res.status(500).json({ msg: err.message });
    }
}

const edit_profile = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true });

        return res.status(200).json({ user });

    } catch (err) {
        winston.log("info", err.message);
        return res.status(500).json({ msg: err.message });
    }
}

const purchase = async (req, res) => {
    try {
        req.body.map(async i => {
            const product = await Product.findById(i._id);
            product.stock_count = product.stock_count - i.quantity;

            if (product.stock_count === 0) product.isOutOfStock = true;

            if (product.seller) {
                const seller = await User.findById(product.seller._id);
                const buyer = await User.findById(req.user._id);

                const notification = {
                    _id: uniqid("", "-zamazon"),
                    msg: `${buyer.full_name} has ordered your product.`,
                    is_read: false,
                    receiver: seller._id,
                    buyer: {
                        _id: buyer._id,
                        full_name: buyer.full_name,
                        profile_image: buyer.profile_image,
                        address: buyer.address
                    },
                    product: {
                        _id: product._id,
                        title: product.title,
                        image: product.images[0]
                    }
                }

                seller.notifications.push(notification);
                await seller.save();
            }
            await product.save();
        });

        const order = await Order.create({ products: req.body, owner: req.user._id });

        return res.status(200).json({ order });
    } catch (err) {
        winston.log("info", err.message);
        return res.status(500).json({ msg: err.message });
    }
}

const read_notifications = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        user.notifications.map(i => {
            i.is_read = true;
        });

        user.markModified("notifications");

        await user.save();

        return res.status(200).json({ user });
    } catch (err) {
        winston.log("info", err.message);
        return res.status(500).json({ msg: err.message });
    }
}

const show_notification = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        const notif = user.notifications.find(n => n._id === req.params.id);

        return res.status(200).json({ notif });
    } catch (err) {
        winston.log("info", err.message);
        return res.status(500).json({ msg: err.message });
    }
}

module.exports = { get_user, edit_profile, purchase, read_notifications, show_notification };

