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
        // console.log('result',result);
        if (result.status===200 ) {
          localStorage.setItem('user', JSON.stringify(userResult));
        }
        console.log('userResult',userResult);

        return result;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }
}

export default new AuthService();
