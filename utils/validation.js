const register_input_validation = ({ password, confirm_password}, res) => {
    if (password !== confirm_password) return res.status(400).json({ msg: "Passwords should match" });
    return;
}

module.exports = { register_input_validation }