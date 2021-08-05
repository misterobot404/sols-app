<template>
  <v-container class="px-4 px-lg-8 px-xl-12">
    <!-- Logo -->
    <v-row class="mt-4 mt-xl-5 justify-center align-center flex-grow-0">
      <v-col cols="12" lg="6" class="d-flex justify-center justify-lg-end">
        <img class="create-test-svg pr-lg-4" :src="require('@/assets/svg/Create-1.svg')" alt="Иконка создания">
      </v-col>
      <v-col cols="12" lg="6" class="d-flex justify-center justify-lg-start">
        <span class="create-test-title primary--text text-center text-lg-left">Создайте свой<br>опросник</span>
      </v-col>
    </v-row>
    <!-- Body -->
    <v-form
        ref="form"
        class="rounded-lg d-flex flex-column align-center pt-12 pb-4 mb-8"
        style="margin-top: 30px; background: #FEFEFF;"
    >
      <v-col cols="11" md="10" xl="8">
        <v-row class="align-center">
          <v-col cols="12" md="6">
            <h4>Название</h4>
            <v-text-field
                v-model="name"
                required
                :rules="[(v) => !!v ||  '']"
                hide-details
                append-icon="title"
                outlined
                class="mt-2 mb-1 rounded-lg"
                background-color="white"
            />
          </v-col>
          <v-col cols="12" md="6">
            <h4>Тип опросника</h4>
            <v-select
                v-model="type"
                required
                hide-details
                :items="testTypes"
                :rules="[(v) => !!v ||  '']"
                outlined
                class="mt-2 mb-1 rounded-lg"
                background-color="white"
                hint="Выберите тип"
            />
          </v-col>
          <v-col cols="12" md="6">
            <h4>Категории вопросов</h4>
            <v-select
                v-model="categoryIds"
                :items="categories"
                :item-text="'name'"
                :item-value="'id'"
                chips
                required
                :rules="[(v) => (!!v && v.length > 0) ||  '']"
                outlined
                hide-details
                clearable
                multiple
                class="mt-2 mb-1 rounded-lg"
            />
          </v-col>
          <v-col cols="12" md="6">
            <h4 class="mb-3">Количество вопросов</h4>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                    v-model="countOfQuestionsByLvl[0]"
                    required
                    outlined
                    :rules="[(v) => !!v ||  '']"
                    hide-details
                    type="number"
                    label="Лёгкие"
                    class="rounded-lg"
                />
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                    v-model="countOfQuestionsByLvl[1]"
                    required
                    outlined
                    type="number"
                    :rules="[(v) => !!v ||  '']"
                    hide-details
                    label="Средние"
                    class="rounded-lg"
                />
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                    v-model="countOfQuestionsByLvl[2]"
                    required
                    outlined
                    type="number"
                    :rules="[(v) => !!v ||  '']"
                    hide-details
                    label="Сложные"
                    class="rounded-lg"
                />
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" class="mt-4">
            <h4 class="mb-2">Дополнительные возможности:</h4>
            <v-row>
              <v-col>
                <v-switch
                    label="Ограничение доступа к тесту"
                    v-model="showPassword"
                    hide-details
                    class="mr-8 my-2"
                />
              </v-col>
              <v-col>
                <v-switch
                    label="Ограничение периода тестирования"
                    v-model="showRange"
                    hide-details
                    class="mr-8 my-2"
                />
              </v-col>
              <v-col>
                <v-switch
                    label="Ограничение времени тестирования"
                    v-model="showDuration"
                    hide-details
                    class="mr-8 my-2"
                />
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" class="pa-0" v-show="showRange">
            <vc-date-picker
                v-model="range"
                is-range
                mode='dateTime'
                is24hr
                :minute-increment="5"
                :min-date='new Date()'
                :firstDayOfWeek="2"
                locale="ru"
                class="d-flex flex-wrap"
            >
              <template v-slot="{ inputValue, inputEvents }">
                <v-col cols="12" md="6">
                  <h4>Дата начала</h4>
                  <v-text-field
                      ref="startDateTextField"
                      :value="inputValue.start"
                      v-on="inputEvents.start"
                      required
                      :rules="[(v) => !showRange || !!v || '']"
                      hide-details
                      outlined
                      readonly
                      class="mt-2 mb-1 rounded-lg"
                      append-icon="calendar_today"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <h4>Дата окончания</h4>
                  <v-text-field
                      ref="endDateTextField"
                      :value="inputValue.end"
                      v-on="inputEvents.end"
                      required
                      readonly
                      :rules="[(v) => !showRange || !!v || '']"
                      hide-details
                      outlined
                      class="mt-2 mb-1 rounded-lg"
                      append-icon="calendar_today"
                  />
                </v-col>
              </template>
            </vc-date-picker>
          </v-col>
          <v-col cols="12" md="6" v-show="showDuration">
            <h4>Время для прохождения (в минутах)</h4>
            <v-text-field
                v-model="testingTime"
                :rules="[(v) => !showDuration || !!v ||  '']"
                required
                append-icon="timer"
                hide-details
                outlined
                type="number"
                min="0"
                class="mt-2 mb-1 rounded-lg"
                background-color="white"
            />
          </v-col>
          <v-col align-self="end" cols="12" md="6" v-show="showPassword">
            <h4>Пароль</h4>
            <v-text-field
                hide-details
                outlined
                type="password"
                append-icon="vpn_key"
                class="mt-2 mb-1 rounded-lg"
                background-color="white"
                :rules="[(v) => !showPassword || !!v ||  '']"
            />
          </v-col>
          <v-col align-self="end" class="d-flex justify-end mb-2 mt-2">
            <v-btn @click="createTest()" class="success rounded-lg h4" x-large :loading="loading">Создать</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-form>
  </v-container>
</template>

<script>
import Vue from 'vue'
import {mapMutations, mapState} from 'vuex'
import VCalendar from 'v-calendar';

// Use v-calendar & v-date-picker components
Vue.use(VCalendar, {
  componentPrefix: 'vc'
});

export default {
  name: "CreateTest",
  data() {
    return {
      loading: false,
      valid: false,
      showRange: true,
      rangeHideError: true,
      showDuration: true,
      showPassword: false,
      // test data
      type: null,
      name: null,
      countOfQuestionsByLvl: [null, null, null],
      categoryIds: null,
      range: {
        start: null,
        end: null
      },
      testingTime: null,
      password: null,
    }
  },
  computed: {
    ...mapState('data', ["categories", "testTypes"]),
  },
  methods: {
    ...mapMutations('layout', ['SHOW_MSG_DIALOG']),
    ...mapMutations('data', ['CREATE_TEST']),
    createTest() {
      if (this.$refs.form.validate()) {
        let test = {
          is_active: true,
          type: this.type,
          name: this.name,
          count_of_questions_by_lvl: this.countOfQuestionsByLvl,
          category_ids: this.categoryIds,
          date_of_beginning: this.showRange ? this.range.start : null,
          date_of_finishing: this.showRange ? this.range.end : null,
          testing_time: this.showDuration ? this.testingTime : null,
          password: this.showPassword ? this.password : null
        }

        this.loading = true;
        setTimeout(() => {
          this.CREATE_TEST(test);
          // Show msg
          this.SHOW_MSG_DIALOG({type: 'primary', text: test.type + ': "' + test.name + '" ' + (test.type === "Викторина" ? "создана" : "создан")});
          this.loading = false;
        }, 800);

      }
    },
  },
  mounted() {
    // CRUTCH
    // v-text-field inside date-picker call error on init
    let dropError = true;
    this.$watch(
        () => {
          return this.$refs.startDateTextField.errorBucket
        },
        () => {
          if (dropError) {
            this.$refs.startDateTextField.errorBucket = [];
            this.$refs.endDateTextField.errorBucket = [];
            dropError = false;
          }
        },
    );
  }
}
</script>

<style scoped>

.create-test-svg {
  height: 250px;
}

.create-test-title {
  font-family: Inter-Medium, sans-serif;
  font-size: 40px;
  line-height: 48px;
}

/* Изменение разметки под более низкое разрешение */
@media screen and (max-width: 600px) {
  .create-test-svg {
    width: 160px;
    height: 160px;
  }

  .create-test-title {
    font-family: Inter-Medium, sans-serif;
    font-size: 22px;
    line-height: 27px;
  }
}
</style>

<style>
.v-select.v-select--chips:not(.v-text-field--single-line).v-text-field--box .v-select__selections, .v-select.v-select--chips:not(.v-text-field--single-line).v-text-field--enclosed .v-select__selections {
  min-height: 56px !important;
}
</style>