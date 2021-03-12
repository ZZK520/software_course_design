import axios from "axios";
import {Message} from 'element-ui'



const baseUrl={
  online:'http://106.13.182.155:7080/api',
  lan:'http://192.168.43.116:7080/api',

  local:'http://localhost:7080/api'
}

let http = axios.create({
  baseURL: baseUrl.local,
  // baseURL: baseUrl.lan,
  // baseURL: baseUrl.online,

  headers: {
    "Content-type": "application/json"
  }
  });

  http.interceptors.request.use(config=> {
    console.log('interceptors');
    return config;
  }, err=> {
    console.log('error-interceptors');
    Message.error({message: '请求超时!'});
    return Promise.resolve(err);
  })
  
  http.interceptors.response.use(data=> {
    console.log('interceptors.response');
    if (data.status && data.status == 200 && data.data.status == 'error') {
      Message.error({message: data.data.msg});
      return;
    }
    return data;
  }, err=> {
    console.log('error-interceptors.response');
    if (err.response.status == 500||err.response.status == 404) {
      Message.error({message: '服务器被吃了⊙﹏⊙∥'});
    } else if (err.response.status == 403) {
      Message.error({message: '权限不足,请联系管理员!'});
    }else {
      Message.error({message: '未知错误!'});
    }
    return Promise.resolve(err);
  })

  export default http;