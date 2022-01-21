<template>
  <v-container class="px-4 px-lg-8 px-xl-12">
    <!-- Logo -->
    <v-row class="mt-4 mt-xl-5 justify-center align-center flex-grow-0">
      <v-col cols="12" lg="6" class="d-flex justify-center justify-lg-end">
        <img class="create-test-svg pr-lg-4" :src="require('@/assets/svg/Create-1.svg')" alt="Иконка создания">
      </v-col>
      <v-col cols="12" lg="6" class="d-flex justify-center justify-lg-start">
        <span class="create-test-title primary--text text-center text-lg-left" style="white-space: pre-line">
          {{ mode === "create" ? "Создайте свой \n опросник" : "Редактируйте \n опросник" }}
        </span>
      </v-col>
    </v-row>
    <!-- Body -->
    <v-form ref="form">
      <v-card class="rounded-lg my-8">
        <v-stepper v-model="e1" width="100%" non-linear>
          <v-stepper-header>
            <!-- TODO Сделать проверку на завершение шага -->
            <v-stepper-step editable step="1">
              Общие настройки
            </v-stepper-step>
            <v-divider/>
            <v-stepper-step step="2" editable>
              Настройки сценария
            </v-stepper-step>
            <v-divider/>
            <v-stepper-step step="3" editable>
              Настройки доступа
            </v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <v-col cols="11" md="10" xl="8" class="mx-auto">
                <v-row class="align-center">
                  <v-col cols="12" md="6">
                    <h4>Название</h4>
                    <v-text-field
                        v-model="test.name"
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
                    <h4>Тип</h4>
                    <v-select
                        v-model="test.type"
                        required
                        hide-details
                        :items="test_types"
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
                        v-model="test.category_ids"
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
                    <v-row
                    >
                      <v-col cols="12" md="4" v-for="(_, i) in test.count_of_tasks_by_lvl" :key="i">
                        <v-text-field
                            v-model.number="test.count_of_tasks_by_lvl[i]"
                            required
                            outlined
                            :rules="[(v) => !!v ||  '']"
                            hide-details
                            type="number"
                            min="0"
                            :label="i === 0 ? 'Лёгкие' : i === 1 ? 'Средние' : 'Сложные'"
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
                            v-model="show_password"
                            hide-details
                            class="mr-8 my-2"
                        />
                      </v-col>
                      <v-col>
                        <v-switch
                            label="Ограничение периода тестирования"
                            v-model="show_range"
                            hide-details
                            class="mr-8 my-2"
                        />
                      </v-col>
                      <v-col>
                        <v-switch
                            label="Ограничение времени тестирования"
                            v-model="show_duration"
                            hide-details
                            class="mr-8 my-2"
                        />
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12" class="pa-0" v-show="show_range">
                    <vc-date-picker
                        ref="datapicker"
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
                              :rules="[(v) => !show_range || !!v || '']"
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
                              :rules="[(v) => !show_range || !!v || '']"
                              hide-details
                              outlined
                              class="mt-2 mb-1 rounded-lg"
                              append-icon="calendar_today"
                          />
                        </v-col>
                      </template>
                    </vc-date-picker>
                  </v-col>
                  <v-col cols="12" md="6" v-show="show_duration">
                    <h4>Время для прохождения (в минутах)</h4>
                    <v-text-field
                        v-model.number="test.testing_time"
                        :rules="[(v) => !show_duration || !!v ||  '']"
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
                  <v-col align-self="end" cols="12" md="6" v-show="show_password">
                    <h4>Пароль</h4>
                    <v-text-field
                        v-model="test.password"
                        hide-details
                        outlined
                        type="password"
                        append-icon="vpn_key"
                        class="mt-2 mb-1 rounded-lg"
                        background-color="white"
                        :rules="[(v) => !show_password || !!v ||  '']"
                    />
                  </v-col>
                  <v-col align-self="end" class="d-flex justify-end mb-2 mt-2">
                    <v-btn
                        @click="mode === 'create' ? lCreateTest() : lUpdateTest()"
                        class="success rounded-lg h4 ml-2"
                        x-large
                        :loading="loading">
                      Сохранить
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>

              <div class="d-flex align-center">
                <v-spacer/>
                <v-btn
                    text
                    to="/teacher/tests"
                    exact-path
                    class="mr-1"
                >
                  Отмена
                </v-btn>
                <v-btn
                    color="primary"
                    large
                    @click="e1 = 2"
                >
                  Далее
                </v-btn>
              </div>
            </v-stepper-content>

            <v-stepper-content step="2">
              <SelectTestTasks/>

              <div class="d-flex align-center">
                <v-spacer/>
                <v-btn text @click="e1--" class="mr-1">
                  Назад
                </v-btn>

                <v-btn
                    color="primary"
                    large
                    @click="e1 = 3"
                >
                  Далее
                </v-btn>
              </div>
            </v-stepper-content>

            <v-stepper-content step="3">
              <v-card
                  class="mb-12"
                  color="grey lighten-1"
                  height="200px"
              ></v-card>

              <div class="d-flex align-center">
                <v-spacer/>
                <v-btn text @click="e1--" class="mr-1">
                  Назад
                </v-btn>
                <v-btn
                    color="primary"
                    large
                >
                  Сохранить
                </v-btn>
              </div>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-card>
    </v-form>
  </v-container>
</template>

<script>
import Vue from 'vue'
import {mapMutations, mapState, mapActions, mapGetters} from 'vuex'
import VCalendar from 'v-calendar';
import SelectTestTasks from "@/components/SelectTestTasks";

// Use v-calendar & v-date-picker components
Vue.use(VCalendar, {
  componentPrefix: 'vc'
});

export default {
  name: "Test",
  components: {SelectTestTasks},
  data() {
    return {
      mode: null,
      loading: false,
      valid: false,
      show_range: true,
      show_duration: true,
      show_password: false,
      // Разделы
      e1: 1,
      // test data
      test: {
        type: null,
        name: null,
        count_of_tasks_by_lvl: [null, null, null],
        category_ids: null,
        date_of_beginning: null,
        date_of_finishing: null,
        testing_time: null,
        password: null,
      },
      // datepicker работает с объектом, поэтому будем зеркалить поля date_of_beginning и date_of_finishing сюда
      range: {
        start: null,
        end: null
      },
    }
  },
  computed: {
    ...mapState('data', ["categories", "test_types"]),
    ...mapGetters('data', ['getTestById'])
  },
  methods: {
    ...mapMutations('layout', ['SHOW_MSG_DIALOG']),
    ...mapActions('data', ['createTest', 'updateTest']),
    lCreateTest() {
      if (this.$refs.form.validate()) {
        if (this.show_range) {
          this.test.date_of_beginning = this.range.start;
          this.test.date_of_finishing = this.range.end;
        }
        if (!this.show_duration) this.test.testing_time = null;
        if (!this.show_password) this.test.password = null;

        this.loading = true;
        this.createTest(this.test)
            .then(() => {
              this.loading = false;
              this.SHOW_MSG_DIALOG({
                type: 'primary',
                text: this.test.type + ': "' + this.test.name + '" ' + (this.test.type === "Викторина" ? "создана" : "создан")
              });
              this.clear();
            });
      }
    },
    lUpdateTest() {
      if (this.$refs.form.validate()) {
        this.loading = true;

        if (this.show_range) {
          this.test.date_of_beginning = this.range.start;
          this.test.date_of_finishing = this.range.end;
        }
        if (!this.show_duration) this.test.testing_time = null;
        if (!this.show_password) this.test.password = null;

        this.updateTest(this.test)
            .then(() => {
              this.loading = false;
              this.SHOW_MSG_DIALOG({type: 'primary', text: "Изменения сохранены"});
              this.$router.push("/teacher/tests");
            })
      }
    },
    clear() {
      // clear data
      this.test = {
        type: null,
        name: null,
        count_of_tasks_by_lvl: [null, null, null],
        category_ids: null,
        date_of_beginning: null,
        date_of_finishing: null,
        testing_time: null,
        password: null
      }
      this.range = {
        start: null,
        end: null
      };
      this.show_range = true;
      this.show_duration = true;
      this.show_password = false;
      // clear form valid
      this.$refs.form.resetValidation();
    }
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
  },
  beforeRouteEnter(to, from, next) {
    if (to.name === "EditTest") {
      next(vm => {
        vm.mode = "edit";
        vm.show_range = false;
        vm.show_duration = false;
        vm.show_password = false;

        Object.assign(vm.test, vm.getTestById(Number(vm.$route.params.id)));

        if (vm.test.date_of_beginning && vm.test.date_of_finishing) {
          vm.range.start = new Date(vm.test.date_of_beginning);
          vm.range.end = new Date(vm.test.date_of_finishing);
          vm.$refs.datapicker.value_ = vm.range;
          vm.show_range = true;
        }
        if (vm.test.testing_time) {
          vm.show_duration = true;
        }
        if (vm.test.password) {
          vm.show_password = true;
        }
      })
    } else next(vm => {
      if (vm.mode === "edit") vm.clear();
      vm.mode = "create";
    });
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
    width: 200px;
    height: 200px;
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