import Vue from 'vue'
import VueRouter from 'vue-router'
import {routes} from './routes'
import store from '../store'

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes
});

router.beforeEach((to, from, next) => {
    // hide page for auth users
    if (to.matched.some(record => record.meta.hideForAuth && store.state.auth.user))
        next({ path: '/' + store.state.auth.user.role });
    // page access check
    else if (to.matched.some(record => record.meta.middlewareAuth && record.meta.middlewareAuth !== store.state.auth.user.role)) {
        store.commit("auth/LOGOUT", null, {root: true});
        next(false);
    } else {
        // enable page loading effect
        store.commit("layout/SHOW_PAGE_LOADING", null, {root: true});
        next()
    }
});
// eslint-disable-next-line no-unused-vars
router.afterEach((to, from) => {
    // disable page loading effect
    store.commit("layout/HIDE_PAGE_LOADING", null, {root: true});
    // set meta
    document.title = to.meta.title;
    if (to.meta.description) document.description = to.meta.description;
});

export default router
