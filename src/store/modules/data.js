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
        // test data
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
        testTypes: ["Тест", "Викторина", "Опрос"],
        // question data
        questions: [
            {}
        ],
        questionTypes: [
            {
                component: "ChoiceAnswer",
                name: "Выбор ответа"
            },
            {
                component: "TextAnswer",
                name: "Текстовый ввод"
            },
            {
                component: "RangingAnswer",
                name: "Ранжирование"
            },
            {
                component: "ConformityAnswer",
                name: "Соответствие"
            },
            {
                component: "AlternativeAnswer",
                name: "Альтернативный ввод"
            }
        ],
        questionLevels: ["Легкий", "Средний", "Сложный"],
    },
    getters: {
        getCategoryById: state => id => {
            return state.categories.find(category => category.id === id);
        },
        getTestById: state => id => {
            return state.tests.find(test => test.id === id);
        }
    },
    mutations: {
        CREATE_TEST(state, test) {
            // data will be added to backend
            let nextId = 1;
            state.tests.forEach((el) => {
                if (el.id >= nextId) nextId = el.id + 1;
            });
            test.id = nextId;
            test.created_at = new Date();

            state.tests.push(test);
        },
        ARCHIVE_TEST(state, test_id) {
            let test = state.tests.find(el => el.id === test_id);
            test.is_active = false;
        },
        UNARCHIVE_TEST(state, test_id) {
            let test = state.tests.find(el => el.id === test_id);
            test.is_active = true;
        },
        DELETE_TEST(state, test_id) {
            let testIndex = state.tests.findIndex(el => el.id === test_id);
            state.tests = state.tests.slice(testIndex, 1);
        },
        CREATE_QUESTION(state, payload) {
            let selectedCategories = state.questionCategories.find(el => el.id === payload.selectedCategoriesId);
            selectedCategories.questions.push(payload);
        }
    }
}

