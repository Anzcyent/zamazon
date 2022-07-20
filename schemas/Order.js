const { model, Schema, Types } = require("mongoose");

const orderSchema = new Schema({
    owner: {
        type: Types.ObjectId,
        ref: "User"
    },
    products: {
        type: [Types.ObjectId],
        ref: "Product"
    }
}, {
    timestamps: true
});

module.exports = model("Order", orderSchema);