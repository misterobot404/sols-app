<template>
  <v-container style="min-height: 100%" class="d-flex flex-column px-8 px-xl-12">
    <!-- Help Header -->
    <v-row class="mx-1 mt-12 mt-xl-16 primary--text flex-grow-0">
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
    <div class="d-flex justify-center flex-wrap rounded-lg" style="margin-top: 28px; padding: 24px 100px; background: #FEFEFF;">
      <img
          v-for="(url, index) in help"
          :src="url"
          :alt="index"
          :key="index"
          class="ma-3 cursor-pointer"
      />
    </div>
    <!-- Result Header -->
    <v-row class="mx-1 mt-12 mt-xl-16 primary--text flex-grow-0">
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
    <div class="d-flex justify-center flex-wrap rounded-lg" style="margin-top: 28px; padding: 24px 100px; background: #FEFEFF;">
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
    <!-- Footer -->
    <div class="text-center d-flex justify-center p-14-medium pt-5 pb-2 mt-auto align-center">
      <router-link to="/" class="mx-xl-10 mx-5 black--text text-no-wrap">
        О сайте
      </router-link>
      <router-link to="/" class="mx-xl-10 mx-5 black--text">
        Служба поддержки
      </router-link>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "Home",
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