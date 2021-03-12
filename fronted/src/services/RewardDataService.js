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

  create(data) {
    return http.post("/rewardSchedule", data);
  }

  update(id, data) {
    return http.put(`/rewardSchedule/${id}`, data);
  }
  delete(id) {
    return http.delete(`/rewardSchedule/${id}`);
  }

}

export default new RewardDataService();
