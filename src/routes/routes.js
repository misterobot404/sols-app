export const routes = [
    {
        path: '/',
        redirect: '/signin',
    },

    // AUTH
    {
        path: '/signin',
        component: () => import('../pages/Auth'),
        meta: {title: "SOLS - Вход"}
    },
    {
        path: '/signup',
        component: () => import('../pages/Auth'),
        meta: {title: "SOLS - Регистрация"}
    },
    {
        path: '/password/reset',
        component: () => import('../pages/Auth'),
        meta: {title: "SOLS - Восстановление пароля"}
    },

    // TEACHER
    // tests
    {
        path: '/teacher',
        redirect: '/teacher/home'
    },
    {
        path: '/teacher/home',
        component: () => import('../pages/Teacher/Home'),
        meta: {
            title: "SOLS - Кабинет преподавателя",
            middlewareAuth: "teacher"
        }
    },
    // tests
    {
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
        component: () => import('../pages/Teacher/Test'),
        meta: {
            title: "SOLS - Создание теста",
            middlewareAuth: "teacher"
        }
    },
    {
        name: "EditTest",
        path: '/teacher/tests/:id/edit',
        component: () => import('../pages/Teacher/Test'),
        meta: {
            title: "SOLS - Редактирование теста",
            middlewareAuth: "teacher"
        }
    },
    // subjects / categories / tasks
    {
        path: '/teacher/tasks',
        component: () => import('../pages/Teacher/BaseOfTasks'),
        meta: {
            title: "SOLS - База заданий",
            middlewareAuth: "teacher"
        }
    },
    {
        name: "CreateTask",
        path: '/teacher/task/create',
        component: () => import('../pages/Teacher/Task'),
        meta: {
            title: "SOLS - Конструктор заданий",
            middlewareAuth: "teacher"
        }
    },
    {
        name: "EditTask",
        path: '/teacher/task/:id/edit',
        component: () => import('../pages/Teacher/Task'),
        meta: {
            title: "SOLS - Редактирование задания",
            middlewareAuth: "teacher"
        }
    },
    // groups
    {
        path: '/teacher/groups',
        component: () => import('../pages/Teacher/Groups'),
        meta: {
            title: "SOLS - Учебные группы",
            middlewareAuth: "teacher"
        }
    },

    // STUDENT
    {
        path: '/student',
        redirect: '/student/tests'
    },
    // Активные и доступные тесты
    {
        path: '/student/tests',
        component: () => import('../pages/Student/Tests'),
        meta: {
            title: "SOLS - Кабинет студента",
            middlewareAuth: "student"
        }
    },
    // Результаты тестирования
    {
        path: '/student/results',
        component: () => import('../pages/Student/Results'),
        meta: {
            title: "SOLS - Результаты тестирования",
            middlewareAuth: "student"
        }
    },
    // Прохождение теста
    {
        path: '/student/tests/:id',
        component: () => import('@/pages/Student/Testing'),
        meta: {
            title: "SOLS - Прохождение теста"
        }
    },

    // Адаптивное тестирование
    {
        path: '/beta',
        component: () => import('@/pages/AdaptiveTesting'),
        meta: {
            title: "SOLS - Прохождение теста"
        }
    },

    {
        path: '*',
        redirect: '/',
    },
];
