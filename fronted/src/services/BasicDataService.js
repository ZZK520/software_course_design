import http from "../http-common";
import authHeader from './auth-header';


class BasicDataService {
  getAll(cond) {
    console.log('cond', cond);
    return http.get("/basicSchedule",
      {
        params: 
        // {
        //   username: 'admin',
        //   password: '123456'
        // }, 
        cond,
        headers: authHeader()
      }

    );
  }

  create(data) {
    return http.post("/basicSchedule", data);
  }

  update(id, data) {
    return http.put(`/basicSchedule/${id}`, data);
  }

}

export default new BasicDataService();
