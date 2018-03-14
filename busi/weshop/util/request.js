import axios from 'axios'

const service = axios.create({
  baseURL: process.env.API_BASE,
  timeout: 15000
})

service.interceptors.request.use(config => {
  config.headers['signal'] = process.env.API_SIGNAL
  return config
}, error => {
  return Promise.reject(error)
})

export default service
