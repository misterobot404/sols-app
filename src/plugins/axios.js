import axios from "axios"
import store from '../store'

axios.interceptors.response.use(
    response => response,
    error => {
        // Обращение к защищенному ресурсу без прав
        if (error.response.status === 401 || error.response.status === 403) {
            if (store.state["auth/token"]) store.commit("auth/LOGOUT", null, {root: true});
        } else return Promise.reject(error);
    });

// check auth
let authToken = window.localStorage.getItem('token');
if (authToken) {
    // add token to axios header
    axios.defaults.headers.common['token'] = authToken;
    // get user data
    // store.dispatch('maps/getMaps', null, {root: true}).then();
}
