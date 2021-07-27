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
        class="rounded-lg d-flex flex-column align-center align-center pt-12 pb-8"
        style="margin-top: 30px; background: #FEFEFF;"
    >
      <v-col cols="11" md="10" xl="8">
        <v-row class="align-center justify-center">
          <v-col cols="12" md="6">
            <h4>Тип опросника*</h4>
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
            <h4>Название*</h4>
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
          <v-col cols="12">
            <DatePicker v-model="range" is-range mode='dateTime'>
            </DatePicker>
          </v-col>
          <v-col cols="12" md="6">
            <h4>Дата начала*</h4>
            <v-datetime-picker
                ref="dateTimePickerStart"
                v-model="startDate"
                :date-picker-props="{
                  min: new Date().toISOString().split('T')[0],
                  locale: 'ru-RU',
                  firstDayOfWeek: 1
                }"
                :time-picker-props="{
                  format: '24hr',
                  min: minStartTime
                }"
                :text-field-props="{
                  required: true,
                  rules: [(v) => !!v || ''],
                  hideDetails: true,
                  outlined: true,
                  class: 'mt-2 mb-1 rounded-lg',
                  appendIcon: 'calendar_today'
                }"
            >
              <template slot="actions" slot-scope="{ parent }">
                <v-btn @click="parent.okHandler" class="primary rounded-lg h4 mb-2 px-4">Подтвердить</v-btn>
              </template>
            </v-datetime-picker>
          </v-col>
          <v-col cols="12" md="6">
            <h4>Дата окончания*</h4>
            <v-datetime-picker
                ref="dateTimePickerEnd"
                v-model="endDate"
                :date-picker-props="{
                  min: minEndDate,
                  locale: 'ru-RU',
                  firstDayOfWeek: 1
                }"
                :time-picker-props="{
                  format: '24hr',
                  min: minEndTime
                }"
                :text-field-props="{
                  required: true,
                  rules: [(v) => !!v || ''],
                  hideDetails: true,
                  outlined: true, class: 'mt-2 mb-1 rounded-lg',
                  appendIcon: 'calendar_today'
                }"
            />
          </v-col>
          <v-col cols="12" md="6">
            <h4>Количество вопросов*</h4>
            <v-text-field
                required
                :rules="[(v) => !!v ||  '']"
                v-model="amountQuestions"
                type="number"
                min="0"
                append-icon="format_list_numbered"
                hide-details
                outlined
                class="mt-2 mb-1 rounded-lg"
                background-color="white"
            />
          </v-col>
          <v-col cols="12" md="6">
            <h4>Время для прохождения (в минутах)*</h4>
            <v-text-field
                v-model="duration"
                :rules="[(v) => !!v ||  '']"
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
          <v-col cols="12" md="6">
            <h4>Категории</h4>
            <v-select
                v-model="selectedQuestionCategories"
                :items="questionCategories"
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
          <v-col align-self="start" cols="12" md="6">
            <h4>Пароль</h4>
            <v-text-field
                hide-details
                outlined
                type="password"
                append-icon="vpn_key"
                class="mt-2 mb-1 rounded-lg"
                background-color="white"
            />
          </v-col>
          <v-btn @click="createTest()" class="success rounded-lg h4 mx-auto mt-6" x-large>Создать</v-btn>
        </v-row>
      </v-col>
    </v-form>
  </v-container>
</template>

<script>
import Vue from 'vue'
import {mapMutations, mapState} from 'vuex'

import Calendar from 'v-calendar/lib/components/calendar.umd'
import DatePicker from 'v-calendar/lib/components/date-picker.umd'

Vue.component('calendar', Calendar)
Vue.component('date-picker', DatePicker)

import DatetimePicker from 'vuetify-datetime-picker'

Vue.use(DatetimePicker)

export default {
  name: "CreateTest",
  components: {
    DatePicker
  },
  data() {
    return {
      range: {
        start: new Date(2020, 0, 1),
        end: new Date(2020, 0, 5)
      },
      valid: false,
      // data from datetime-picker
      datePickerStart: null,
      timePickerStart: null,
      datePickerEnd: null,
      // test data
      type: null,
      name: "",
      startDate: null,
      endDate: null,
      amountQuestions: null,
      duration: null,
      selectedQuestionCategories: null,
      password: "",
    }
  },
  computed: {
    ...mapState('data', ["questionCategories", "testTypes"]),
    minStartTime() {
      // startDate is today
      if (this.datePickerStart === new Date().toISOString().split('T')[0]) {
        // set time limit
        return new Date().getHours() + ':' + new Date().getMinutes()
      }
      // not set time limit
      else return null;
    },
    minEndDate() {
      // startDate set
      if (this.startDate) {
        // set date limit
        return this.startDate.toISOString().split('T')[0];
      }
      // not set date limit
      else return new Date().toISOString().split('T')[0];
    },
    minEndTime() {
      // startDate set and startDate is today
      if (this.startDate && this.datePickerEnd === this.startDate.toISOString().split('T')[0]) {
        console.log(1);
        // set time limits
        return this.startDate.getHours() + ':' + this.startDate.getMinutes()
      }
      // startDate not set and endDate is today
      else if (!this.startDate && this.datePickerEnd === new Date().toISOString().split('T')[0]) {
        console.log(2);
        // set time limit
        return new Date().getHours() + ':' + new Date().getMinutes();
      }
      // Start date not set. Set time limits
      else return null;
    }
  },
  watch: {},
  methods: {
    ...mapMutations('layout', ['SHOW_MSG_DIALOG']),
    ...mapMutations('data', ['CREATE_TEST']),
    createTest() {
      if (this.$refs.form.validate()) {
        let test = {
          type: this.type,
          name: this.name,
          start_date: this.startDate,
          end_date: this.endDate,
          amount_questions: this.amountQuestions,
          duration: this.duration,
          is_active: true,
          selected_question_categories: this.selectedQuestionCategories,
          password: this.password
        }
        this.CREATE_TEST(test);
        // Show msg
        this.SHOW_MSG_DIALOG({type: 'primary', text: test.type + ': "' + test.name + '" ' + (test.type === "Викторина" ? "создана" : "создан")});
      }
    },
  },
  mounted() {
    // Watch for changes date in dateTimePickerStart
    this.$watch(
        () => {
          return this.$refs.dateTimePickerStart.date
        },
        (val) => {
          this.datePickerStart = val;
        }
    )
    // Watch for changes time in dateTimePickerStart
    this.$watch(
        () => {
          return this.$refs.dateTimePickerStart.time
        },
        (val) => {
          this.timePickerStart = val;
        }
    )
    // Watch for changes date in dateTimePickerEnd
    this.$watch(
        () => {
          return this.$refs.dateTimePickerEnd.date
        },
        (val) => {
          this.datePickerEnd = val;
        }
    )
  },
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