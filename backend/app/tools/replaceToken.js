const { getRefreshToken, getToken } = require("../middlewares/token");

exports.replaceAccessToken=function(req,res,next){
   
    const newAccessToken=getToken(email);
    return newAccessToken;
    
}
