// import axios from "axios";

export default {
    namespaced: true,
    state: {
        categories: [
            {
                id: "1",
                name: "Математика",
            },
            {
                id: "2",
                name: "Программирование",
            },
            {
                id: "3",
                name: "История",
            },
            {
                id: "4",
                name: "География",
            }
        ],
        //
        tests: [
            {
                "id": 1,
                "is_active": true,
                "type": "Тест",
                "name": "Тестовое задание",
                "count_of_questions_by_lvl": [3, 6, 3],
                "category_ids": ["2", "1"],
                "date_of_beginning": new Date("Thu Jul 29 2021 17:32:35 GMT+1000 (GMT+10:00)"),
                "date_of_finishing": new Date("Thu Jul 30 2021 17:32:35 GMT+1000 (GMT+10:00)"),
                "testing_time": "90",
                "password": null,
                "created_at": new Date("Thu Jul 29 2021 17:32:35 GMT+1000 (GMT+10:00)")
            }
        ],
        // test data
        testTypes: ["Тест", "Викторина", "Опрос"],
        //
        questions: [
            {
                id: "1",
                commentary: "",
                level: "Средний",
                text: '<p>qweqwe</p>',
                answers: [
                    {text: "qweqwe"}
                ],
                // refs
                category_id: "2",
                type_id: "2"
            },
            {
                id: "2",
                commentary: "Коментарий",
                level: "Лёгкий",
                text: '<p>qweqwe</p>',
                answers: [
                    {"text": "1", "correct": true},
                    {"text": "2", "correct": false}
                ],
                // refs
                category_id: "1",
                type_id: "1"
            }
        ],
        // question data
        questionTypes: [
            {
                id: "1",
                component: "ChoiceAnswer",
                name: "Выбор ответа"
            },
            {
                id: "2",
                component: "TextAnswer",
                name: "Текстовый ввод"
            },
            {
                id: "3",
                component: "RangingAnswer",
                name: "Ранжирование"
            },
            {
                id: "4",
                component: "ConformityAnswer",
                name: "Соответствие"
            },
            {
                id: "5",
                component: "AlternativeAnswer",
                name: "Альтернативный ввод"
            }
        ],
        questionLevels: ["Лёгкий", "Средний", "Сложный"],
    },
    getters: {
        getCategoryById: state => id => {
            return state.categories.find(category => category.id === id);
        },
        getQuestionsByCategoryId: state => id => {
            return state.questions.filter(question => question.category_id === id);
        },
        getQuestionTypeNameById: state => id => {
            return (state.questionTypes.find(type => type.id === id)).name;
        },
        getTestById: state => id => {
            return state.tests.find(test => test.id === id);
        }
    },
    actions: {
        // TEST
        createTest({state, commit}, test) {
            return new Promise((resolve) => {
                    setTimeout(() => {
                        // data will be added to backend
                        let nextId = 1;
                        state.tests.forEach((el) => {
                            if (el.id >= nextId) nextId = el.id + 1;
                        });
                        test.id = nextId;
                        test.created_at = new Date();
                        test.is_active = true;

                        commit('CREATE_TEST', test);
                        resolve();
                    }, 800)
                }
            )
        },
        updateTest({commit}, test) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    commit('UPDATE_TEST', test);
                    resolve();
                }, 800)
                }
            )
        },
        deleteTest({commit}, id) {
            return new Promise((resolve) => {
                    setTimeout(() => {
                        commit('DELETE_TEST', id);
                        resolve();
                    }, 800)
                }
            )
        },
        // QUESTION
        createQuestion({state, commit}, question) {
            return new Promise((resolve) => {
                    setTimeout(() => {
                        // data will be added to backend
                        let nextId = 1;
                        state.tests.forEach((el) => {
                            if (el.id >= nextId) nextId = el.id + 1;
                        });
                        question.id = nextId;

                        commit('CREATE_QUESTION', question);
                        resolve();
                    }, 800)
                }
            )
        },
        updateQuestion({commit}, question) {
            return new Promise((resolve) => {
                    setTimeout(() => {
                        commit('UPDATE_QUESTION', question);
                        resolve();
                    }, 800)
                }
            )
        },
        deleteQuestion({commit}, id) {
            return new Promise((resolve) => {
                    setTimeout(() => {
                        commit('DELETE_QUESTION', id);
                        resolve();
                    }, 800)
                }
            )
        },
        // CATEGORY
        createCategory({state, commit}, category) {
            return new Promise((resolve) => {
                    setTimeout(() => {
                        // data will be added to backend
                        let nextId = 1;
                        state.categories.forEach((el) => {
                            if (el.id >= nextId) nextId = el.id + 1;
                        });
                        category.id = nextId;

                        commit('CREATE_CATEGORY', category);
                        resolve();
                    }, 800)
                }
            )
        },
        updateCategory({commit}, category) {
            return new Promise((resolve) => {
                    setTimeout(() => {
                        commit('UPDATE_CATEGORY', category);
                        resolve();
                    }, 800)
                }
            )
        },
        deleteCategory({commit}, id) {
            return new Promise((resolve) => {
                    setTimeout(() => {
                        commit('DELETE_CATEGORY', id);
                        resolve();
                    }, 800)
                }
            )
        },
    },
    mutations: {
        // TEST
        CREATE_TEST(state, test) {
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
        // QUESTION
        CREATE_QUESTION(state, question) {
            state.questions.push(question);
        },
        UPDATE_QUESTION(state, question) {
            Object.assign(state.questions.find(el => el.id === question.id), question);
        },
        DELETE_QUESTION(state, id) {
            state.questions = state.questions.filter((item) => item.id !== id);
        },
        // CATEGORY
        CREATE_CATEGORY(state, category) {
            state.categories.push(category);
        },
        UPDATE_CATEGORY(state, category) {
            Object.assign(state.categories.find(el => el.id === category.id), category);
        },
        DELETE_CATEGORY(state, id) {
            state.categories = state.categories.filter((item) => item.id !== id);
        },
    }
}

