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

  get(id) {
    return http.get(`/employees/${id}`);
  }

  create(data) {
    return http.post("/employees", data);
  }

  update(id, data) {
    return http.put(`/employees/${id}`, data);
  }

  delete(id) {
    return http.delete(`/employees/${id}`);
  }

  deleteAll() {
    return http.delete(`/employees`);
  }

  findByTitle(title) {
    return http.get(`/employees?title=${title}`);
  }
}

export default new EmployeeDataService();
