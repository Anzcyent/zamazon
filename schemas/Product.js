const { model, Schema, Types } = require("mongoose");

const productSchema = new Schema({
    title: {
        type: String,
        required: [true, "Please provide a title for your product."]
    },
    description: {
        type: String,
        required: [true, "Please provide a description for your product."],
        minlength: [20, "Please provide min 20 characters for your product description"],
    },
    category: {
        type: String,
        required: [true, "Please let us know which category this product belongs to"]
    },
    price: {
        type: Number,
        required: [true, "Please enter a price for this product"]
    },
    images: {
        type: [String],
        required: [true, "Please provide at least one photo for your product."]
    },
    rate: Number,
    voters: {
        type: [Types.ObjectId],
        ref: "User"
    },
    view_count: {
        type: Number,
        default: 0
    },
    viewers: {
        type: [Types.ObjectId],
        ref: "User"
    },
    stock_count: {
        type: Number,
        required: [true, "Please provide how many product you have in stock"]
    },
    isOutOfStock: {
        type: Boolean,
        default: false
    },
    dummy_seller: String,
    small_description: String,
    seller: {
        type: Types.ObjectId,
        ref: "User"
    },
    comments:
    {
        type: [Types.ObjectId],
        ref: "Comment"
    }
}, {
    timestamps: true
});

module.exports = model("Product", productSchema);