import axios from "axios"
import router from '@/routes'

export default {
    namespaced: true,
    state: {
        auth_host: "http://192.168.77.13",
        // Получаем данные авторизации из локального хранилища браузера, если они существуют
        user: window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')) : null,
        token: window.localStorage.getItem('token'),
    },
    getters: {
        isAuth: state => state.user && state.token
    },
    actions: {
        // Авторизация
        // payload: login, password
        login({state, commit}, payload) {
            let formData = new FormData();
            formData.append('login', payload.login);
            formData.append('password', payload.password);

            return axios.post(state.auth_host + '/api/authorization', formData, {
                headers: {"Content-Type": "multipart/form-data"}
            })
                .then(response => {
                    commit('LOGIN', {
                        token: response.data.token,
                        user: {...response.data.info, role: response.data.is_teacher ? "teacher" : "student"}
                    });
                    router.replace("/" + state.user.role).then();
                })
        },
        // Регистрация и дальнейшая авторизация
        // payload: login, password, confirm_password
        register({state, commit}, payload) {
            let formData = new FormData();
            formData.append('login', payload.login);
            formData.append('password', payload.password);
            formData.append('confirmPassword', payload.confirm_password);

            return axios.post(state.auth_host + '/api/registration', formData, {
                headers: {"Content-Type": "multipart/form-data"}
            })
                .then(response => {
                    commit('LOGIN', {
                        token: response.data.token,
                        user: {...response.data.info, role: response.data.is_teacher ? "teacher" : "student"}
                    });
                    router.replace("/" + state.user.role).then();
                })
        },
        // Выход из системы
        logout({commit}) {
            commit('LOGOUT');
            commit('data/SET_DATA_LOADED', false, { root: true });
            // Исправление ошибки при возвращения назад по истории браузера после logout
            if (router.currentRoute.path !== '/signin')
                router.push('/signin');
        }
    },
    mutations: {
        // Set authentication data
        // payload: user, token, user
        LOGIN: (state, payload) => {
            state.user = payload.user;
            state.token = payload.token;

            // add token to axios header
            axios.defaults.headers.common['token'] = payload.token;
            // saving auth token between sessions
            window.localStorage.setItem('user', JSON.stringify(state.user));
            window.localStorage.setItem('token', payload.token);
        },
        // Remove authentication data from state and localStorage. Remove token from axios header.
        LOGOUT: state => {
            state.user = null;
            state.token = null;

            // remove auth token between sessions
            window.localStorage.removeItem('user');
            window.localStorage.removeItem('token');

            // remove token from axios header
            delete axios.defaults.headers.common['token'];
        }
    }
}
