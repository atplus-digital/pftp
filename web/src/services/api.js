import axios from 'axios';


const api = axios.create({
 baseURL: process.env.REACT_APP_API_ENDPOINT || '/api/' ,
});





export default api;
