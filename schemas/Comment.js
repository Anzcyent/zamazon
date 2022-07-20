const { model, Schema, Types } = require("mongoose");

const commentSchema = new Schema({
    owner: {
        type: Types.ObjectId,
        ref: "User",
    },
    product: {
        type: Types.ObjectId,
        ref: "Product",
    },
    comment_message: {
        type: String,
        required: [true, "You can't send an empty comment."],
        maxlength: [100, "Please don't exceed 100 characters"]
    }
}, {
    timestamps: true
});

module.exports = model("Comment", commentSchema);