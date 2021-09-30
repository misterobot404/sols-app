<template>
  <v-container class="d-flex flex-column px-4 px-lg-6" style="min-height: 100%">
    <!-- Header -->
    <v-row class="mt-xl-2 align-end flex-grow-0 flex-column-reverse flex-lg-row">
      <v-col cols="12" lg="4" class="d-flex flex-column align-center align-lg-start">
        <h3 class="mb-2 ml-1">{{ testStarted ? 'Осталось времени' : 'Длительность' }}</h3>
        <div class="rounded-lg d-flex justify-center py-6 mb-2" style="width: 100%; max-width: 420px; background: #FEFEFF; height: 143px">
          <template v-if="test && test.testing_time">
            <div key="hours" class="mx-2 text-center">
              <h4 class="mb-1">Часы</h4>
              <div
                  class="rounded-lg d-flex align-center justify-center"
                  style="height: 72px; width: 72px"
                  :style="{border: '2px ' + $vuetify.theme.currentTheme.primary + ' solid'}"
              >
                <h4 v-text="Math.floor(sec_left / 3600)"/>
              </div>
            </div>
            <div key="minutes" class="mx-2">
              <h4 class="mb-1 text-center">Минуты</h4>
              <div
                  class="rounded-lg d-flex align-center justify-center"
                  style="height: 72px; width: 72px"
                  :style="{border: '2px ' + $vuetify.theme.currentTheme.success + ' solid'}"
              >
                <h4 v-text="Math.floor(sec_left / 60) % 60"/>
              </div>
            </div>
          </template>
          <div v-else class="d-flex justify-center align-center">
            <v-img height="60%" contain :src="require('@/assets/infinity.png')"/>
          </div>
        </div>
      </v-col>
      <v-col cols="12" lg="4" class="d-flex justify-center">
        <img class="tests-svg pr-lg-4" :src="require('@/assets/svg/Test-1.svg')" alt="Иконка создания">
      </v-col>
      <v-spacer/>
    </v-row>
    <!-- Body -->
    <div class="rounded-lg d-flex flex-column flex-grow-1 align-center py-8 mb-4" style="margin-top: 16px; background: #FEFEFF; overflow: hidden">
      <v-fade-transition style="height: 100%;" v-if="test">
        <v-col v-if="testStarted" cols="10" lg="8">
          {{ active_test }}
        </v-col>
        <v-col v-else cols="10" lg="8">
          <v-img height="240" class="rounded-xl" :src="require('@/assets/testing.jpg')"/>
          <h1 class="text-center mt-6" style="font-size: 32px" v-text="test.name"/>
          <div class="p-14-medium text-center mt-1">
            <span v-text="test.type"/>&nbsp;• Вопросов:&nbsp;<span v-text="test.count_of_questions_by_lvl.reduce((a, b) => a + b, 0)"/>
          </div>
          <p class="p-14-regular mt-4" style="text-align:justify; line-height: 2em">Всего 22% рабочего населения довольны своей профессией (по данным опроса
            Райффайзенбанка в 2021 г.).
            Поэтому важно выбирать любимое направление деятельности для получения удовольствия от работы и достижения наивысших результатов, например, с помощью
            теста на профориентацию. The simplest way to add a space in HTML (besides hitting the spacebar) is with the non-breaking space entity, written as &nbsp;
            or &#160;. Multiple adjacent non-breaking spaces won’t be collapsed by the browser, letting you “force” several visible spaces between words or other
            page elements.</p>
          <div class="p-14-medium">
            Автор: <a>Анастасия Павлова</a>
          </div>
          <v-row class="mt-4 flex-column-reverse flex-md-row">
            <v-col cols="12" md="6" class="d-flex justify-center justify-md-start">
              <v-btn
                  @click="$router.back()"
                  color="primary"
                  outlined
                  class="px-4 h4"
                  style="letter-spacing: 0.05em; min-width: 220px"
                  large>
                Назад
              </v-btn>
            </v-col>
            <v-col cols="12" md="6" class="d-flex justify-center justify-md-end">
              <v-btn
                  @click="startConfirm()"
                  :loading="loading"
                  dark
                  color="success"
                  class="px-4 h4"
                  style="letter-spacing: 0.05em; min-width: 220px"
                  large
              >
                Начать
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-fade-transition>
    </div>
    <StartConfirmDialog :show.sync="showStartConfirmDialog" @confirm="lStartTest()"/>
  </v-container>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import StartConfirmDialog from "@/components/StartTestConfirm";
// import axios from "axios"

export default {
  name: "Testing",
  components: {
    StartConfirmDialog
  },
  data() {
    return {
      loading: false,
      showStartConfirmDialog: false,

      test: null,
      active_test: null,

      timer: null,
      sec_left: null
    }
  },
  computed: {
    ...mapGetters('data', ['getTestById', 'getActiveTestByTestId']),
    testStarted() {
      return Boolean(this.active_test)
    }
  },
  watch: {
    sec_left(val) {
      if (val === 0) this.endTest();
    }
  },
  methods: {
    ...mapActions('data', ['startTest']),
    startConfirm() {
      if (localStorage.getItem("testing_start_test_skip_confirm") === "true") {
        this.lStartTest();
      } else this.showStartConfirmDialog = true;
    },
    lStartTest() {
      this.loading = true;
      this.startTest(this.test.id)
          .then(() => {
            this.active_test = this.getActiveTestByTestId(Number(this.$route.params.id));
            if (this.test.testing_time) this.startTimer();
            this.loading = false;
          })
    },
    endTest() {
      if (this.test.testing_time) this.stopTimer();
      this.$router.push("/endtest");
    },
    startTimer() {
      this.timer = setInterval(() => {
        this.sec_left--
      }, 1000)
    },
    stopTimer() {
      clearTimeout(this.timer)
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.test = vm.getTestById(Number(to.params.id));
      vm.active_test = vm.getActiveTestByTestId(Number(to.params.id));

      if (vm.test.testing_time) {
        if (vm.active_test) {
          vm.sec_left = vm.test.testing_time * 60 - Math.floor((new Date() - vm.active_test.created_at) / 1000);
          vm.startTimer();
        } else vm.sec_left = vm.test.testing_time * 60;
      }
    });
  },
  beforeRouteLeave(to, from, next) {
    clearTimeout(this.timer);
    this.sec_left = null;
    next();
  }
}
</script>

<style scoped>
.tests-svg {
  height: 200px;
}

/* Изменение разметки под более низкое разрешение */
@media screen and (max-width: 600px) {
  .tests-svg {
    width: 200px;
    height: 200px;
  }
}
</style>