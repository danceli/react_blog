import Axios from 'axios';
import qs from 'qs';
//创建axios实例
const instance = Axios.create({ timeout: 6000 });
//在main.js设置全局的请求次数，请求的间隙
// instance.defaults.retry = 4;
// instance.defaults.retryDelay = 1000;
// //配置默认设置
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// instance.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
//   var config = err.config;
//   // If config does not exist or the retry option is not set, reject
//   if(!config || !config.retry) return Promise.reject(err);
  
//   // Set the variable for keeping track of the retry count
//   config.__retryCount = config.__retryCount || 0;
  
//   // Check if we've maxed out the total number of retries
//   if(config.__retryCount >= config.retry) {
//       // Reject with the error
//       return Promise.reject(err);
//   }
  
//   // Increase the retry count
//   config.__retryCount += 1;
  
//   // Create new promise to handle exponential backoff
//   var backoff = new Promise(function(resolve) {
//       setTimeout(function() {
//           resolve();
//       }, config.retryDelay || 1);
//   });
  
//   // Return the promise in which recalls axios to retry the request
//   return backoff.then(function() {
//       return instance(config);
//   });
// });

// 请求拦截
instance.interceptors.request.use((config) => {
  // console.log(config);

  if(config.method == 'post') {
    config.data = qs.stringify(config.data);
  }
  return config;
}, (error) => {
  return new Promise.reject(error);
})

//响应拦截
instance.interceptors.response.use(success => {
  return success.status == 200 ? Promise.resolve(success) : Promise.reject(success);
}, error => {
  if(error) return Promise.reject(error)
})
export default instance;