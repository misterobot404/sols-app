export default {
    namespaced: true,
    state: {
        testTypes: ["Тест", "Викторина", "Опрос"],
        answerTypes: [
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
        questionCategories: [
            {
                id: "1",
                name: "Математика",
                questions: []
            },
            {
                id: "2",
                name: "Программирование",
                questions: []
            },
            {
                id: "3",
                name: "История",
                questions: []
            },
            {
                id: "4",
                name: "География",
                questions: []
            }
        ],
        tests: [],
    },
    mutations: {
        CREATE_TEST(state, test) {
            // data will be added to backend
            let nextId = 1;
            state.tests.forEach((el) => {
                if (el.id >= nextId) nextId = el.id + 1;
            });
            test.id = nextId;
            test.created_at = new Date().toISOString().split('T')[0];

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
        ADD_QUESTION_TO_CATEGORY(state, payload) {
            let selectedCategories = state.questionCategories.find(el => el.id === payload.selectedCategoriesId);
            selectedCategories.questions.push(payload);
        }
    }
}

