<template>
  <v-container class="px-4 px-lg-6">
    <!-- Logo -->
    <v-row class="mt-4 mt-xl-5 justify-center align-center flex-grow-0">
      <v-col cols="12" lg="6" class="d-flex justify-center justify-lg-end">
        <img class="tests-svg pr-lg-4" :src="require('@/assets/svg/Select-option-1.svg')" alt="Иконка создания">
      </v-col>
      <v-col cols="12" lg="6" class="d-flex justify-center justify-lg-start">
        <span class="tests-title primary--text text-center text-lg-left">Список моих<br>тестов</span>
      </v-col>
    </v-row>
    <!-- Body -->
    <div class="rounded-lg d-flex flex-column align-center pt-12 pb-8 mb-4" style="margin-top: 30px; background: #FEFEFF;">
      <v-col cols="11" class="pa-0">
        <!-- Filters  -->
        <v-toolbar flat class="hide-padding mb-4">
          <v-radio-group v-model="show_active" hide-details row>
            <v-radio :value="true" :label="$vuetify.breakpoint.xs ? 'Акт.' : 'Активные'"/>
            <v-radio :value="false" :label="$vuetify.breakpoint.xs ? 'Арх.' : 'Архив'"/>
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
          <v-btn icon class="ml-2" @click="sync" :loading="loading">
            <v-icon>
              sync
            </v-icon>
          </v-btn>
          <v-btn-toggle v-model="show_type" dense color="primary" class="ml-2" mandatory>
            <v-btn value="table">
              <v-icon style="opacity: 0.8">calendar_view_month</v-icon>
            </v-btn>
            <v-btn value="cards">
              <v-icon style="opacity: 0.8">grid_view</v-icon>
            </v-btn>
          </v-btn-toggle>
          <v-btn
              @click="$router.push({name: 'CreateTest'})"
              class="ml-5"
              color="primary"
          >
            Создать тест
          </v-btn>
        </v-toolbar>
        <!-- Table -->
        <v-data-table
            v-show="show_type === 'table'"
            :headers="table.headers"
            :items="processedData"
            :search="search"
            no-results-text="Данные не найдены"
            no-data-text="Нет данных"
            multi-sort
            show-expand
            :footer-props="{'items-per-page-text':'Строк на странице:'}"
            :expanded.sync="table.expanded"
        >
          <template v-slot:item.actions="{ item }">
            <v-btn icon :to="'/tests/' + item.id">
              <v-icon>
                play_circle_outline
              </v-icon>
            </v-btn>
            <v-btn icon :to="'/Teacher/tests/' + item.id + '/edit'">
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
              <v-btn icon @click="openDeleteDialog(item)">
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
        <!-- Cards -->
        <v-row class="pt-4 justify-center" v-show="show_type === 'cards'">
          <v-col cols="11" sm="6" lg="4" xl="3" class="pa-4" v-for="(test, index) in processedData" :key="index">
            <v-card>
              <v-img
                  src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                  height="200px"
              />
              <v-card-subtitle class="pb-0 p-14-medium">
                <span v-text="test.type"/> • Вопросов: <span v-text="test.count_of_questions_by_lvl.reduce((a, b) => a + b, 0)"/>
              </v-card-subtitle>
              <v-card-title v-text="test.name" class="mb-2 pt-2"/>
              <v-card-subtitle>
                <v-chip
                    v-for="(categoryId) in test.category_ids"
                    class="mr-2 mb-1"
                    small
                    :key="categoryId"
                    v-text="getCategoryById(categoryId).name"
                />
              </v-card-subtitle>
              <v-card-actions>
                <v-spacer/>
                <v-btn
                    icon
                    :to="'/teacher/tests/' + test.id + '/edit'"
                >
                  <v-icon>edit</v-icon>
                </v-btn>
                <v-menu
                    rounded="lg"
                    offset-y
                >
                  <template v-slot:activator="{ attrs, on }">
                    <v-btn
                        icon
                        v-bind="attrs"
                        v-on="on"
                    >
                      <v-icon>settings</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item :to="'/teacher/tests/' + test.id + '/edit'">
                      <v-list-item-title>Редактировать</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="share(test)">
                      <v-list-item-title>Поделиться</v-list-item-title>
                    </v-list-item>
                    <v-list-item v-if="test.is_active" @click="archiveTest(test)">
                      <v-list-item-title>Переместить в архив</v-list-item-title>
                    </v-list-item>
                    <template v-else>
                      <v-list-item @click="unarchiveTest(test)">
                        <v-list-item-title>Переместить в активные</v-list-item-title>
                      </v-list-item>
                      <v-list-item @click="openDeleteDialog(test)">
                        <v-list-item-title>Удалить</v-list-item-title>
                      </v-list-item>
                    </template>
                  </v-list>
                </v-menu>
                <v-btn
                    :to="'/tests/' + test.id"
                    dark
                    color="success"
                    depressed
                    class="ma-2 mt-1 px-4 h4"
                    style="letter-spacing: 0.05em"
                >
                  Открыть
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <!-- Delete dialog -->
        <DeleteTestDialog :test="delete_test_dialog.test" :show.sync="delete_test_dialog.show"/>
      </v-col>
    </div>
  </v-container>
</template>

<script>
import {mapMutations, mapState, mapGetters} from 'vuex'
import DeleteTestDialog from "@/components/DeleteTestDialog";

export default {
  name: "Tests",
  components: {DeleteTestDialog},
  data() {
    return {
      loading: false,
      show_active: true,
      show_type: localStorage.getItem("tests_show_type") ? localStorage.getItem("tests_show_type") : "cards",
      search: "",
      table: {
        expanded: [],
        headers: [
          {text: 'Название', value: 'name', class: ''},
          {text: 'Тип', value: 'type', class: ''},
          {text: 'Кол-во вопросов', value: 't_count_of_questions_by_lvl'},
          {text: 'Время прохождения (мин.)', value: 'testing_time', class: 'small-table-col'},
          {text: 'Дата начала', value: 'date_of_beginning'},
          {text: 'Дата окончания', value: 'date_of_finishing'},
          {text: 'Пароль', value: 'password', class: ''},
          {text: 'Дата создания', value: 'created_at'},
          {value: 'actions', sortable: false, align: 'right'},
        ]
      },
      delete_test_dialog: {
        show: false,
        test: null
      }
    }
  },
  computed: {
    ...mapState('data', ["tests"]),
    ...mapGetters('data', ['getCategoryById']),
    processedData() {
      let result = this.tests.map(a => Object.assign({}, a));
      // filter tests by is_active
      result = result.filter(el => el.is_active === this.show_active);

      // DATE FORMATTING FOR PRINTF TO TABLE
      // count + level of question
      result.forEach(el => el.t_count_of_questions_by_lvl = el.count_of_questions_by_lvl.reduce((a, b) => Number(a) + Number(b)) + ' ( ' + el.count_of_questions_by_lvl.join(' / ') + ' )');
      // datetime
      result.forEach(el => el.date_of_beginning ? el.date_of_beginning = el.date_of_beginning.toLocaleDateString('ru-RU') + ' ' + el.date_of_beginning.toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit'
      }) : el.date_of_beginning = "Не установлено");
      result.forEach(el => el.date_of_finishing ? el.date_of_finishing = el.date_of_finishing.toLocaleDateString('ru-RU') + ' ' + el.date_of_finishing.toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit'
      }) : el.date_of_finishing = "Не установлено");
      result.forEach(el => el.created_at = el.created_at.toLocaleDateString('ru-RU') + ' ' + el.created_at.toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit'
      }));
      // testing time
      result.forEach(el => el.testing_time ? null : el.testing_time = "Не установлено");
      // password
      result.forEach(el => el.password ? null : el.password = "Не установлено");

      return result.reverse();
    }
  },
  watch: {
    show_type(val) {
      localStorage.setItem("tests_show_type", val)
    }
  },
  methods: {
    ...mapMutations('layout', ['SHOW_MSG_DIALOG']),
    ...mapMutations('data', ['ARCHIVE_TEST', 'UNARCHIVE_TEST']),
    share(test) {
      try {
        navigator.clipboard.writeText(test.name)
            .then(() => this.SHOW_MSG_DIALOG({type: 'primary', text: "Ссылка скопирована в буфер обмена"}))
      } catch (err) {
        this.SHOW_MSG_DIALOG({type: 'error', text: "Ссылка не может быть скопирована. Используйте защищенное соединение"})
      }
    },
    archiveTest(test) {
      this.ARCHIVE_TEST(test.id);
      this.SHOW_MSG_DIALOG({type: 'primary', text: test.type + ': "' + test.name + '" ' + (test.type === "Викторина" ? "перемещена" : "перемещён") + ' в архив'});
    },
    unarchiveTest(test) {
      this.UNARCHIVE_TEST(test.id);
      this.SHOW_MSG_DIALOG({type: 'primary', text: test.type + ': "' + test.name + '" ' + (test.type === "Викторина" ? "активна" : "активен")});
    },
    sync() {
      this.loading = true;
      setTimeout(() => {
        this.SHOW_MSG_DIALOG({type: 'primary', text: 'Данные обновлены'});
        this.loading = false;
      }, 400);
    },
    openDeleteDialog(test) {
      this.delete_test_dialog.test = test;
      this.delete_test_dialog.show = true;
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
    width: 200px;
    height: 200px;
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

.hide-padding > .v-toolbar__content {
  padding: 4px 0;
}

.v-data-table > .v-data-table__wrapper tbody tr.v-data-table__expanded__content {
  box-shadow: none;
}
</style>