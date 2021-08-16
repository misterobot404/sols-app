
export const routes = [
    {
        path: '/',
        redirect: '/signin',
    },
    /* testing */
    {
        path: '/tests/:id',
        component: () => import('@/pages/Testing'),
        meta: {
            title: "SOLS - Прохождение теста"
        }
    },
    /* auth */
    {
        path: '/signin',
        component: () => import('../pages/SignIn'),
        meta: {
            title: "SOLS - Вход",
            hideForAuth: true
        }
    },
    {
        path: '/signup',
        component: () => import('../pages/SignUp'),
        meta: {
            title: "SOLS - Регистрация",
            hideForAuth: true
        }
    },
    {
        path: '/username/reset',
        component: () => import('../pages/ResetUsername'),
        meta: {
            title: "SOLS - Восстановление логин",
            hideForAuth: true
        }
    },
    {
        path: '/password/reset',
        component: () => import('../pages/ResetPassword'),
        meta: {
            title: "SOLS - Восстановление пароля",
            hideForAuth: true
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
    // tests
    {
        path: '/teacher/tests',
        component: () => import('../pages/teacher/Tests'),
        meta: {
            title: "SOLS - Список тестов",
            middlewareAuth: "teacher"
        }
    },
    {
        path: '/teacher/tests/create',
        component: () => import('../pages/teacher/CreateTest'),
        meta: {
            title: "SOLS - Создание тестов",
            middlewareAuth: "teacher"
        }
    },
    {
        path: '/teacher/tests/:id/edit',
        component: () => import('../pages/teacher/EditTest'),
        meta: {
            title: "SOLS - Редактирование теста",
            middlewareAuth: "teacher"
        }
    },
    // questions
    {
        name: "QuestionСategories",
        path: '/teacher/categories/:id?',
        component: () => import('../pages/teacher/QuestionСategories'),
        meta: {
            title: "SOLS - База вопросов",
            middlewareAuth: "teacher"
        }
    },
    {
        path: '/teacher/questions/create',
        component: () => import('../pages/teacher/CreateQuestion'),
        meta: {
            title: "SOLS - Конструктор вопросов",
            middlewareAuth: "teacher"
        }
    },
    {
        path: '/teacher/questions/:id/edit',
        component: () => import('../pages/teacher/EditQuestion'),
        meta: {
            title: "SOLS - Редактирование вопроса",
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
