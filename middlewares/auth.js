const jwt = require("jsonwebtoken");

const get_access_to_route = async (req, res, next) => {
    try {
        if (!is_token_included(req)) return res.status(403).json({ msg: "You are not authorized to access this route." });

        const access_token = get_header_token(req);


        jwt.verify(access_token, process.env.JWT_ACCESS_SECRET, (err, decoded) => {
            if (err) return res.status(401).json({msg: "You are not authorized to access this route."});

            req.user = {
                _id: decoded._id,
                full_name: decoded.full_name
            }

            next();
        });
    } catch (err) {
        next(err);

        return res.status(500).json({ msg: err.message });
    }
}

const is_token_included = (req) => {
    return req.headers.authorization && req.headers.authorization.startsWith("Bearer:");
}

const get_header_token = (req) => {
    const auth = req.headers.authorization;

    const token = auth.split(" ")[1];

    return token;
}


module.exports = get_access_to_route;