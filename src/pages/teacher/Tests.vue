<template>
  <v-container class="px-4 px-lg-8 px-xl-12">
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
            :items="tests"
            :search="search"
        >
          <template v-slot:top>
            <v-toolbar flat class="mb-4">
              <v-radio-group v-model="activeOrArchive" hide-details row >
                <v-radio value="active" label="Активные"/>
                <v-radio value="archive" label="Архив"/>
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
        </v-data-table>
        <div v-for="(test,index) in tests" :key="index" v-text="test"/>
      </v-col>
    </div>
  </v-container>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: "Tests",
  data() {
    return {
      activeOrArchive: "active",
      search: "",
      headers: [
        {text: 'Название', value: 'name'},
        {text: 'Тип', value: 'type'},
        {text: 'Время прохождения', value: 'duration'},
        {text: 'Кол-во вопросов', value: 'numberQuestions'},
        {text: 'Дата создания', value: 'created_at'},
        {text: 'Дата начала', value: 'start'},
        {text: 'Дата окончания', value: 'end'},
        {text: 'Пароль', value: 'password'},
        {text: 'Действия', value: 'actions', sortable: false, align: 'center'},
      ]
    }
  },
  computed: {
    ...mapState('data', ["tests"])
  },
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