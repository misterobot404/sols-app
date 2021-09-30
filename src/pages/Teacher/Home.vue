<template>
  <v-container style="min-height: 100%" class="d-flex flex-column px-8 px-xl-12">
    <template v-if="active_tests.length > 0">
      <!-- Active Tests Header -->
      <v-row class="mx-1 mt-8 primary--text flex-grow-0">
        <v-col cols="12" sm="6" align-self="center">
          <h2 class="primary--text text-center text-sm-start">Активные тесты</h2>
        </v-col>
      </v-row>
      <!-- Active Tests Content -->
      <div class="d-flex flex-wrap rounded-lg mt-5">
        <v-row>
          <v-card
              v-for="(active_test, index) in active_tests"
              class="ma-4 rounded-xl"
              max-width="344"
              :key="index"
          >
            <v-card-subtitle class="pb-0 p-14-medium">
              <span v-text="getTestById(active_test.test_id).type"/> • Вопросов: <span
                v-text="getTestById(active_test.test_id).count_of_questions_by_lvl.reduce((a, b) => a + b, 0)"/>
            </v-card-subtitle>
            <v-card-title v-text="getTestById(active_test.test_id).name" class="mb-2 pt-2"/>
            <v-card-subtitle>
              <v-chip
                  v-for="(categoryId) in getTestById(active_test.test_id).category_ids"
                  class="mr-2 mb-1"
                  small
                  :key="categoryId"
                  v-text="getCategoryById(categoryId).name"
              />
            </v-card-subtitle>
            <v-card-actions>
              <v-spacer/>
              <v-btn
                  :to="'/tests/' + getTestById(active_test.test_id).id"
                  dark
                  color="success"
                  class="ma-2 mt-1 px-4 h4 rounded-lg"
                  style="letter-spacing: 0.05em"
              >
                Продолжить
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-row>
      </div>
    </template>
    <!-- Result Header -->
    <v-row class="mx-1 mt-8 primary--text flex-grow-0">
      <v-col cols="12" sm="6" align-self="center">
        <h2 class="primary--text text-center text-sm-start">Результаты</h2>
      </v-col>
      <v-col cols="12" sm="6" class="d-flex justify-center justify-sm-end">
        <v-btn
            large
            outlined
            color="primary"
            class="rounded-lg h4"
        >
          Показать всё
        </v-btn>
      </v-col>
    </v-row>
    <!-- Result Content -->
    <div class="d-flex justify-center flex-wrap rounded-lg mt-5" style="padding: 24px 100px; background: #FEFEFF;">
      <v-row class="justify-center">
        <div
            v-for="(result, index) in results"
            :alt="index"
            :key="index"
            class="card-result ma-3"
            style="flex-basis: 244px"
        >
          <h2 class="color-blue mb-0" v-text="result"/>
        </div>
      </v-row>
    </div>
    <!-- Help Header -->
    <v-row class="mx-1 mt-8 primary--text flex-grow-0">
      <v-col cols="12" sm="6" align-self="center">
        <h2 class="primary--text text-center text-sm-start">Как пользоваться сервисом?</h2>
      </v-col>
      <v-col cols="12" sm="6" class="d-flex justify-center justify-sm-end">
        <v-btn
            large
            outlined
            color="primary"
            class="rounded-lg h4"
        >
          Показать всё
        </v-btn>
      </v-col>
    </v-row>
    <!-- Help Content -->
    <div class="d-flex justify-center flex-wrap rounded-lg mt-5" style="padding: 24px 100px; background: #FEFEFF;">
      <img
          v-for="(url, index) in help"
          :src="url"
          :alt="index"
          :key="index"
          class="ma-3 cursor-pointer"
      />
    </div>
    <!-- Feedback -->
    <Feedback/>
  </v-container>
</template>

<script>
import Feedback from "@/components/Feedback";
import {mapGetters, mapState} from 'vuex'


export default {
  name: "Home",
  components: {Feedback},
  data() {
    return {
      help: [
        require("@/assets/helps/help1.png"),
        require("@/assets/helps/help2.png"),
        require("@/assets/helps/help3.png"),
        require("@/assets/helps/help4.png")
      ],
      results: ["МА_8ИС", "ЛААГ_8ВТ", "ТВ_7ИБ", "ЛП_8ИС", "ИСб-1", "МОПС", "ВТ-1", "НФЗ-2"]
    }
  },
  computed: {
    ...mapState('data', ['active_tests']),
    ...mapGetters('data', ['getTestById', 'getActiveTestByTestId', "getCategoryById"]),
  }
}
</script>

<style scoped>
.card-result {
  padding: 45px 14px;
  border: 2px solid #C7C7CF;
  border-radius: 5px;
  cursor: pointer;
  text-wrap: normal;
  text-align: center;
}
</style>