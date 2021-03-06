import axios from 'axios';

// create an axios instance
const service: any = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 20000 // request timeout
});

service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */
  (response) => {
    const res = response.data;
    if (res && [0, 200].includes(+res.code)) {
      return res.data;
    } else {
      return Promise.reject(res);
    }
  },
  (error) => {
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.message
    ) {
      // 后端服务报错会添加冒号，前端匹配剔除
      alert(error.response.data.message);
    }
    return Promise.reject(
      (error && error.response && error.response.data) || error
    );
  }
);

export default service;
