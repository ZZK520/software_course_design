const bcrypt = require("bcryptjs");
const db = require("../models");
const { getToken } = require("../middlewares/token")
const Employee = db.employees;
exports.signin = async (req, res) => {
  let data = req.body;
  console.log('req.body', data);
  const responseData = {
    status: 200,
    data: {},
    error: "",
    message: "",
  };
  // return res.json(responseData);
  let ID = req.body.name;
  let password = req.body.password;
  Employee.findOne({
    ID: ID,
  })
    .exec((err, user) => {
      if (err) {
        responseData.status = 500;
        responseData.message = err;
        return res.json(responseData)
      }

      if (!user) {
        responseData.status = 404;
        responseData.message = 'User Not found.';
        return res.json(responseData)
      }
      else {
        console.log('user', user);
        console.log("req.body.password", password);
        // 暂且先不弄加密比较的，先使用===判断
        let passwordIsValid = validatePWD(password,user.Password);
 
        // 调试--
        console.log('passwordIsValid', passwordIsValid);
        console.log('password', password);
        console.log('user.Password', user.Password);
        if (!passwordIsValid) {
          responseData.status = 401;
          responseData.data.accessToken = null;
          responseData.message = "Invalid Password!";
          return res.json(responseData)

        }
        else {
          const token = getToken(user);
          const result = {
            accessToken: token,
            ID:user.ID,
            IsAccountant:user.IsAccountant
          };
          responseData.status = 200;
          responseData.data = result;
          responseData.message = '登录成功';
          return res.json(responseData);
        }
      }
    });
};

function validatePWD(posted, stored) {

  return posted===stored;
  let passwordIsValid = bcrypt.compareSync(
    posted,
    stored
  );
  return passwordIsValid;
}
