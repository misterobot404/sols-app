<template>
  <div>
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
          <h2>{{  getCategoryById(categoryId) ? getCategoryById(categoryId).name : null }}</h2>
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
        <v-btn icon @click="openDeleteDialog(item)">
          <v-icon>
            delete_outline
          </v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <DeleteConfirmation
        :show.sync="showDeleteDialog"
        header="Удалить этот вопрос?"
        body="Вы собираетесь удалить вопрос. Восстановить его будет нельзя."
        @confirm="lDeleteQuestion"
    />
  </div>
</template>

<script>
import {mapMutations, mapGetters, mapState, mapActions} from 'vuex'
import DeleteConfirmation from "@/components/Teacher/DeleteConfirmation";

export default {
  name: "QuestionTable",
  components: {DeleteConfirmation},
  props: {
    categoryId: {
      type: Number,
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
      ],
      // Delete dialog
      showDeleteDialog: false,
      selected_question_to_delete: null
    }
  },
  computed: {
    ...mapGetters('data', [
      'getCategoryById',
      'getQuestionsByCategoryId',
      'getQuestionTypeById'
    ]),
    ...mapState('data', ["categories", "questions"]),
    tableData() {
      // DATE FORMATTING FOR PRINTF TO TABLE
      let result = this.getQuestionsByCategoryId(this.categoryId).map(a => Object.assign({}, a));
      result.forEach(question => {
        question.type_name = this.getQuestionTypeById(question.type_id).name;
        // remove html tags
        question.text = question.text.replace(/(<([^>]+)>)/gi, "");
      });
      result.forEach(el => el.commentary ? null : el.commentary = "Не установлено");
      return result.reverse();
    }
  },
  methods: {
    ...mapMutations('layout', ['SHOW_MSG_DIALOG']),
    ...mapActions('data',['deleteQuestion']),
    sync() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.SHOW_MSG_DIALOG({type: 'primary', text: 'Данные обновлены'});
      }, 1000);
    },
    openDeleteDialog(question) {
      this.selected_question_to_delete = question;
      this.showDeleteDialog = true;
    },
    lDeleteQuestion() {
      this.loading = true;
      this.deleteQuestion(this.selected_question_to_delete.id)
          .then(() => {
            this.loading = false;
            this.SHOW_MSG_DIALOG({type: 'primary', text: 'Вопрос удален'});
          });
      this.selected_question_to_delete = null;
    }
  }
}
</script>


<style>
.small-table-col {
  width: 160px;
}
</style>