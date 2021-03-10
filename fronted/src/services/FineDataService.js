import http from "../http-common";
import authHeader from './auth-header';

class FineDataService {
  getAll(cond) {
    console.log('cond', cond);
    return http.get("/fineSchedule",
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

  get(id) {
    return http.get(`/fineSchedule/${id}`);
  }

  create(data) {
    return http.post("/fineSchedule", data);
  }

  update(id, data) {
    return http.put(`/fineSchedule/${id}`, data);
  }

  delete(id) {
    return http.delete(`/fineSchedule/${id}`);
  }

  deleteAll() {
    return http.delete(`/fineSchedule`);
  }

  findByTitle(title) {
    return http.get(`/fineSchedule?title=${title}`);
  }
}

export default new FineDataService();
