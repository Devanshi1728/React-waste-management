import axios from "axios";
const api = axios.create({
    baseURL: "http://120.0.0.1:5000",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    },
})

export default api;
