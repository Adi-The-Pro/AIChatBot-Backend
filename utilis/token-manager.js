const jwt = require('jsonwebtoken');
const { COOKIE_NAME } = require('./constants');
exports.createToken = async (id,email) => {
    const payload = {id,email};
    const token = jwt.sign(payload,process.env.JWT_SECRET,{
      expiresIn : '1d',
    });
    return token;
};
exports.verifyToken = async (req, res, next) => {
    const {'auth-token':token} = req.cookies;
    if (!token) {
      return res.status(401).json({ message: "Token Not Received" });
    }
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET, (err, success) => {
        if (err) {
          return res.status(401).json({ message: "Token Expired" });
        } else {
          resolve();
          res.locals.jwtData = success;
          return next();
        }
      });
    });
  };