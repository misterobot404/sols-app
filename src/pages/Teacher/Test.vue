<template>
  <div>
    <!-- Шапка -->
    <v-container fluid class="d-flex align-center px-4 py-4 px-lg-8">
      <img height="80px" class="mr-4" :src="require('@/assets/test.png')" alt="Иконка создания">
      <h2 style="font-weight: bolder" v-text="mode === 'create' ? 'Создание теста' : 'Изменение теста'"/>
    </v-container>
    <v-divider/>
    <!-- Содержание -->
    <v-container fluid class="px-4 px-lg-8 py-4 py-lg-8">
      <v-form ref="form">
        <v-card class="rounded-lg">
          <v-stepper v-model="step" width="100%" non-linear>
            <!-- Шапка шагов -->
            <v-stepper-header>
              <!-- TODO Сделать проверку на завершение шага -->
              <v-stepper-step editable step="1" class="px-10">
                Общие настройки
              </v-stepper-step>
              <v-divider/>
              <v-stepper-step step="2" editable class="px-10">
                Настройки сценария
              </v-stepper-step>
              <v-divider/>
              <v-stepper-step step="3" editable class="px-10">
                Настройки доступа
              </v-stepper-step>
            </v-stepper-header>
            <!-- Содержание шагов -->
            <v-stepper-items>
              <!-- Шаг 1. Общие настройки -->
              <v-stepper-content step="1">
                <v-col cols="11" md="10" xl="7" class="mx-auto">
                  <!-- Содержание -->
                  <v-row>
                    <!-- Название -->
                    <v-col cols="12" md="6">
                      <h4>Название <span class="red--text">*</span></h4>
                      <v-text-field
                          v-model="test.name"
                          required
                          :rules="[(v) => !!v ||  '']"
                          hide-details
                          append-icon="title"
                          outlined
                          class="my-1 rounded-lg"
                          background-color="white"
                      />
                    </v-col>
                    <!-- Тип -->
                    <v-col cols="12" md="6">
                      <h4>Тип <span class="red--text">*</span></h4>
                      <v-select
                          v-model="test.type"
                          required
                          hide-details
                          :items="test_types"
                          item-value="name"
                          item-text="name"
                          :item-disabled="(v) => v.name !== 'Тест'"
                          :rules="[(v) => !!v ||  '']"
                          outlined
                          class="my-1 rounded-lg"
                          background-color="white"
                          hint="Выберите тип"
                      />
                    </v-col>
                    <!-- Количество заданий -->
                    <v-col cols="12" md="6">
                      <h4>Количество заданий <span class="red--text">*</span></h4>
                      <v-text-field
                          v-model.number="test.count_of_task"
                          required
                          outlined
                          append-icon="task_alt"
                          :rules="[(v) => !!v ||  '']"
                          hide-details
                          type="number"
                          min="0"
                          class="rounded-lg my-1"
                      />
                    </v-col>
                    <!-- Время прохождения -->
                    <v-col cols="12" md="6">
                      <h4>
                        Время для прохождения (в минутах)
                        <v-tooltip top>
                          <template v-slot:activator="{ on, attrs }">
                            <v-icon
                                small
                                class="material-icons-outlined"
                                v-bind="attrs"
                                v-on="on"
                            >
                              help_outline
                            </v-icon>
                          </template>
                          <span>Для отключения ограничения времени, оставьте это поле пустым</span>
                        </v-tooltip>
                      </h4>
                      <v-text-field
                          v-model.number="test.testing_time"
                          append-icon="schedule"
                          outlined
                          hide-details
                          type="number"
                          min="0"
                          class="my-1 rounded-lg"
                          background-color="white"
                      />
                    </v-col>
                    <!-- Период тестирования -->
                    <v-col cols="12" class="pa-0">
                      <vc-date-picker
                          ref="datapicker"
                          v-model="range"
                          is-range
                          mode='dateTime'
                          :popover="{ placement: $screens({ default: 'top', md: 'right' }) }"
                          is24hr
                          :minute-increment="5"
                          :min-date='new Date()'
                          :firstDayOfWeek="2"
                          locale="ru"
                          class="d-flex flex-wrap"
                      >
                        <template v-slot="{ inputValue, inputEvents }">
                          <v-col cols="12" md="6">
                            <h4>Дата начала <span class="red--text">*</span></h4>
                            <v-text-field
                                ref="startDateTextField"
                                :value="inputValue.start"
                                v-on="inputEvents.start"
                                required
                                :rules="[(v) => !!v || '']"
                                hide-details
                                outlined
                                readonly
                                class="my-1 rounded-lg"
                                append-icon="date_range"
                            />
                          </v-col>
                          <v-col cols="12" md="6">
                            <h4>Дата окончания <span class="red--text">*</span></h4>
                            <v-text-field
                                ref="endDateTextField"
                                :value="inputValue.end"
                                v-on="inputEvents.end"
                                required
                                readonly
                                :rules="[(v) => !!v || '']"
                                hide-details
                                outlined
                                class="my-1 rounded-lg"
                                append-icon="date_range"
                            />
                          </v-col>
                        </template>
                      </vc-date-picker>
                    </v-col>
                    <!-- Описание -->
                    <v-col cols="12" class="pt-2">
                      <h4>Описание</h4>
                      <v-textarea
                          v-model="test.description"
                          hide-details
                          outlined
                          auto-grow
                          class="my-1 rounded-lg"
                      />
                    </v-col>
                  </v-row>
                  <!-- Навигация -->
                  <div class="d-flex align-center justify-center justify-md-end pt-5">
                    <v-btn text @click="step--" class="mr-1">
                      Назад
                    </v-btn>
                    <v-btn
                        @click="step++"
                        width="120"
                        color="primary"
                        large
                    >
                      Далее
                    </v-btn>
                  </div>
                </v-col>
              </v-stepper-content>
              <!-- Шаг 2. Настройки сценария -->
              <v-stepper-content step="2">
                <!-- Содержание -->
                <v-col cols="12" md="10" class="mx-auto">
                  <!-- Компонент будет менять состояние данных родителя -->
                  <ScriptSetup :attached_subjects="test.attached_subjects" :attached_categories="test.attached_categories"/>
                  <!-- Навигация -->
                  <div class="d-flex align-center justify-center justify-md-end pt-6">
                    <v-btn text @click="step--" class="mr-1">
                      Назад
                    </v-btn>
                    <v-btn
                        color="primary"
                        large
                        width="120"
                        class="ma-1"
                        @click="step++"
                    >
                      Далее
                    </v-btn>
                  </div>
                </v-col>
              </v-stepper-content>
              <!-- Шаг 3. Настройки доступа -->
              <v-stepper-content step="3">
                <v-col cols="12" xl="8" class="mx-auto">
                  <!-- Информация -->
                  <v-row>
                    <!--  Типы доступа  -->
                    <v-col cols="12" md="6">
                      <h4>Тип доступа <span class="red--text">*</span></h4>
                      <v-select
                          v-model="test.access_type"
                          required
                          hide-details
                          :items="[{name: 'Доступ на группу', value: 'group'},{name: 'Доступ на студента (в разработке)', value: 'student'},{name: 'Доступ по ссылке (в разработке)', value: 'link'}]"
                          item-value="value"
                          item-text="name"
                          :item-disabled="(v) => v.name !== 'Доступ на группу'"
                          :rules="[(v) => !!v ||  '']"
                          outlined
                          class="my-1 rounded-lg"
                          background-color="white"
                          hint="Выберите тип"
                      />
                    </v-col>
                    <!--  Пароль  -->
                    <v-col cols="12" md="6">
                      <h4>
                        Пароль
                        <v-tooltip top max-width="400">
                          <template v-slot:activator="{ on, attrs }">
                            <v-icon
                                small
                                class="material-icons-outlined"
                                v-bind="attrs"
                                v-on="on"
                            >
                              help_outline
                            </v-icon>
                          </template>
                          <span>При заполнении поля, студенту потребуется ввести пароль для начала тестирования</span>
                        </v-tooltip>
                      </h4>
                      <v-text-field
                          v-model="test.password"
                          hide-details
                          outlined
                          type="password"
                          append-icon="vpn_key"
                          class="my-1 rounded-lg"
                          background-color="white"
                      />
                    </v-col>
                    <!-- Выбранные группы -->
                    <v-col cols="12" class="d-flex align-center flex-wrap" style="min-height: 56px">
                      <h4 class="mr-4">Выбранные группы: <span class="red--text">*</span></h4>
                      <h4 v-if="!test.attach_groups.length" class="text-decoration-underline">Не выбрано</h4>
                      <template v-else>
                        <v-chip
                            v-for="(chip, i) in test.attach_groups"
                            :key="i"
                            class="mr-2"
                            close
                            @click:close="test.attach_groups.splice(i, 1)"
                        >
                          {{ chip }}
                        </v-chip>
                      </template>
                    </v-col>
                    <!-- Выбор групп -->
                    <v-col cols="12">
                      <!-- Компонент будет менять состояние данных родителя -->
                      <GroupSelection :attach_groups="test.attach_groups"/>
                    </v-col>
                  </v-row>
                  <!-- Навигация -->
                  <div class="d-flex align-center justify-center justify-md-end pt-6">
                    <v-btn text @click="step--" class="mr-1">
                      Назад
                    </v-btn>
                    <v-btn
                        @click="mode === 'create' ? lCreateTest() : lUpdateTest()"
                        color="primary"
                        large
                        :loading="loading"
                        v-text="mode === 'create' ? 'Создать тест' : 'Сохранить изменения'"
                    />
                  </div>
                </v-col>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-card>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import Vue from 'vue'
import {mapMutations, mapState, mapActions, mapGetters} from 'vuex'
import VCalendar from 'v-calendar';
import ScriptSetup from "@/components/Test/ScriptSetup";
import GroupSelection from "@/components/Test/GroupSelection";

// Use v-calendar & v-date-picker components
Vue.use(VCalendar, {
  componentPrefix: 'vc'
});

export default {
  name: "Test",
  components: {
    GroupSelection,
    ScriptSetup
  },
  data() {
    return {
      mode: null,
      loading: false,
      valid: false,
      // Текущий шаг создания/редактирования теста
      step: 1,
      // Тест
      test: this.getNewTest(),
      // Период начала/окончания тестирования. datepicker работает с объектом, поэтому будем требуется дублировать поля date_of_beginning и date_of_finishing сюда
      range: {
        start: null,
        end: null
      },
    }
  },
  computed: {
    ...mapState('data', ["categories", "test_types"]),
    ...mapGetters('data', ['getTestById']),
  },
  methods: {
    ...mapMutations('layout', ['SHOW_MSG_DIALOG']),
    ...mapActions('data', ['createTest', 'updateTest']),
    lCreateTest() {
      if (this.$refs.form.validate()) {
        this.test.date_of_beginning = this.range.start;
        this.test.date_of_finishing = this.range.end;

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
        this.test.date_of_beginning = this.range.start;
        this.test.date_of_finishing = this.range.end;

        this.loading = true;
        this.updateTest(this.test)
            .then(() => {
              this.loading = false;
              this.SHOW_MSG_DIALOG({type: 'primary', text: "Изменения сохранены"});
              this.$router.push("/teacher/tests");
            })
      }
    },
    getNewTest() {
      return {
        // Общие настройки
        name: null,
        type: null,
        testing_time: null,
        count_of_task: null,
        date_of_beginning: null,
        date_of_finishing: null,
        description: null,
        // Настройки сценария
        attached_subjects: [],
        attached_categories: [],
        // Настройки доступа
        access_type: "group",
        attach_groups: [],
        password: null,
      }
    },
    clear() {
      // clear data
      this.test = this.getNewTest();
      this.range = {
        start: null,
        end: null
      };

      // clear form valid
      this.$refs.form.resetValidation();
    },
  },
  mounted() {
    // Костыль. v-text-field inside date-picker call error on init
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
    // Страница изменения теста
    if (to.name === "EditTest") {
      next(vm => {
        vm.mode = "edit";
        // Копируем существующий тест для изменения
        Object.assign(vm.test, vm.getTestById(Number(vm.$route.params.id)));
        // Приводим переменные с данными начала/окончания тестирования к типу Data
        if (vm.test.date_of_beginning && vm.test.date_of_finishing) {
          vm.range.start = new Date(vm.test.date_of_beginning);
          vm.range.end = new Date(vm.test.date_of_finishing);
          vm.$refs.datapicker.value_ = vm.range;
        }
      })
    }
    // Страница создания теста
    else next(vm => {
      // Очищаем предыдущие данные
      if (vm.mode === "edit") vm.clear();
      vm.mode = "create";
    });
  }
}
</script>