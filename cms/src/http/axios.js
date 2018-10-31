import axios from 'axios';
import qs from 'qs'
// axios.defaults.baseURL='http://120.78.164.247:8099'
axios.defaults.baseURL='http://120.79.191.20:8099'
axios.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded;charset=UTF-8'
// 每一次发送数据前，要将data数据做编码
axios.interceptors.request.use((config)=>{
	if(config.method=='post'){
		config.data=qs.stringify(config.data,{arrayFormat:'repeat'});
	}
	return config;	
})
export default axios;