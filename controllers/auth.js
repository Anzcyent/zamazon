const User = require("../schemas/User");
const { register_input_validation } = require("../utils/validation");
const sendJwtToClient = require("../utils/sendJwtToClient");
const jwt = require("jsonwebtoken");
const winston = require("winston");


const generate_access_token = async (req, res, next) => {
    try {
        const rf_token = req.cookies.refresh_token;

        jwt.verify(rf_token, process.env.JWT_REFRESH_SECRET, async (err, decoded) => {
            if (err) return res.status(401).json({ msg: "Please login." });

            const user = await User.findById(decoded._id).select("-password");

            const access_token = user.createAccessToken();

            return res.status(200).json({ user, access_token });
        });

    } catch (err) {
        winston.log("info", err.message);
        return res.status(500).json({ msg: err.message });
    }
}

const register = async (req, res) => {
    try {
        const { full_name, email, password, confirm_password } = req.body;

        const existing_user = await User.findOne({ email });
        if (existing_user) return res.status(400).json({ msg: "User already exists" });

        if (register_input_validation(req.body, res)) return res.status(400);

        const user = await User.create({
            full_name,
            email,
            password,
            confirm_password,
        });

        const secured_user = await User.findOne({ email }).select("-password");

        sendJwtToClient(res, user, secured_user);
    } catch (err) {
        winston.log("info", err.message);
        return res.status(500).json({ msg: err.message });
    }
}

const logout = async (req, res) => {
    try {
        return res
            .status(200)
            .clearCookie("refresh_token", { path: "/api/auth/refresh_token" })
            .json({ msg: "Logout successful" });
    } catch (err) {
        winston.log("info", err.message);
        return res.status(500).json({ msg: err.message });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ msg: "There is no user with that email!" });

        const compare_password = user.comparePassword(password);
        if (!compare_password) return res.status(400).json({ msg: "Wrong password!" });

        const secured_user = await User.findOne({ email }).select("-password");

        sendJwtToClient(res, user, secured_user);
    } catch (err) {
        winston.log("info", err.message);
        return res.status(500).json({ msg: err.message });
    }
}

const complete_profile = async (req, res) => {
    try {
        const { address, phone_number, profile_image } = req.body;
        const user = await User.findByIdAndUpdate(req.user._id, {
            address, phone_number, profile_image,
            is_completed_profile: true
        }, { new: true, runValidators: true });

        return res.status(200).json({ user });
    } catch (err) {
        winston.log("info", err.message);
        return res.status(500).json({ msg: err.message });
    }
}

module.exports = {
    register,
    generate_access_token,
    logout,
    login,
    complete_profile
};
