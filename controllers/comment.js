const Comment = require("../schemas/Comment");
const Product = require("../schemas/Product");
const winston = require("winston");

const create_comment = async (req, res) => {
    try {
        const { comment_message } = req.body;

        const product_id = req.params.id;
        const product = await Product.findById(product_id);

        if (String(product.seller._id) === String(req.user._id)) return res.status(400).json({ msg: "You can't comment to your own product." });

        const comment = await Comment.create({
            comment_message,
            owner: req.user._id,
            product: product_id
        });

        product.comments.push(comment);
        await product.save();

        return res.status(201).json({ comment });
    } catch (err) {
        winston.log("info", err.message);
        return res.status(500).json({ msg: err.message });
    }
}

const get_comments = async (req, res) => {
    try {
        const product_id = req.params.id;
        const comments = await Comment.find({ product: product_id }).populate({ path: "owner", select: "full_name profile_image" });
        return res.status(200).json({ comments });
    } catch (err) {
        winston.log("info", err.message);
        return res.status(500).json({ msg: err.message });
    }
}

const delete_comment = async (req, res) => {
    try {
        const comment_id = req.params.id;
        const comment = await Comment.findByIdAndDelete(comment_id);

        const product = await Product.findById(comment.product._id);

        product.comments.remove(comment_id);
        await product.save();

        return res.status(200).json({ comment });
    } catch (err) {
        winston.log("info", err.message);
        return res.status(500).json({ msg: err.message });
    }
}

const edit_comment = async (req, res) => {
    try {
        const { comment_message } = req.body;

        const comment = await Comment.findByIdAndUpdate(req.params.id, {
            comment_message
        }, { new: true, runValidators: true });

        return res.status(200).json({ comment });
    } catch (err) {
        winston.log("info", err.message);
        return res.status(500).json({ msg: err.message });
    }
}

module.exports = { create_comment, get_comments, delete_comment, edit_comment }