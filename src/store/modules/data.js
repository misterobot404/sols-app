
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
        tests: [],
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
    },
    mutations: {
        CREATE_TEST(state, test) {
            state.tests.push(test);
        },
        ADD_QUESTION_TO_CATEGORY(state, payload) {
            let selectedCategories = state.questionCategories.find(el => el.id === payload.selectedCategoriesId);
            selectedCategories.questions.push(payload);
        }
    }
}

