import axios from 'axios';

const service = axios.create({
  baseURL: 'http://aiwaves-agents.com/api/', // 请求路径前置加上 '/agent-factory-api'
  timeout: 20000, // 请求超时
});
// 添加请求拦截器
// axios.interceptors.request.use(function (config) {
//     config.headers['Authorization'] = localStorage.getItem('access_token')?localStorage.getItem('access_token'):"";
//     config.headers['X-Auth-Token'] = localStorage.getItem('refresh_token')?localStorage.getItem('refresh_token'):"";
//     return config;
//   }, function (error) {
//     // 对请求错误做些什么x
//     return Promise.reject(error);
//   });

// // 添加响应拦截器
// axios.interceptors.response.use(function (response) {
//     // 对响应数据做点什么
//     return response;
//   }, function (error) {
//     // 对响应错误做点什么
//     return Promise.reject(error);
//   });

export default axios;