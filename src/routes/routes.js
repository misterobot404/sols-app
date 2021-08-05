
export const routes = [
    {
        path: '/',
        redirect: '/signin'
    },
    /* auth */
    {
        name: "SignIn",
        path: '/signin',
        component: () => import('../pages/SignIn'),
        meta: {
            title: "SOLS - Вход"
        }
    },
    {
        name: "SignUp",
        path: '/signup',
        component: () => import('../pages/SignUp'),
        meta: {
            title: "SOLS - Регистрация"
        }
    },
    {
        path: '/username-forget',
        component: () => import('../pages/UsernameForget'),
        meta: {
            title: "SOLS - Восстановление логин"
        }
    },
    {
        path: '/password-forget',
        component: () => import('../pages/PasswordForget'),
        meta: {
            title: "SOLS - Восстановление пароля"
        }
    },
    /* testing  */
    {
        path: '/test/:id',
        component: () => import('@/pages/Testing'),
        meta: {
            title: "SOLS - Прохождение теста"
        }
    },
    /* teacher */
    {
        path: '/teacher',
        redirect: '/teacher/home'
    },
    {
        path: '/teacher/home',
        component: () => import('../pages/teacher/Home'),
        meta: {
            title: "SOLS - Кабинет преподавателя",
            middlewareAuth: "teacher"
        }
    },
    {
        path: '/teacher/create-test',
        component: () => import('../pages/teacher/CreateTest'),
        meta: {
            title: "SOLS - Создание теста",
            middlewareAuth: "teacher"
        }
    },
    {
        path: '/teacher/create-question',
        component: () => import('../pages/teacher/CreateQuestion'),
        meta: {
            title: "SOLS - Создание вопросов",
            middlewareAuth: "teacher"
        }
    },
    {
        path: '/teacher/questions',
        component: () => import('../pages/teacher/Questions'),
        meta: {
            title: "SOLS - База вопросов",
            middlewareAuth: "teacher"
        }
    },
    {
        path: '/teacher/tests',
        component: () => import('../pages/teacher/Tests'),
        meta: {
            title: "SOLS - Список тестов",
            middlewareAuth: "teacher"
        }
    },
    /* student */
    {
        path: '/student',
        redirect: '/student/home'
    },
    {
        path: '/student/home',
        component: () => import('../pages/student/Home'),
        meta: {
            title: "SOLS - Кабинет студента",
            middlewareAuth: "student"
        }
    },
    {
        path: '/student/answers',
        component: () => import('../pages/student/Answers'),
        meta: {
            title: "SOLS - Мои ответы",
            middlewareAuth: "student"
        }
    },
];
