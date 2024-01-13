import axios from 'axios'

const api = axios.create({
    url : 'http://localhost:5173',
    withCredentials : true,
    timeout : 15000
})

export default api;