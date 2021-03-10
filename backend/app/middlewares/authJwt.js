const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");

const db = require("../models");

const Employee = db.employees;

verifyToken = (req, res, next) => {
  const responseData = {
    status: 200,
    data: {},
    error: "",
    message: "",
  };
  let token = req.headers["x-access-token"];
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      responseData.status = 401;
      responseData.message = `Unauthorized!${err}`;
      return res.json(responseData);
    }
    // console.log('decoded',decoded);
   
    Employee.findOne({ ID: decoded.name }).exec(async function (err, data) {
      if (err) {
        responseData.status = 401;
        responseData.message = `查找出错!${err}`;
        return res.json(responseData);
      }
      next();

    });
  });
};

const authJwt = {
  verifyToken,

};
module.exports = authJwt;
