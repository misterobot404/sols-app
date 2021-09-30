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
    {
        path: '/beta',
        component: () => import('@/pages/AdaptiveTesting'),
        meta: {
            title: "SOLS - Прохождение теста"
        }
    },
    /* auth */
    {
        path: '/signin',
        component: () => import('../pages/Auth'),
        meta: {
            title: "SOLS - Вход",
            hideForAuth: true
        }
    },
    {
        path: '/signup',
        component: () => import('../pages/Auth'),
        meta: {
            title: "SOLS - Регистрация",
            hideForAuth: true
        }
    },
    {
        path: '/password/reset',
        component: () => import('../pages/Auth'),
        meta: {
            title: "SOLS - Восстановление пароля",
            hideForAuth: true
        }
    },
    /* Teacher */
    {
        path: '/Teacher',
        redirect: '/Teacher/home'
    },
    {
        path: '/Teacher/home',
        component: () => import('../pages/Teacher/Home'),
        meta: {
            title: "SOLS - Кабинет преподавателя",
            middlewareAuth: "Teacher"
        }
    },
    // tests
    {
        path: '/Teacher/tests',
        component: () => import('../pages/Teacher/Tests'),
        meta: {
            title: "SOLS - Список тестов",
            middlewareAuth: "Teacher"
        }
    },
    {
        name: "CreateTest",
        path: '/Teacher/tests/create',
        component: () => import('../pages/Teacher/SetTestData'),
        meta: {
            title: "SOLS - Создание теста",
            middlewareAuth: "Teacher"
        }
    },
    {
        name: "EditTest",
        path: '/Teacher/tests/:id/edit',
        component: () => import('../pages/Teacher/SetTestData'),
        meta: {
            title: "SOLS - Редактирование теста",
            middlewareAuth: "Teacher"
        }
    },
    // questions
    {
        name: "QuestionСategories",
        path: '/Teacher/categories/:id?',
        component: () => import('../pages/Teacher/CaQ'),
        meta: {
            title: "SOLS - База вопросов",
            middlewareAuth: "Teacher"
        }
    },
    {
        name: "CreateQuestion",
        path: '/Teacher/questions/create',
        component: () => import('../pages/Teacher/SetQuestionData'),
        meta: {
            title: "SOLS - Конструктор вопросов",
            middlewareAuth: "Teacher"
        }
    },
    {
        name: "EditQuestion",
        path: '/Teacher/questions/:id/edit',
        component: () => import('../pages/Teacher/SetQuestionData'),
        meta: {
            title: "SOLS - Редактирование вопроса",
            middlewareAuth: "Teacher"
        }
    },
    /* Student */
    {
        path: '/Student',
        redirect: '/Student/home'
    },
    {
        path: '/Student/home',
        component: () => import('../pages/Student/Home'),
        meta: {
            title: "SOLS - Кабинет студента",
            middlewareAuth: "Student"
        }
    },
    {
        path: '/Student/answers',
        component: () => import('../pages/Student/Answers'),
        meta: {
            title: "SOLS - Мои ответы",
            middlewareAuth: "Student"
        }
    },
    /* Dev */
    {
        path: '/devtest',
        component: () => import('../pages/devtest'),
    },
];
