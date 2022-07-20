function register_validation_error({ full_name, email, password, confirm_password }) {
    if (full_name === "" || full_name.length < 3 || full_name.length > 25) return "full_name";

    // eslint-disable-next-line
    const emailValidation = (emailAddress) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailAddress);
    if (email === "" || !emailValidation(email)) return "email";

    if (password === "" || password.length < 8 || password !== confirm_password) return "password";
}

export default register_validation_error;