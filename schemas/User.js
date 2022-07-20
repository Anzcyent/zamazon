const { model, Schema, Types } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new Schema({
    full_name: {
        type: String,
        required: [true, "Please provide a full name"],
        minlength: [3, "Please provide min 3 characters"],
        maxlength: [35, "Please don't exceed 35 characters"]
    },
    email: {
        type: String,
        required: [true, "Please provide your email address"],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please provide a valid email address"
        ]
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: [8, "Please provide min 8 characters for your password"],
    },
    address: {
        type: String,
        maxlength: [100, "Please don't exceed 100 characters"],
        default: "No info"
    },
    phone_number: {
        type: String,
        default: "No info"
    },
    profile_image: {
        type: String,
        default: "user.png"
    },
    products: [
        {
            type: Types.ObjectId,
            ref: "Product",
        }
    ],
    saved_products: [
        {
            type: Types.ObjectId,
            ref: "Product",
        }
    ],
    is_completed_profile: {
        type: Boolean,
        default: false
    },
    notifications: {
        type: [Object]
    }
}, {
    timestamps: true
});

userSchema.pre("save", function (next) {
    if (!this.isModified("password")) return next();

    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) return next(err);
            this.password = hash;
            next();
        });
    });
});

userSchema.methods.createAccessToken = function () {
    const { JWT_ACCESS_SECRET, JWT_ACCESS_EXPIRE } = process.env;
    const payload = {
        _id: this._id,
        full_name: this.full_name
    }
    const token = jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: JWT_ACCESS_EXPIRE });
    return token;
}

userSchema.methods.createRefreshToken = function () {
    const { JWT_REFRESH_SECRET, JWT_REFRESH_EXPIRE } = process.env;
    const payload = {
        _id: this._id,
        full_name: this.full_name
    }
    const token = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRE });
    return token;
}

userSchema.methods.comparePassword = function (password_input) {
    return bcrypt.compareSync(password_input, this.password);
}

module.exports = model("User", userSchema);