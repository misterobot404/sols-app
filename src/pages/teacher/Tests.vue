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
            :search="search"
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
                  label="Search"
                  style="max-width: 340px"
                  single-line
                  hide-details
              />
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon
                class="mr-2"
                @click="console.log(item)"
            >
              play_circle_outline
            </v-icon>
            <v-icon
                class="mr-2"
                @click="share(item)"
            >
              share
            </v-icon>
            <v-icon
                v-if="item.is_active"
                @click="archiveTest(item)"
            >
              archive
            </v-icon>
            <template v-else>
              <v-icon @click="unarchiveTest(item)" class="mr-2">
                unarchive
              </v-icon>
              <v-icon @click="deleteTest(item)">
                delete
              </v-icon>
            </template>
          </template>
        </v-data-table>
        <div v-for="(test,index) in tests" :key="index" v-text="test" class="mt-4"/>
      </v-col>
    </div>
  </v-container>
</template>

<script>
import {mapMutations, mapState} from 'vuex'

export default {
  name: "Tests",
  data() {
    return {
      showActive: true,
      search: "",
      headers: [
        {text: 'Название', value: 'name'},
        {text: 'Тип', value: 'type'},
        {text: 'Время прохождения', value: 'duration'},
        {text: 'Кол-во вопросов', value: 'amount_questions'},
        {text: 'Дата создания', value: 'created_at'},
        {text: 'Дата начала', value: 'start_date'},
        {text: 'Дата окончания', value: 'end_date'},
        {text: 'Пароль', value: 'password'},
        {text: 'Действия', value: 'actions', sortable: false, align: 'center'},
      ]
    }
  },
  computed: {
    ...mapState('data', ["tests"]),
    tableData() {
      let result = this.tests.map(a => Object.assign({}, a));
      result = result.filter(el => el.is_active === this.showActive);
      result.forEach(el => el.password ? null : el.password = "Не установлен");
      return result;
    }
  },
  methods: {
    ...mapMutations('layout', ['SHOW_MSG_DIALOG']),
    ...mapMutations('data', ['ARCHIVE_TEST','UNARCHIVE_TEST', 'DELETE_TEST']),
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