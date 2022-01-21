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
    // Запретить переход на страницы: авторизация, регистрация и восстановление пароля для авторизированного пользователя
    if ((to.path === '/signin' || to.path === '/signup' || to.path === '/password/reset') && store.getters['auth/isAuth'])
        next({path: '/' + store.state.auth.user.role});
    // Выходить из системы при переходе на страницу без доступа
    else if (to.matched.some(record => record.meta.middlewareAuth !== store.state.auth.user?.role)) {
        store.dispatch("auth/logout");
        next(false);
    }
    else next()
});

router.afterEach((to, from) => {
    // set meta
    document.title = to.meta.title;
    if (to.meta.description) document.description = to.meta.description;
});

export default router
