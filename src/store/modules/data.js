
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
                name: "Математика"
            },
            {
                id: "2",
                name: "Программирование"
            },
            {
                id: "3",
                name: "История"
            },
            {
                id: "4",
                name: "География"
            }
        ],
    },
    mutations: {
    }
}

