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

 
  create(data) {
    return http.post("/fineSchedule", data);
  }

  update(id, data) {
    return http.put(`/fineSchedule/${id}`, data);
  }
  delete(id) {
    return http.delete(`/fineSchedule/${id}`);
  }
  
}

export default new FineDataService();
