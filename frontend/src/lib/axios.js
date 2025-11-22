import axios from 'axios';
const axiosinstance = axios.create({
    baseURL: import.meta.env.MODE === "development" ? 'http://localhost:3000': "/api",
    headers: {
    'Content-Type': 'application/json'
  }
});
export default axiosinstance; 