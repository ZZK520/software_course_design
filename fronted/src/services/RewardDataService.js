import http from "../http-common";
import authHeader from './auth-header';

class RewardDataService {
  getAll(cond) {
    console.log('cond', cond);
    return http.get("/rewardSchedule",
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
    return http.get(`/rewardSchedule/${id}`);
  }

  create(data) {
    return http.post("/rewardSchedule", data);
  }

  update(id, data) {
    return http.put(`/rewardSchedule/${id}`, data);
  }

  delete(id) {
    return http.delete(`/rewardSchedule/${id}`);
  }

  deleteAll() {
    return http.delete(`/rewardSchedule`);
  }

  findByTitle(title) {
    return http.get(`/rewardSchedule?title=${title}`);
  }
}

export default new RewardDataService();
