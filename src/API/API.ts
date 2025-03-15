import axios from "axios";
import { cfg } from "@/cfg/cfg";
const config = new cfg()
axios.defaults.baseURL = config.baseUrl;
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;
const checkLogin = () => {
    return axios.get("/api/check_login");
}
const login = (username: string, password: string) => {
    return axios.post("/api/login", { username, password }, { withCredentials: true });
}
const register = (username: string, password: string) => {
    return axios.post("/api/register", { username, password });
}
const predictImg = () => { return axios.get("/api/predict") }
const get_pcb_list = () => {
    return axios.get("/api/get_pcb_list")
}
const get_system_info = () => {
    return axios.get("/api/get_system_info")
}
const delete_pcb_image = (pcb_id: number | string) => {
    return axios.post("/api/delete_pcb", { pcb_id })
}
export { checkLogin, login, register, predictImg, get_pcb_list, get_system_info, delete_pcb_image }
