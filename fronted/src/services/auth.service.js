import http from "../http-common";

class AuthService {
  login(user) {
    return http
      .post("auth/signin", {
        name: user.name,
        password: user.password
      })
      .then(response => {
        const result = response.data;//请求回来的用户数据
        const userResult=result.data;
        console.log('result',result);

        console.log('userResult',userResult);
        if (result.status===200 &&  userResult) {
          let localUser = JSON.parse(localStorage.getItem('user'));
          //先看看本地是否有accessToken，若有则只更新accessToken
          if (localUser && localUser.accessToken) {
            //如果是重新生成的token，覆盖原来的
              const newAccessToken = userResult.accessToken; //请求回来的用户accessToken
              localUser.accessToken = newAccessToken;
              localStorage.setItem('user', JSON.stringify(localUser));
          } else {
            //如果没有就设置成本地用户数据
            localStorage.setItem('user', JSON.stringify(userResult));
          }
        }
        return userResult;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }
}

export default new AuthService();
