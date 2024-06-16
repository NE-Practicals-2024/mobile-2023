import axios from "axios";

const api = () => axios.create({
    baseURL: "http://10.5.223.231:5009/api/v1"
});

export default api();