<template>
  <v-container class="px-4 px-lg-8 px-xl-12">
    <!-- Logo -->
    <v-row class="mt-4 mt-xl-5 justify-center align-center flex-grow-0">
      <v-col cols="12" lg="6" class="d-flex justify-center justify-lg-end">
        <img class="questions-svg pr-lg-4" :src="require('@/assets/svg/Base-1.svg')" alt="Иконка создания">
      </v-col>
      <v-col cols="12" lg="6" class="d-flex justify-center justify-lg-start">
        <span class="questions-title primary--text text-center text-lg-left">Список моих<br>категорий</span>
      </v-col>
    </v-row>
    <!-- Body -->
    <div class="rounded-lg d-flex flex-column align-center align-center pt-12 pb-8 mb-4" style="margin-top: 30px; background: #FEFEFF;">
      <v-col cols="11" xl="10" class="pa-0">
        <v-data-table
            :headers="headers"
            :items="tests"
            :search="search"
        >
          <template v-slot:top>
            <v-toolbar flat class="mb-4">
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
      </v-col>
    </div>
  </v-container>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: "Questions",
  data() {
    return {
      search: "",
      headers: [
        {
          text: 'Название',
          value: 'name',
        },
        {text: 'Всего вопросов', value: 'subject_name'},
        {text: 'Лёгких вопросов', value: 'created_at'},
        {text: 'Средних вопросов', value: 'updated_at'},
        {text: 'Сложных вопросов', value: 'йцу'},
        {text: 'Действия', value: 'actions', sortable: false, align: 'center'},
      ]
    }
  },
  computed: {
    ...mapState('data', ["questionCategories"])
  },
}
</script>

<style scoped>

.questions-svg {
  height: 250px;
}

.questions-title {
  font-family: Inter-Medium, sans-serif;
  font-size: 40px;
  line-height: 48px;
}

/* Изменение разметки под более низкое разрешение */
@media screen and (max-width: 600px) {
  .questions-svg {
    width: 160px;
    height: 160px;
  }

  .questions-title {
    font-family: Inter-Medium, sans-serif;
    font-size: 22px;
    line-height: 27px;
  }
}
</style>