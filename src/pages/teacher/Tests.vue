<template>
  <v-container class="px-4 px-lg-6">
    <!-- Logo -->
    <v-row class="mt-4 mt-xl-5 justify-center align-center flex-grow-0">
      <v-col cols="12" lg="6" class="d-flex justify-center justify-lg-end">
        <img class="tests-svg pr-lg-4" :src="require('@/assets/svg/Select-option-1.svg')" alt="Иконка создания">
      </v-col>
      <v-col cols="12" lg="6" class="d-flex justify-center justify-lg-start">
        <span class="tests-title primary--text text-center text-lg-left">Список моих<br>опросов</span>
      </v-col>
    </v-row>
    <!-- Body -->
    <div class="rounded-lg d-flex flex-column align-center align-center pt-12 pb-8 mb-4" style="margin-top: 30px; background: #FEFEFF;">
      <v-col cols="11" class="pa-0">
        <v-data-table
            :headers="headers"
            :items="tableData"
            :loading="loading"
            loader-height="2"
            :search="search"
            no-results-text="Данные не найдены"
            no-data-text="Нет данных"
            multi-sort
            show-expand
            :footer-props="{'items-per-page-text':'Строк на странице:'}"
            :expanded.sync="expanded"
        >
          <template v-slot:top>
            <v-toolbar flat class="mb-4">
              <v-radio-group v-model="showActive" hide-details row>
                <v-radio :value="true" label="Активные"/>
                <v-radio :value="false" label="Архив"/>
              </v-radio-group>
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
            <v-btn icon :to="'/test/' + item.id">
              <v-icon>play_circle_outline</v-icon>
            </v-btn>
            <v-btn @click="edit(item)" icon>
              <v-icon class="material-icons-outlined">
                edit
              </v-icon>
            </v-btn>
            <v-btn @click="share(item)" icon>
              <v-icon class="material-icons-outlined">
                share
              </v-icon>
            </v-btn>
            <v-btn v-if="item.is_active" @click="archiveTest(item)" icon>
              <v-icon class="material-icons-outlined">
                archive
              </v-icon>
            </v-btn>
            <template v-else>
              <v-btn icon @click="unarchiveTest(item)">
                <v-icon class="material-icons-outlined">
                  unarchive
                </v-icon>
              </v-btn>
              <v-btn icon @click="deleteTest(item)">
                <v-icon>
                  delete_outline
                </v-icon>
              </v-btn>
            </template>
          </template>
          <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length" class="py-2 pl-16">
              <div class="d-flex align-center">
                <v-chip
                    v-for="(categoryId) in item.category_ids"
                    class="ma-2"
                    :key="categoryId"
                    v-text="getCategoryById(categoryId).name"
                />
              </div>
            </td>
          </template>
        </v-data-table>
      </v-col>
    </div>
  </v-container>
</template>

<script>
import {mapMutations, mapState, mapGetters} from 'vuex'

export default {
  name: "Tests",
  data() {
    return {
      loading: false,
      showActive: true,
      search: "",
      expanded: [],
      headers: [
        {text: 'Название', value: 'name', class: ''},
        {text: 'Тип', value: 'type', class: ''},
        {text: 'Кол-во вопросов', value: 'count_of_questions_by_lvl', class: ''},
        {text: 'Время прохождения (мин.)', value: 'testing_time', class: 'small-table-col'},
        {text: 'Дата начала', value: 'date_of_beginning', class: ''},
        {text: 'Дата окончания', value: 'date_of_finishing', class: ''},
        {text: 'Пароль', value: 'password', class: ''},
        {text: 'Дата создания', value: 'created_at', class: ''},
        {value: 'actions', sortable: false, align: 'right'},
      ]
    }
  },
  computed: {
    ...mapState('data', ["tests"]),
    ...mapGetters('data', ['getCategoryById']),
    tableData() {
      // DATE FORMATTING FOR PRINTF TO TABLE
      let result = this.tests.map(a => Object.assign({}, a));
      // filter tests by is_active
      result = result.filter(el => el.is_active === this.showActive);
      // count + level of question
      result.forEach(el => el.count_of_questions_by_lvl = el.count_of_questions_by_lvl.reduce((a, b) => Number(a) + Number(b)) + ' (' + el.count_of_questions_by_lvl.join('/') + ')');
      // datetime
      result.forEach(el => el.date_of_beginning ? el.date_of_beginning = el.date_of_beginning.toLocaleDateString('ru-RU') + ' ' + el.date_of_beginning.toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit'
      }) : el.date_of_beginning = "Не установлена");
      result.forEach(el => el.date_of_finishing ? el.date_of_finishing = el.date_of_finishing.toLocaleDateString('ru-RU') + ' ' + el.date_of_finishing.toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit'
      }) : el.date_of_finishing = "Не установлена");
      result.forEach(el => el.created_at = el.created_at.toLocaleDateString('ru-RU') + ' ' + el.created_at.toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit'
      }));
      // testing time
      result.forEach(el => el.testing_time ? null : el.testing_time = "Не установлено");
      // password
      result.forEach(el => el.password ? null : el.password = "Не установлен");
      // show on data
      return result.reverse();
    }
  },
  methods: {
    ...mapMutations('layout', ['SHOW_MSG_DIALOG']),
    ...mapMutations('data', ['ARCHIVE_TEST', 'UNARCHIVE_TEST', 'DELETE_TEST']),
    edit(test) {
      navigator.clipboard.writeText(test.name).then(() => {
        this.SHOW_MSG_DIALOG({type: 'primary', text: "Изменения сохранены"});
      })
    },
    share(test) {
      navigator.clipboard.writeText(test.name).then(() => {
        this.SHOW_MSG_DIALOG({type: 'primary', text: "Ссылка скопирована в буфер обмена"});
      })
    },
    archiveTest(test) {
      this.ARCHIVE_TEST(test.id);
      this.SHOW_MSG_DIALOG({type: 'primary', text: test.type + ': "' + test.name + '" ' + (test.type === "Викторина" ? "перемещена" : "перемещён") + ' в архив'});
    },
    unarchiveTest(test) {
      this.UNARCHIVE_TEST(test.id);
      this.SHOW_MSG_DIALOG({type: 'primary', text: test.type + ': "' + test.name + '" ' + (test.type === "Викторина" ? "активна" : "активен")});
    },
    deleteTest(test) {
      this.DELETE_TEST(test.id);
      this.SHOW_MSG_DIALOG({type: 'primary', text: test.type + ': "' + test.name + '" ' + (test.type === "Викторина" ? "удалена" : "удалён")});
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

.tests-svg {
  height: 250px;
}

.tests-title {
  font-family: Inter-Medium, sans-serif;
  font-size: 40px;
  line-height: 48px;
}

/* Изменение разметки под более низкое разрешение */
@media screen and (max-width: 600px) {
  .tests-svg {
    width: 160px;
    height: 160px;
  }

  .tests-title {
    font-family: Inter-Medium, sans-serif;
    font-size: 22px;
    line-height: 27px;
  }
}
</style>

<style>
.small-table-col {
  width: 160px;
}

.v-data-table > .v-data-table__wrapper tbody tr.v-data-table__expanded__content {
  box-shadow: none;
}
</style>