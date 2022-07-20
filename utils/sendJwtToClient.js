const sendJwtToClient = (res, user, secured_user) => {
    const { NODE_ENV } = process.env;

    const token = user.createRefreshToken();

    return res.status(200)
        .cookie("refresh_token", token, {
            path: "/api/auth/refresh_token",
            httpOnly: true,
            secure: NODE_ENV === "production" ? true : false,
            maxAge: 1000 * 60 * 60 * 24 * 30
        })
        .json({ user: secured_user, access_token: token });
}

module.exports = sendJwtToClient