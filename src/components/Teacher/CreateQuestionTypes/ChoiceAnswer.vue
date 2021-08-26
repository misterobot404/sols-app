<template>
  <v-row>
    <v-col v-for="(el, index) in answers" cols="12" :key="index">
      <div class="d-flex align-center mb-3">
        <h4>Вариант ответа</h4>
        <v-checkbox
            :input-value="rightAnswers.includes(el)"
            @click="rightAnswerClick(el)"
            class="mx-4 my-0"
            hide-details
        >
          <template v-slot:label>
            <span class="p-12-regular" style="color: #152536">Правильный ответ</span>
          </template>
        </v-checkbox>
        <v-spacer/>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                v-bind="attrs"
                v-on="on"
                @click="removeAnswer(index)"
                icon
            >
              <v-icon>close</v-icon>
            </v-btn>
          </template>
          <span>Удалить ответ</span>
        </v-tooltip>
      </div>
      <v-textarea
          v-model="answers[index]"
          hide-details
          outlined
          auto-grow
          class="rounded-lg"
      />
    </v-col>
    <v-col cols="12" class="mt-4 d-flex justify-space-between align-center">
      <v-btn
          @click="addAnswer()"
          class="rounded-lg h4 px-3"
          large
          text
      >
        <v-icon class="mr-2">
          control_point
        </v-icon>
        <span style="text-transform: none">Добавить ещё ответы</span>
      </v-btn>
      <v-btn :loading="loading" class="success rounded-lg h4" large @click="done()">Сохранить</v-btn>
    </v-col>
  </v-row>
</template>

<script>

import {mapMutations} from "vuex";

export default {
  name: "ChoiceAnswer",
  props: ["data", "loading"],
  data() {
    return {
      answers: ["", ""],
      rightAnswers: []
    }
  },
  watch: {
    data: {
      handler(val) {
        if (val) {
          this.answers = val.body;
          this.rightAnswers = val.rightAnswer.answer;
        }
      },
      immediate: true
    }
  },
  methods: {
    ...mapMutations('layout', ['SHOW_MSG_DIALOG']),
    done() {
      // check empty answer
      let emptyAnswerFound = false;
      this.answers.forEach((el) => {
        if (el.text === "") emptyAnswerFound = true
      });
      if (emptyAnswerFound) {
        this.SHOW_MSG_DIALOG({type: 'error', text: "Заполните все созданные варианты ответов"});
        return;
      }
      // check answer count
      if (this.answers.length < 2) {
        this.SHOW_MSG_DIALOG({type: 'error', text: "Минимальное количество ответов: 2"});
        return;
      }
      // check true answer
      if (!this.rightAnswers.length) {
        this.SHOW_MSG_DIALOG({type: 'error', text: "Выберите хотя бы один правильный ответ"});
        return;
      }
      // emit answers to parent
      this.$emit('done', {
        body: this.answers,
        rightAnswer: this.rightAnswers
      })
    },
    addAnswer() {
      this.answers.push("")
    },
    removeAnswer(index) {
      this.answers.splice(index, 1);
    },
    rightAnswerClick(answer) {
      if (this.rightAnswers.includes(answer))
        this.rightAnswers = this.rightAnswers.filter(e => e !== answer)
      else this.rightAnswers.push(answer);
    }
  }
}
</script>