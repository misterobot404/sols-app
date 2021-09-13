import axios from "axios"
import router from './../../routes'

export default {
    namespaced: true,

    state: {
        auth_host: "http://192.168.77.13",
        // teacher, student or null
        role: window.localStorage.getItem('role'),
        token: window.localStorage.getItem('token')
    },
    getters: {
        role: state => state.role
    },
    actions: {
        // payload: login, password
        login({state, commit}, payload) {
            let formData = new FormData();
            formData.append('login', payload.login);
            formData.append('password', payload.password);

            return axios.post(state.auth_host + '/api/authorization', formData, {
                headers: {"Content-Type": "multipart/form-data"}
            })
                .then(response =>
                    commit('LOGIN', {token: response.data.token, role: response.data.is_teacher ? "teacher" : "student"})
                )
        },
        register({state, commit}, payload) {
            let formData = new FormData();
            formData.append('login', payload.login);
            formData.append('password', payload.password);
            formData.append('confirmPassword', payload.confirm_password);

            return axios.post(state.auth_host + '/api/registration', formData, {
                headers: {"Content-Type": "multipart/form-data"}
            })
                .then(response =>
                    commit('LOGIN', {token: response.data.token, role: response.data.is_teacher ? "teacher" : "student"})
                )
        }
    },
    mutations: {
        /**
         * Set authentication data
         *
         * @param state
         * @param payload: role + token + user
         */
        LOGIN: (state, payload) => {
            state.role = payload.role;
            state.token = payload.token;

            // add token to axios header
            axios.defaults.headers.common['token'] = payload.token;
            // saving auth token between sessions
            window.localStorage.setItem('role', state.role);
            window.localStorage.setItem('token', payload.token);

            router.push("/" + state.role).then();
        },
        /**
         * Remove authentication data from state and localStorage. Remove token from axios header.
         *
         * @param state
         */
        LOGOUT: state => {
            state.role = null;
            state.token = null;

            // remove auth token between sessions
            window.localStorage.removeItem('role');
            window.localStorage.removeItem('token');

            // add token to axios header
            delete axios.defaults.headers.common['token'];

            if (router.currentRoute.path !== '/signin')
                router.push('/signin');
        }
    }
}
