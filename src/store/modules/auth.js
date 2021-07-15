import axios from "axios"
import router from './../../routes'

export default {
    namespaced: true,

    state: {
        // teacher, student or null
        role: window.localStorage.getItem('role'),
    },
    getters: {
        role: state => state.role
    },
    // actions: {
    //     /**
    //      * Checking authorization data on the server and receiving a token
    //      *
    //      * @param state
    //      * @param commit
    //      * @param dispatch
    //      * @param payload: name + email + password
    //      */
    //     login({state, commit, dispatch}, payload) {
    //         return axios.post('/api/login', payload)
    //             .then(response => {
    //                 commit('LOGIN', {token: response.data.data.token, user: response.data.data.user});
    //                 // get user data
    //                 dispatch('subjects/getSubjects', null, {root: true});
    //                 dispatch('tiles/getTiles', null, {root: true});
    //             })
    //     },
    //     /**
    //      * Disable authorization token to on the server
    //      *
    //      * @param commit
    //      */
    //     logout({commit}) {
    //         return axios.post('/api/logout')
    //             .then(_ => {
    //                 commit('LOGOUT');
    //                 commit('tiles/SET_TILES', null, {root: true});
    //             })
    //     },
    //     /**
    //      * Checking registration data on the server and create user
    //      *
    //      * @param payload: name + email + password
    //      */
    //     register({}, payload) { return axios.post('/api/register', payload) }
    // },
    mutations: {
        /**
         * Set authentication data
         *
         * @param state
         * @param payload: role + token + user
         */
        LOGIN: (state, payload) => {
            state.role = payload.role;

            // add token to axios header
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + state.role;
            // saving auth token between sessions
            window.localStorage.setItem('role', state.role);

            router.push("/" + state.role);
        },
        /**
         * Remove authentication data from state and localStorage. Remove token from axios header.
         *
         * @param state
         */
        LOGOUT: state => {
            state.role = null;

            // remove auth token between sessions
            window.localStorage.removeItem('role');
            // add token to axios header
            delete axios.defaults.headers.common['Authorization'];

            if (router.currentRoute.path !== '/signin')
                router.push('/signin');
            // state.token = null;
            // state.user = null;
            //
            // window.localStorage.removeItem('token');
            // window.localStorage.removeItem('user');
            //
            // // remove token to axios header
            // delete axios.defaults.headers.common['Authorization'];
            //
            // // if the user was on page with auth middleware
            // if (router.currentRoute.meta.middlewareAuth) router.push('/');
        }
    }
}
