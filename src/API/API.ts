import axios from "axios";
import { cfg } from "@/cfg/cfg";
import router from "@/router";
import { UserState } from "@/stores/store";
let store: any;
import { ElMessage } from "element-plus";
const config = new cfg()
axios.defaults.baseURL = config.baseUrl;
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;
axios.interceptors.response.use(
    response => {
        console.log("请求", response.data)
        router.beforeEach((to) => {
            store = UserState()
        })
        if (response.status === 401) {
            router.push('/login')

            store.setLogin(false)
            return Promise.reject(response)
        }
        if (response.status === 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response)
        }
    }, err => {
        // router.push('/login')
        // store.setLogin(false)
        // ElMessage({
        //     message: '登录已过期',
        //     type: 'error',
        // });
        return Promise.reject(err);
    }
)
const checkLogin = () => {
    return axios.get("/api/check_login");
}
const login = (username: string, password: string) => {
    return axios.post("/api/login", { username, password }, { withCredentials: true });
}
const register = (username: string, password: string) => {
    return axios.post("/api/register", { username, password });
}
const predictImg = (color_settings: string) => { return axios.post("/api/predict", { color_settings }) }
const get_pcb_list = () => {
    return axios.get("/api/get_pcb_list")
}
const get_system_info = () => {
    return axios.get("/api/get_system_info")
}
const delete_pcb_image = (pcb_id: number | string) => {
    return axios.post("/api/delete_pcb", { pcb_id })
}
const get_color_settings = () => {
    return axios.get("/api/get_color_settings")
}
const save_color_settings = (color_settings: string) => {
    return axios.post("/api/save_color_settings", { color_settings })
}
export { checkLogin, login, register, predictImg, get_pcb_list, get_system_info, delete_pcb_image, get_color_settings, save_color_settings }
