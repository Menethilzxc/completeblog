const User = require("../models/User");
const { verify } = require("../helpers/token");

module.exports = async function (req, res, next) {
  if (!req.cookies.token) {
    return res.status(401).send({ error: "Token is missing" });
  }

  try {
    const tokenData = verify(req.cookies.token);

    const user = await User.findOne({ _id: tokenData.id });

    if (!user) {
      return res.status(401).send({ error: "Authenticated user not found" });
    }

    req.user = user;

    next();
  } catch (err) {
    return res.status(401).send({ error: "Invalid or expired token" });
  }
};
