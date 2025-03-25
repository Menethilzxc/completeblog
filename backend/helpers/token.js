require("dotenv").config();
const jwt = require("jsonwebtoken");

const sign = process.env.JWT_SECRET;

if (!sign) {
  throw new Error("JWT_SECRET is not defined in the environment variables");
}

module.exports = {
  generate(data) {
    return jwt.sign(data, sign, { expiresIn: "30d" });
  },
  verify(token) {
    return jwt.verify(token, sign);
  },
};
