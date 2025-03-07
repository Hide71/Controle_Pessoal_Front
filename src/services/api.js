import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:5119"
})
export default api