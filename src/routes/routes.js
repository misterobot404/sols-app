export const routes = [
    {
        path: '/',
        redirect: '/signin',
    },
    /* testing */
    {
        path: '/tests/:id',
        component: () => import('@/pages/TestingProcess'),
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

    // TEACHER
    {

        path: '/teacher',
        redirect: '/teacher/home'
    },
    {
        name: "TeacherHome",
        path: '/teacher/home',
        component: () => import('../pages/Teacher/Home'),
        meta: {
            title: "SOLS - Кабинет преподавателя",
            middlewareAuth: "teacher"
        }
    },
    // tests
    {
        name: "Tests",
        path: '/teacher/tests',
        component: () => import('../pages/Teacher/Tests'),
        meta: {
            title: "SOLS - Список тестов",
            middlewareAuth: "teacher"
        }
    },
    {
        name: "CreateTest",
        path: '/teacher/tests/create',
        component: () => import('../pages/Teacher/SetTestData'),
        meta: {
            title: "SOLS - Создание теста",
            middlewareAuth: "teacher"
        }
    },
    {
        name: "EditTest",
        path: '/teacher/tests/:id/edit',
        component: () => import('../pages/Teacher/SetTestData'),
        meta: {
            title: "SOLS - Редактирование теста",
            middlewareAuth: "teacher"
        }
    },
    // questions
    {
        name: "BaseOfQuestions",
        path: '/teacher/categories/:id?',
        component: () => import('../pages/Teacher/BaseOfQuestions'),
        meta: {
            title: "SOLS - База вопросов",
            middlewareAuth: "teacher"
        }
    },
    {
        name: "CreateQuestion",
        path: '/teacher/questions/create',
        component: () => import('../pages/Teacher/SetQuestionData'),
        meta: {
            title: "SOLS - Конструктор вопросов",
            middlewareAuth: "teacher"
        }
    },
    {
        name: "EditQuestion",
        path: '/teacher/questions/:id/edit',
        component: () => import('../pages/Teacher/SetQuestionData'),
        meta: {
            title: "SOLS - Редактирование вопроса",
            middlewareAuth: "teacher"
        }
    },

    // STUDENT
    {
        path: '/student',
        redirect: '/student/home'
    },
    {
        path: '/student/home',
        component: () => import('../pages/Student/Home'),
        meta: {
            title: "SOLS - Кабинет студента",
            middlewareAuth: "student"
        }
    },
    {
        path: '/student/answers',
        component: () => import('../pages/Student/Answers'),
        meta: {
            title: "SOLS - Мои ответы",
            middlewareAuth: "student"
        }
    },

    {
        path: '*',
        redirect: '/',
    },
];
