import axios from "axios"
import store from '../store'

axios.interceptors.response.use(
    response => response,
    error => {
        // Обращение к защищенному ресурсу без прав
        if (error.response.status === 401 || error.response.status === 403) {
            store.commit("auth/LOGOUT", null, {root: true});
        } else return Promise.reject(error);
    });

// check auth
let authToken = window.localStorage.getItem('role');
if (authToken) {
    // add token to axios header
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + authToken;
    // get user data
    // store.dispatch('maps/getMaps', null, {root: true}).then();
}
