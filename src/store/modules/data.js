// import axios from "axios";

export default {
    namespaced: true,
    state: {
        categories: [
            {
                id: 1,
                name: "Математика",
            },
            {
                id: 2,
                name: "Программирование",
            },
            {
                id: 3,
                name: "История",
            },
            {
                id: 4,
                name: "География",
            }
        ],
        tests: [
            {
                id: 1,
                is_active: true,
                type: "Тест",
                name: "Тестовое задание",
                count_of_questions_by_lvl: [3, 6, 3],
                category_ids: [2, 1],
                date_of_beginning: new Date("Thu Jul 29 2021 17:32:35 GMT+1000 (GMT+10:00)"),
                date_of_finishing: new Date("Thu Jul 30 2021 17:32:35 GMT+1000 (GMT+10:00)"),
                testing_time: 90,
                password: null,
                created_at: new Date("Thu Jul 29 2021 17:32:35 GMT+1000 (GMT+10:00)")
            }
        ],
        test_types: ["Тест", "Викторина", "Опрос"],
        questions: [
            {
                id: 1,
                commentary: "",
                level: "Средний",
                text: '<p>qweqwe</p>',
                // refs
                category_id: 2,
                type_id: 2
            },
            {
                id: 2,
                commentary: "Коментарий",
                level: "Лёгкий",
                text: '<p>qweqwe</p>',
                body: ["qwe", "2"],
                // refs
                category_id: 1,
                type_id: 1
            }
        ],
        question_types: [
            {
                id: 1,
                component: "ChoiceAnswer",
                name: "Выбор ответа"
            },
            {
                id: 2,
                component: "TextAnswer",
                name: "Текстовый ввод"
            },
            {
                id: 3,
                component: "RangingAnswer",
                name: "Ранжирование"
            },
            {
                id: 4,
                component: "ConformityAnswer",
                name: "Соответствие"
            },
            {
                id: 5,
                component: "AlternativeAnswer",
                name: "Альтернативный ввод"
            }
        ],
        question_levels: ["Лёгкий", "Средний", "Сложный"],
        right_answers: [
            {
                id: 1,
                question_id: "1",
                answer: ["qwe"],
            },
            {
                id: 2,
                question_id: 2,
                answer: ["2"],
            },
        ],
    },
    getters: {
        getCategoryById: state => id => {
            return state.categories.find(category => category.id === id);
        },
        getQuestionsByCategoryId: state => id => {
            return state.questions.filter(question => question.category_id === id);
        },
        getQuestionById: state => id => {
            return (state.questions.find(question => question.id === id));
        },
        getRightAnswerByQuestionId: state => id => {
            return (state.right_answers.find(answer => answer.question_id === id));
        },
        getQuestionTypeById: state => id => {
            return (state.question_types.find(type => type.id === id));
        },
        getTestById: state => id => {
            return state.tests.find(test => test.id === id);
        }
    },
    actions: {
        createTest({commit}, test) {
            return new Promise((resolve) => {
                    setTimeout(() => {
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

        createQuestion({state, commit}, {question, right_answer}) {
            return new Promise((resolve) => {
                    setTimeout(() => {
                        commit('CREATE_QUESTION', question);
                        // Костыль. в будущем id созданного вопроса мы будем получать из api
                        commit('CREATE_RIGHT_ANSWER', {
                            question_id: state.questions[state.questions.length - 1].id,
                            rightAnswer: right_answer
                        })
                        resolve();
                    }, 800)
                }
            )
        },
        updateQuestion({commit}, {question, right_answer}) {
            return new Promise((resolve) => {
                    setTimeout(() => {
                        commit('UPDATE_QUESTION', question);
                        console.log(right_answer);
                        commit('UPDATE_RIGHT_ANSWER', right_answer);
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

        createCategory({commit}, category) {
            return new Promise((resolve) => {
                    setTimeout(() => {
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
        CREATE_TEST(state, test) {
            // data will be added to backend
            let next_id = 1;
            state.tests.forEach((el) => {
                if (el.id >= next_id) next_id = el.id + 1;
            });
            test.id = next_id;
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

        CREATE_QUESTION(state, question) {
            // data will be added to backend
            let next_id = 1;
            state.questions.forEach((el) => {
                if (el.id >= next_id) next_id = el.id + 1;
            });
            question.id = next_id;

            state.questions.push(question);
        },
        UPDATE_QUESTION(state, question) {
            Object.assign(state.questions.find(el => el.id === question.id), question);
        },
        DELETE_QUESTION(state, id) {
            state.questions = state.questions.filter((item) => item.id !== id);
        },

        CREATE_RIGHT_ANSWER(state, {question_id, right_answer}) {
            // data will be added to backend
            let next_id = 1;
            state.right_answers.forEach((el) => {
                if (el.id >= next_id) next_id = el.id + 1;
            });

            state.right_answers.push({
                id: next_id,
                question_id: question_id,
                answer: right_answer
            });
        },
        UPDATE_RIGHT_ANSWER(state, right_answer) {
            Object.assign(state.right_answers.find(el => el.id === right_answer.id), right_answer);
        },

        CREATE_CATEGORY(state, category) {
            // data will be added to backend
            let next_id = 1;
            state.categories.forEach((el) => {
                if (el.id >= next_id) next_id = el.id + 1;
            });
            category.id = next_id;

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

