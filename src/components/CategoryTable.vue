<template>
  <v-data-table
      loader-height="2"
      :loading="loading"
      :headers="headers"
      :items="tableData"
      :search="search"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      no-results-text="Данные не найдены"
      no-data-text="Нет данных"
      @click:row="goToCategory"
      class="row-pointer"
      locale="ru-RU"
      :footer-props="{'items-per-page-text':'Строк на странице:'}"
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
        <v-btn icon class="ml-2" @click="sync">
          <v-icon>
            sync
          </v-icon>
        </v-btn>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-btn icon @click.stop="edit(item)">
        <v-icon class="material-icons-outlined">
          edit
        </v-icon>
      </v-btn>
      <v-btn icon @click.stop="deleteTest(item)">
        <v-icon>
          delete_outline
        </v-icon>
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import {mapMutations, mapState} from 'vuex'

export default {
  name: "CategoryTable",
  data() {
    return {
      loading: false,
      search: "",
      sortBy: 'count_of_questions',
      sortDesc: true,
      headers: [
        {
          text: 'Название',
          value: 'name',
        },
        {text: 'Лёгких вопросов', value: 'count_of_easy_q', align: 'center'},
        {text: 'Средних вопросов', value: 'count_of_normal_q', align: 'center'},
        {text: 'Сложных вопросов', value: 'count_of_hard_q', align: 'center'},
        {text: 'Всего вопросов', value: 'count_of_questions', align: 'center'},
        {value: 'actions', sortable: false, align: 'right'}
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
      return result.reverse();
    }
  },
  methods: {
    ...mapMutations('layout', ['SHOW_MSG_DIALOG']),
    goToCategory(category) {
      this.$router.push("categories/" + category.id)
    },
    sync() {
      this.loading = true;
      setTimeout(() => {
        this.SHOW_MSG_DIALOG({type: 'primary', text: 'Данные обновлены'});
        this.loading = false;
      }, 1000);
    }
  }
}
</script>

<style scoped>
.row-pointer >>> tbody tr :hover {
  cursor: pointer;
}
</style>