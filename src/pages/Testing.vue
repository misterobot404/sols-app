<template>
  <v-container class="px-4 px-lg-6" style="min-height: 100%">
    <v-dialog
        :value="loading"
        overlay-opacity="0.2"
        persistent
        width="300"
    >
      <v-card
          color="primary"
          dark
          width="300px"
      >
        <v-card-text class="pt-3">
          Формирование теста...
          <v-progress-linear
              indeterminate
              color="white"
              class="mb-0 mt-2"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <template v-if="testReady">
      <!-- Header -->
      <v-row class="mt-4 mt-xl-5 align-end flex-column-reverse flex-lg-row">
        <v-col
            cols="12" lg="4"
            class="d-flex flex-column align-center align-lg-start"
        >
          <h3 class="mb-1">Осталось времени</h3>
          <div class="rounded-lg d-flex justify-center py-6 mb-4" style="width: 100%; max-width: 420px; background: #FEFEFF;">
            <div class="mx-2 text-center">
              <h4 class="mb-1">Часы</h4>
              <div
                  class="rounded-lg d-flex align-center justify-center"
                  style="height: 72px; width: 72px"
                  :style="{border: '2px ' + $vuetify.theme.currentTheme.primary + ' solid'}"
              >
                <h4 v-text="Math.floor(timer / 3600)"/>
              </div>
            </div>
            <div class="mx-2">
              <h4 class="mb-1 text-center">Минуты</h4>
              <div
                  class="rounded-lg d-flex align-center justify-center"
                  style="height: 72px; width: 72px"
                  :style="{border: '2px ' + $vuetify.theme.currentTheme.success + ' solid'}"
              >
                <h4 v-text="Math.floor(timer / 60) % 60"/>
              </div>
            </div>
          </div>
        </v-col>
        <v-col cols="12" lg="4"
               class="d-flex justify-center"
        >
          <img class="tests-svg pr-lg-4" :src="require('@/assets/svg/Test-1.svg')" alt="Иконка создания">
        </v-col>
        <v-spacer/>
      </v-row>
      <!-- Body -->
      <div class="rounded-lg d-flex flex-column align-center pt-12 pb-8 mb-4" style="margin-top: 30px; background: #FEFEFF;">
        <v-col cols="11" class="pa-0">
          {{test}}
        </v-col>
      </div>
    </template>
  </v-container>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: "Testing",
  data() {
    return {
      loading: false,
      testReady: false,
      test: null,
      timer: null,
    }
  },
  computed: {
    ...mapGetters('data', ['getTestById'])
  },
  methods: {
    async doTimer() {
      if (this.timer !== 0) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        this.timer--;
        await this.doTimer();
      }
    }
  },
  async created() {
    this.loading = true;
    // loading test
    setTimeout(() => {
      // init
      this.test = this.getTestById(Number.parseInt(this.$route.params.id));
      this.timer = this.test.duration * 60;
      this.doTimer();

      this.loading = false;
      this.testReady = true;
    }, 2400);
  }
}
</script>

<style scoped>
.tests-svg {
  height: 250px;
}

/* Изменение разметки под более низкое разрешение */
@media screen and (max-width: 600px) {
  .tests-svg {
    width: 160px;
    height: 160px;
  }
}
</style>