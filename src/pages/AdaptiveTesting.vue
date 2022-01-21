<template>
  <v-container class="mt-4">
    <v-stepper
        v-model="level"
        width="100%"
        height="100%"
    >
      <!--  Levels   -->
      <v-stepper-header>
        <v-stepper-step step="1"
        >
          Лёгкий уровень знаний
        </v-stepper-step>

        <v-divider></v-divider>
        <v-stepper-step step="2"
        >
          Средний уровень знаний
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="3">
          Высокий уровень знаний
        </v-stepper-step>
      </v-stepper-header>
      <!--  Tasks -->
      <div class="ma-8 mb-0">
        <div v-if="currentTask" class="d-flex flex-column align-baseline mt-4">
          <!-- Type: singleradiobutton -->
          <template v-if="currentTask.type === 'singleradiobutton'">
            <h3 v-text="currentTask.text" class="mb-0"/>
            <!-- if have img -->
            <v-img v-if="currentTask.img" :src="currentTask.img" style="border-radius: 8px; margin-top: 16px"></v-img>
            <v-radio-group v-model="answer">
              <v-radio
                  v-for="(n, index) in currentTask.variants"
                  :key="n"
                  :label="n"
                  :value="index"
              ></v-radio>
            </v-radio-group>
          </template>
          <!-- Type: multiradiobutton -->
          <template v-else-if="currentTask.type === 'multiradiobutton'">
            <h4 v-text="currentTask.text" class="mb-0"/>
            <v-radio-group v-model="answer" multiple>
              <v-radio
                  v-for="(n, index) in currentTask.variants"
                  :key="n"
                  :label="n"
                  :value="index"
              ></v-radio>
            </v-radio-group>
          </template>
          <!-- Type: text -->
          <template v-else-if="currentTask.type === 'text'">
            <h3 v-text="currentTask.text"/>
            <v-textarea v-model.trim="answer" filled auto-grow style="width: 100%"></v-textarea>
          </template>
          <!-- Type: relation -->
          <template v-else-if="currentTask.type === 'relation'">
            <h3 class="font-weight-bold">Установите соответствия:</h3>
            <div class="d-flex my-4" style="width: 100%">
              <div class="d-flex flex-column align-baseline flex-grow-1">
                <h3 v-text="currentTask.title1" class="mb-6 text-decoration-underline"/>
                <div class="d-flex align-center my-2" v-for="(el, index) in currentTask.variants1" :key="index">
                  <p v-text="el" class="mb-0"/>
                  <v-select
                      dense
                      hide-details
                      style="width: 70px"
                      v-model="answer[index]"
                      :items="(Array.apply(null, {length: currentTask.variants2.length}).map(Number.call, Number)).map(el => el + 1)"
                      outlined
                      class="ml-4"
                  />
                </div>
              </div>
              <div class="d-flex flex-column align-baseline flex-grow-1">
                <h3 v-text="currentTask.title2" class="mb-6 text-decoration-underline"/>
                <div v-for="el in currentTask.variants2" :key="el">
                  <p v-text="el" class="my-3"/>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
      <div class="d-flex justify-end">
        <v-btn
            :disabled="answer === null"
            color="primary"
            class="mr-4"
            rounded
            outlined
            @click="clear()"
        >
          Очистить
        </v-btn>
        <v-btn
            :disabled="(!Number.isInteger(answer) && !answer) || (Array.isArray(answer) && answer.includes(undefined))"
            color="primary"
            class="mb-6 mr-8"
            rounded
            @click="confirm()"
        >
          Подтвердить
        </v-btn>
      </div>
    </v-stepper>
  </v-container>
</template>

<script>
export default {
  name: 'AdaptiveTesting',
  data() {
    return {
      /* Config */
      level: 2,
      maxRepeat: 3,
      needPointForNextLvl: 2,

      levelRepeat: [null, 0, 1, 0],
      currentPointForNextLvl: 0,
      currentTask: null,
      tasks: [
        // lvl 1
        {
          level: 1,
          type: "singleradiobutton",
          text: "Как называется способность объекта скрывать свои данные и реализацию от других объектов системы?",
          variants: [
            "Полиморфизм",
            "Инкапсуляция",
            "Абстракция",
            "Наследование"
          ],
          trueAnswerNumber: 1
        },
        {
          level: 1,
          type: "singleradiobutton",
          text: "Выберите правильную структуру альтернативного условного оператора (полный вариант)",
          variants: [
            "If <условие> Then <оператор 1>",
            "If <условие> Then <оператор 1> Else <оператор 2>",
            "If <условие> Then <оператор 1> <оператор 2>",
            "If <условие 1> Then if <условие 2> Then <оператор 1> <оператор 2>"
          ],
          trueAnswerNumber: 1
        },
        {
          level: 1,
          type: "singleradiobutton",
          text: "Какой принцип нарушает следующий код:",
          img: "assets/1-1.png",
          variants: [
            "Инкапсуляция",
            "Композиция",
            "Равенство",
            "Полиморфизм",
            "Агрегация"
          ],
          trueAnswerNumber: 0
        },
        // lvl 2
        {
          level: 2,
          type: "multiradiobutton",
          text: "Что из перечисленного относится к трём китам ООП (три основные понятия)?",
          variants: [
            "Модульность",
            "Наследование",
            "Однозначность",
            "Полиморфизм",
            "Разделение обязанностей",
            "Строгая типизация",
            "Инкапсуляция"
          ],
          trueAnswerNumber: [1, 3, 6]
        },
        {
          level: 2,
          type: "multiradiobutton",
          text: "Какие бывают виды наследования?",
          variants: [
            "Единственное наследование",
            "Множественное наследование",
            "Многоуровневое наследование",
            "Иерархическое наследование",
            "Гибридное наследование",
            "Полное наследование",
            "Полиморфизм"
          ],
          trueAnswerNumber: [1, 2, 3, 4]
        },
        // lvl 3
        {
          level: 3,
          type: "relation",
          title1: "Определение",
          variants1: [
            "A. Использует переменную, которая последовательно принимает значения из заданного диапазона. С каждой сменой значения переменной выполняются действия, заключенные в теле цикла",
            "B. Выполняет набор действий для каждого объекта из указанной группы объектов",
            "C. Выполняет блок кода до тех пор, пока выполняется заданное условие"
          ],
          title2: "Название цикла",
          variants2: [
            "1. For Each",
            "2. For...Next",
            "3. Do While"
          ],
          trueAnswer: [1, 2, 3]
        },
        {
          level: 3,
          type: "text",
          text: "Как называется разновидность управляющей конструкций предназначенная для организации многократного исполнения набора инструкций?",
          trueAnswerText: "Цикл"
        },
        {
          level: 3,
          type: "relation",
          title1: "Свойство",
          variants1: [
            "A. Сущность реального мира",
            "B. Работает как переменная класса",
            "C. Это физическая сущность",
            "D. Занимает место в памяти при создании",
            "E. Должен быть объявлен каждый раз, когда нужен",
            "F. Обычно является шаблоном создания объектов",
            "G. Объединяет методы и данные в единую ячейку",
            "H. Это логическая сущность",
            "I. Не занимает место в памяти при создании",
            "J. Объявляется один раз",
          ],
          title2: "Название",
          variants2: [
            "1. Объект",
            "2. Класс"
          ],
          trueAnswer: [1, 1, 1, 1, 2, 2, 2, 2, 2, 2]
        },
      ],
      answer: null,

      /* Layout */
      showSnackbar: false,
    }
  },
  methods: {
    nextTask() {
      let currentLvlTasks = this.tasks.filter(el => el.level === this.level && JSON.stringify(this.currentTask) !== JSON.stringify(el));
      this.currentTask = currentLvlTasks.rand();
      this.answer = null;
    },
    confirm() {
      this.showSnackbar = true;

      let answerIsTrue = false;
      if (this.currentTask.type === "text" && this.currentTask.trueAnswerText === this.answer) answerIsTrue = true;
      if (this.currentTask.type === "singleradiobutton" && this.currentTask.trueAnswerNumber === this.answer) answerIsTrue = true;
      if (this.currentTask.type === "multiradiobutton" && this.currentTask.trueAnswerNumber.length === this.answer.length && JSON.stringify(this.answer.sort((a, b) => a - b)) === JSON.stringify(this.currentTask.trueAnswerNumber.sort((a, b) => a - b))) answerIsTrue = true;
      if (this.currentTask.type === "relation" && JSON.stringify(this.answer) === JSON.stringify(this.currentTask.trueAnswer)) answerIsTrue = true;

      if (answerIsTrue) {
        this.currentPointForNextLvl++;

        if (this.currentPointForNextLvl === this.needPointForNextLvl) {
          this.currentPointForNextLvl = 0;
          this.level++;
          this.levelRepeat[this.level]++;
        }
      } else {
        this.currentPointForNextLvl--;

        if (Math.abs(this.currentPointForNextLvl) === this.needPointForNextLvl) {
          this.currentPointForNextLvl = 0;
          this.level--;
          this.levelRepeat[this.level]++;
        }
      }

      /* Check test end */
      /* Repeat */
      if (this.level === 1 && this.maxRepeat === this.levelRepeat[this.level]) this.$router.push({name: 'result', params: {lvl: "1"}});
      if (this.level === 2 && this.maxRepeat === this.levelRepeat[this.level]) this.$router.push({name: 'result', params: {lvl: "2"}});
      if (this.level === 3 && this.maxRepeat === this.levelRepeat[this.level]) this.$router.push({name: 'result', params: {lvl: "3"}});
      /* Out */
      if (this.level === 0) this.$router.push({name: 'result', params: {lvl: "1"}});
      if (this.level === 4) this.$router.push({name: 'result', params: {lvl: "3"}});
      this.nextTask();
    },
    clear() {
      this.currentTask.type === "relation" ? this.answer = new Array(this.currentTask.variants1.length) : this.answer = null
    }
  },
  watch: {
    currentTask(val) {
      if (val.type === "relation") this.answer = new Array(this.currentTask.variants1.length)
    }
  },
  mounted() {
    // Функция получение случайного элемента массива
    Array.prototype.rand = function () {
      return this[Math.floor(Math.random() * this.length)];
    }
    // Устанавливаем начальный вопрос
    this.nextTask();
  }
}
</script>

