<template>
  <v-data-table
      loader-height="2"
      :loading="loading"
      :headers="headers"
      :items="tableData"
      :search="search"
      no-results-text="Данные не найдены"
      no-data-text="Нет данных"
      locale="ru-RU"
      :footer-props="{'items-per-page-text':'Строк на странице:'}"
  >
    <template v-slot:top>
      <v-toolbar flat class="mb-4">
        <v-btn to="/teacher/categories" exact icon class="mr-1">
          <v-icon>
            chevron_left
          </v-icon>
        </v-btn>
        <h2>{{ getCategoryById(categoryId).name }}</h2>
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
      <v-btn icon :to="'/teacher/questions/' + item.id + '/edit'">
        <v-icon class="material-icons-outlined">
          edit
        </v-icon>
      </v-btn>
      <v-btn icon @click="deleteTest(item)">
        <v-icon>
          delete_outline
        </v-icon>
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import {mapMutations, mapGetters, mapState} from 'vuex'

export default {
  name: "QuestionTable",
  props: {
    categoryId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      search: "",
      headers: [
        {text: 'Текст вопроса', value: 'text'},
        {text: 'Уровень сложности', value: 'level'},
        {text: 'Тип', value: 'type_name'},
        {text: 'Примечание', value: 'commentary'},
        {value: 'actions', sortable: false, align: 'right', class: 'small-table-col'},
      ]
    }
  },
  computed: {
    ...mapGetters('data', [
      'getCategoryById',
      'getQuestionsByCategoryId',
      'getQuestionTypeNameById'
    ]),
    ...mapState('data', ["categories", "questions"]),
    tableData() {
      // DATE FORMATTING FOR PRINTF TO TABLE
      let result = this.getQuestionsByCategoryId(this.categoryId).map(a => Object.assign({}, a));
      result.forEach(question => {
        question.type_name = this.getQuestionTypeNameById(question.type_id);
        // remove html tags
        question.text = question.text.replace(/(<([^>]+)>)/gi, "");
      });
      result.forEach(el => el.commentary ? null : el.commentary = "Не установлено");
      return result.reverse();
    }
  },
  methods: {
    ...mapMutations('layout', ['SHOW_MSG_DIALOG']),
    sync() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.SHOW_MSG_DIALOG({type: 'primary', text: 'Данные обновлены'});
      }, 1000);
    }
  }
}
</script>


<style>
.small-table-col {
  width: 160px;
}
</style>