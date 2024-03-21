const jwt = require("jsonwebtoken");

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.AUTHORIZATION_SECRET_KEY, {
        expiresIn: "1d",
    });
};

module.exports = generateToken;