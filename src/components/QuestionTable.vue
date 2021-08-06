<template>
  <v-data-table
      :loading="loading"
      :headers="headers"
      :items="tableData"
      :search="search"
      no-results-text="Данные не найдены"
      no-data-text="Нет данных"
      locale="ru-RU"
  >
    <template v-slot:top>
      <v-toolbar flat class="mb-4">
        <v-spacer/>
        <v-text-field
            v-model="search"
            append-icon="search"
            label="Поиск..."
            style="max-width: 340px"
            single-line
            hide-details
        />
      </v-toolbar>
    </template>
  </v-data-table>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: "QuestionTable",
  data() {
    return {
      loading: false,
      search: "",
      headers: [
        {
          text: 'Название',
          value: 'name',
        },
        {text: 'Всего вопросов', value: 'count_of_questions'},
        {text: 'Лёгких вопросов', value: 'count_of_easy_q'},
        {text: 'Средних вопросов', value: 'count_of_normal_q'},
        {text: 'Сложных вопросов', value: 'count_of_hard_q'},
      ]
    }
  },
  computed: {
    ...mapState('data', ["categories", "questions"]),
    tableData() {
      // DATE FORMATTING FOR PRINTF TO TABLE
      let result = this.categories.map(a => Object.assign({}, a));
      result.forEach(category => {
        category.count_of_questions = 0;
        category.count_of_easy_q = 0;
        category.count_of_normal_q = 0;
        category.count_of_hard_q = 0;
        this.questions.forEach(question => {
          if (question.category_id === category.id) {
            if (question.level === "Лёгкий") category.count_of_easy_q++;
            else if (question.level === "Средний") category.count_of_normal_q++;
            else if (question.level === "Сложный") category.count_of_hard_q++;
            category.count_of_questions++;
          }
        })
      })
      return result;
    }
  },
  methods: {
    goToCategory(category) {
      this.$router.push("categories/" + category.id)
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.loading = true;
      setTimeout(() => {
        vm.loading = false;
      }, 800);
      next()
    })
  }
}
</script>