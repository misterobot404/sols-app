import axios from "axios";

export default {
    namespaced: true,
    state: {
        host: "http://192.168.77.13",
        // Признак загрузки данных
        // При состоянии false будет производится переход на страницу получения данных /update
        data_loaded: false,

        // groups: [],
        tests: [
            {
                id: 1,
                is_active: true,
                type: "Тест",
                name: "Тестовое задание 1",
                count_of_tasks_by_lvl: [3, 6, 3],
                category_ids: [2, 1],
                date_of_beginning: new Date("Thu Jul 29 2021 17:32:35 GMT+1000 (GMT+10:00)"),
                date_of_finishing: new Date("Thu Jul 30 2021 17:32:35 GMT+1000 (GMT+10:00)"),
                testing_time: 90,
                password: null,
                created_at: new Date("Thu Jul 29 2021 17:32:35 GMT+1000 (GMT+10:00)")
            },
            {
                id: 2,
                is_active: true,
                type: "Тест",
                name: "Тестовое задание 2",
                count_of_tasks_by_lvl: [3, 6, 3],
                category_ids: [2, 1],
                date_of_beginning: new Date("Thu Jul 29 2021 17:32:35 GMT+1000 (GMT+10:00)"),
                date_of_finishing: new Date("Thu Jul 30 2021 17:32:35 GMT+1000 (GMT+10:00)"),
                testing_time: 90,
                password: null,
                created_at: new Date("Thu Jul 29 2021 17:32:35 GMT+1000 (GMT+10:00)")
            },
            {
                id: 3,
                is_active: true,
                type: "Тест",
                name: "Тестовое задание 3",
                count_of_tasks_by_lvl: [3, 6, 3],
                category_ids: [2, 1],
                date_of_beginning: new Date("Thu Jul 29 2021 17:32:35 GMT+1000 (GMT+10:00)"),
                date_of_finishing: new Date("Thu Jul 30 2021 17:32:35 GMT+1000 (GMT+10:00)"),
                testing_time: 90,
                password: null,
                created_at: new Date("Thu Jul 29 2021 17:32:35 GMT+1000 (GMT+10:00)")
            },
            {
                id: 4,
                is_active: true,
                type: "Тест",
                name: "Тест без времени",
                count_of_tasks_by_lvl: [3, 3, 3],
                category_ids: [2, 1],
                date_of_beginning: null,
                date_of_finishing: null,
                testing_time: null,
                password: null,
                created_at: new Date("Thu Jul 29 2021 17:32:35 GMT+1000 (GMT+10:00)")
            },
        ],
        subjects: [
            {
                id: 1,
                name: 'Резание материалов',
            },
            {
                id: 2,
                name: 'Управление персоналом',
            },
            {
                id: 3,
                name: 'Психология и педагогика',
            },
        ],
        categories: [
            {
                id: 1,
                subject_id: 1,
                name: 'Наростообразование',
            },
            {
                id: 2,
                subject_id: 1,
                name: 'Геометрические параметры инструмента',
            },
            {
                id: 3,
                subject_id: 1,
                name: 'Деформация стружки',
            },
            {
                id: 4,
                subject_id: 1,
                name: 'Стужкообразование при резании',
            },
            {
                id: 5,
                subject_id: 2,
                name: 'Наростообразование2',
            },
            {
                id: 6,
                subject_id: 2,
                name: 'Геометрические параметры инструмента2',
            },
            {
                id: 7,
                subject_id: 2,
                name: 'Деформация стружки2',
            },
            {
                id: 8,
                subject_id: 2,
                name: 'Стужкообразование при резании2',
            }
        ],
        tasks: [
            {
                id: 1,
                commentary: null,
                level: "Средний",
                text: '<p>Как называется первый язык программирования?</p>',
                // refs
                category_id: 2,
                type_id: 3
            },
            {
                id: 2,
                commentary: null,
                level: "Лёгкий",
                text: '<p>Что из перечисленного относится к трём китам ООП (три основные понятия)?</p>',
                body: ["Модульность", "Однозначность", "Наследование", "Полиморфизм", "Разделение обязанностей", "Строгая типизация", "Инкапсуляция"],
                // refs
                category_id: 2,
                type_id: 2
            },
            {
                id: 3,
                commentary: null,
                level: "Сложный",
                text: '<p>Выберите правильную структуру альтернативного условного оператора (полный вариант)</p>',
                body: [
                    "If <условие> Then <оператор 1>",
                    "If <условие> Then <оператор 1> Else <оператор 2>",
                    "If <условие> Then <оператор 1> <оператор 2>",
                    "If <условие 1> Then if <условие 2> Then <оператор 1> <оператор 2>"
                ],
                // refs
                category_id: 2,
                type_id: 1
            },
            {
                id: 4,
                commentary: null,
                level: "Сложный",
                text: '<p>Расположите события в порядке следования</p>',
                body: ["Событие 1", "Событие 2", "Событие 3"],
                // refs
                category_id: 3,
                type_id: 4
            },
            {
                id: 5,
                commentary: null,
                level: "Сложный",
                text: '<p>Соотнесите события</p>',
                body: {
                    left_list: ["Событие 1", "Событие 2", "Событие 3"],
                    right_list: ["1998", "2000"]
                },
                // refs
                category_id: 3,
                type_id: 5
            }
        ],

        active_tests: [
            {
                id: 1,
                user_id: 1,
                test_id: 4,
                created_at: new Date(),
                tasks: [
                    {
                        task_id: 1,
                        answer: "Ключ ответа"
                    },
                    {
                        task_id: 2,
                        answer: null
                    },
                    {
                        task_id: 3,
                        answer: null
                    },
                    {
                        task_id: 4,
                        answer: null
                    },
                    {
                        task_id: 5,
                        answer: null
                    },
                ]
            }
        ],
        test_types: [
            {name: "Тест"},
            {name: "Викторина (в разработке)"},
            {name: "Опрос (в разработке)"}
        ],

        task_types: [
            {
                id: 1,
                component: "SingleChoice",
                icon: "check",
                name: "Одиночный выбор"
            },
            {
                id: 2,
                component: "MultiChoice",
                icon: "done_all",
                name: "Множественный выбор"
            },
            {
                id: 3,
                component: "TextInput",
                icon: "edit",
                name: "Текстовый ввод"
            },
            {
                id: 4,
                component: "Ranging",
                icon: "low_priority",
                name: "Ранжирование"
            },
            {
                id: 5,
                component: "Conformity",
                icon: "settings_input_component",
                name: "Соответствие"
            },
            {
                id: 6,
                component: "FileUpload",
                icon: "save",
                name: "Загрузка файла"
            }
        ],
        task_levels: ["Лёгкий", "Средний", "Сложный"],
        right_answers: [
            {
                id: 1,
                task_id: 1,
                answer: ["Паскаль"],
            },
            {
                id: 2,
                task_id: 2,
                answer: ["Наследование", "Полиморфизм", "Инкапсуляция"],
            },
            {
                id: 3,
                task_id: 3,
                answer: "If <условие> Then <оператор 1>",
            },
            {
                id: 4,
                task_id: 4,
                answer: [3, 1, 2],
            },
            {
                id: 5,
                task_id: 5,
                answer: [1, 1, 2],
            },
        ],
    },
    getters: {
        getCategoryById: state => id => {
            return state.categories.find(category => category.id === id);
        },
        getTasksByCategoryId: state => category_id => {
            return state.tasks.filter(task => task.category_id === category_id);
        },
        getTaskById: state => id => {
            return state.tasks.find(task => task.id === id);
        },
        getRightAnswerByTaskId: state => task_id => {
            return (state.right_answers.find(answer => answer.task_id === task_id));
        },
        getTaskTypeById: state => id => {
            return (state.task_types.find(type => type.id === id));
        },
        getTestById: state => id => {
            return state.tests.find(test => test.id === id);
        },
        getActiveTestByTestId: state => test_id => {
            return state.active_tests.find(active_test => active_test.test_id === test_id);
        }
    },
    actions: {
        // Получить все данные пользователя
        getAllData({dispatch}) {
            return dispatch('getTests');
        },

        //// КАБИНЕТ ПРЕПОДОВАТЕЛЯ
        // GROUP
        /*getGroups({state, commit}) {
            return axios.get(state.host + '/api/groups', {
                params: {
                    department: "ПУРИС"
                }
            }).then(response => {
                commit('SET_GROUPS', response.data.data);
            })
        },*/
        // TEST
        getTests({state, commit}) {
            return axios.get(state.host + '/api/tests')
                .then(response => {
                    //commit('SET_TESTS', response.data.info);
                })
        },
        createTest({commit}, test) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    commit('CREATE_TEST', test);
                    resolve();
                }, 400)
            })
        },
        updateTest({commit}, test) {
            return new Promise((resolve) => {
                    setTimeout(() => {
                        commit('UPDATE_TEST', test);
                        resolve();
                    }, 400)
                }
            )
        },
        deleteTest({commit}, id) {
            return new Promise((resolve) => {
                    setTimeout(() => {
                        commit('DELETE_TEST', id);
                        resolve();
                    }, 400)
                }
            )
        },
        // SUBJECT
        // CATEGORY
        createCategory({commit}, category) {
            return new Promise((resolve) => {
                    setTimeout(() => {
                        commit('CREATE_CATEGORY', category);
                        resolve();
                    }, 400)
                }
            )
        },
        updateCategory({commit}, category) {
            return new Promise((resolve) => {
                    setTimeout(() => {
                        commit('UPDATE_CATEGORY', category);
                        resolve();
                    }, 400)
                }
            )
        },
        deleteCategory({commit}, id) {
            return new Promise((resolve) => {
                    setTimeout(() => {
                        commit('DELETE_CATEGORY', id);
                        resolve();
                    }, 400)
                }
            )
        },
        // TASK
        createTask({state, commit}, {task, right_answer}) {
            return new Promise((resolve) => {
                    setTimeout(() => {
                        commit('CREATE_TASK', task);
                        // Костыль. в будущем id созданного вопроса мы будем получать из api
                        commit('CREATE_RIGHT_ANSWER', {
                            task_id: state.tasks[state.tasks.length - 1].id,
                            right_answer: right_answer
                        })
                        resolve();
                    }, 400)
                }
            )
        },
        updateTask({commit}, {task, right_answer}) {
            return new Promise((resolve) => {
                    setTimeout(() => {
                        commit('UPDATE_TASK', task);
                        commit('UPDATE_RIGHT_ANSWER', right_answer);
                        resolve();
                    }, 400)
                }
            )
        },
        deleteTask({commit}, id) {
            return new Promise((resolve) => {
                    setTimeout(() => {
                        commit('DELETE_TASK', id);
                        resolve();
                    }, 400)
                }
            )
        },

        //// КАБИНЕТ СТУДЕНТА
        // ACTIVE TEST
        getActiveTest() {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                }, 800)
            })
        },
        startTest({commit}, test_id) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    commit('CREATE_ACTIVE_TEST', {test_id: test_id});
                    resolve();
                }, 400)
            })
        },
        getAllActiveTests({state}) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                }, 800)
            })
        },
    },
    mutations: {
        SET_DATA_LOADED(state, status) {
            state.data_loaded = status;
        },

        // GROUP
        SET_GROUPS(state, groups) {
            state.groups = groups;
        },
        // TEST
        SET_TESTS(state, tests) {
            state.tests = tests;
        },
        CREATE_TEST(state, test) {
            // data will be added to backend
            test.id = Math.max(...state.tests.map(el => el.id)) + 1;
            test.created_at = new Date();
            test.is_active = true;

            state.tests.push(test);
        },
        UPDATE_TEST(state, test) {
            Object.assign(state.tests.find(el => el.id === test.id), test);
        },
        ARCHIVE_TEST(state, id) {
            state.tests.find(el => el.id === id).is_active = false;
        },
        UNARCHIVE_TEST(state, id) {
            state.tests.find(el => el.id === id).is_active = true;
        },
        DELETE_TEST(state, id) {
            state.tests = state.tests.filter((item) => item.id !== id);
        },
        // SUBJECT

        // CATEGORY
        CREATE_CATEGORY(state, category) {
            // data will be added to backend
            category.id = Math.max(...state.categories.map(el => el.id)) + 1;

            state.categories.push(category);
        },
        UPDATE_CATEGORY(state, category) {
            Object.assign(state.categories.find(el => el.id === category.id), category);
        },
        DELETE_CATEGORY(state, id) {
            // удаление категории из тестов
            state.tests.forEach(el => el.category_ids = el.category_ids.filter((item) => item !== id));
            // удаление вопросов относящихся к категории
            state.tasks = state.tasks.filter((item) => item.category_id !== id)
            // удаление категории
            state.categories = state.categories.filter((item) => item.id !== id);
        },
        // TASK
        CREATE_TASK(state, task) {
            // data will be added to backend
            task.id = Math.max(...state.tasks.map(el => el.id)) + 1;

            state.tasks.push(task);
        },
        UPDATE_TASK(state, task) {
            Object.assign(state.tasks.find(el => el.id === task.id), task);
        },
        DELETE_TASK(state, id) {
            state.tasks = state.tasks.filter((item) => item.id !== id);
        },
        // RIGHT_ANSWER
        CREATE_RIGHT_ANSWER(state, {task_id, right_answer}) {
            state.right_answers.push({
                id: Math.max(...state.right_answers.map(el => el.id)) + 1,
                task_id: task_id,
                answer: right_answer
            });
        },
        UPDATE_RIGHT_ANSWER(state, right_answer) {
            Object.assign(state.right_answers.find(el => el.id === right_answer.id), right_answer);
        },
        // ACTIVE_TEST
        CREATE_ACTIVE_TEST(state, active_test) {
            // data will be added to backend
            active_test.id = Math.max(...state.active_tests.map(el => el.id)) + 1;
            active_test.created_at = new Date();
            active_test.tasks = [
                {
                    task_id: 1,
                    answer: "Ключ ответа"
                },
                {
                    task_id: 2,
                    answer: null
                },
                {
                    task_id: 3,
                    answer: null
                },
                {
                    task_id: 4,
                    answer: null
                },
                {
                    task_id: 5,
                    answer: null
                },
            ];
            state.active_tests.push(active_test);
        },
    }
}

