function login_validation_error({ email, password }) {
    if (email === "") return "email";
    if (password === "") return "password";
}

export default login_validation_error;
