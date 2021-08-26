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
        testTypes: ["Тест", "Викторина", "Опрос"],
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
        questionTypes: [
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
        questionLevels: ["Лёгкий", "Средний", "Сложный"],
        rightAnswers: [
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
            return (state.rightAnswers.find(answer => answer.question_id === id));
        },
        getQuestionTypeById: state => id => {
            return (state.questionTypes.find(type => type.id === id));
        },
        getTestById: state => id => {
            return state.tests.find(test => test.id === id);
        }
    },
    actions: {
        // TEST
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
        // QUESTION
        createQuestion({state, commit}, {question, rightAnswer}) {
            return new Promise((resolve) => {
                    setTimeout(() => {
                        commit('CREATE_QUESTION', question);
                        // Костыль. в будущем id созданного вопроса мы будем получать из api
                        commit('CREATE_RIGHT_ANSWER', {
                            question_id: state.questions[state.questions.length - 1].id,
                            rightAnswer: rightAnswer
                        })
                        resolve();
                    }, 800)
                }
            )
        },
        updateQuestion({commit}, {question, rightAnswer}) {
            return new Promise((resolve) => {
                    setTimeout(() => {
                        commit('UPDATE_QUESTION', question);
                        commit('UPDATE_RIGHT_ANSWER', rightAnswer);
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
        // TEST
        CREATE_TEST(state, test) {
            // data will be added to backend
            let nextId = 1;
            state.tests.forEach((el) => {
                if (el.id >= nextId) nextId = el.id + 1;
            });
            test.id = nextId;
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
        // QUESTION
        CREATE_QUESTION(state, question) {
            // data will be added to backend
            let nextId = 1;
            state.questions.forEach((el) => {
                if (el.id >= nextId) nextId = el.id + 1;
            });
            question.id = nextId;

            state.questions.push(question);
        },
        UPDATE_QUESTION(state, question) {
            Object.assign(state.questions.find(el => el.id === question.id), question);
        },
        DELETE_QUESTION(state, id) {
            state.questions = state.questions.filter((item) => item.id !== id);
        },
        // RIGHT ANSWER
        CREATE_RIGHT_ANSWER(state, {question_id, rightAnswer}) {
            // data will be added to backend
            let nextId = 1;
            state.rightAnswers.forEach((el) => {
                if (el.id >= nextId) nextId = el.id + 1;
            });

            state.rightAnswers.push({
                id: nextId,
                question_id: question_id,
                answer: rightAnswer
            });
        },
        UPDATE_RIGHT_ANSWER(state, rightAnswer) {
            Object.assign(state.rightAnswers.find(el => el.id === rightAnswer.id), rightAnswer);
        },
        // CATEGORY
        CREATE_CATEGORY(state, category) {
            // data will be added to backend
            let nextId = 1;
            state.categories.forEach((el) => {
                if (el.id >= nextId) nextId = el.id + 1;
            });
            category.id = nextId;

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

