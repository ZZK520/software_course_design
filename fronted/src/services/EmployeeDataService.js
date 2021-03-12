import http from "../http-common";
import authHeader from './auth-header';

class EmployeeDataService {
  getAll(cond) {
    return http.get("/employees", {
      params: 
      // {
      //   username: 'admin',
      //   password: '123456'
      // }, 
      cond,
      headers: authHeader()
    });
  }
  
  create(data) {
    return http.post("/employees", data);
  }

  update(id, data) {
    return http.put(`/employees/${id}`, data);
  }
  
}

export default new EmployeeDataService();
