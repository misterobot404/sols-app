<template>
  <v-row>
    <v-col v-for="(el, index) in answers" cols="12" :key="index">
      <div class="d-flex align-center mb-3">
        <h4>Вариант ответа</h4>
        <v-checkbox
            :input-value="right_answer ? right_answer.id === el.id : false"
            @click="rightAnswerClick(el)"
            class="mx-4 my-0"
            hide-details
        >
          <template v-slot:label>
            <span class="font-s-12" style="color: #152536">Правильный ответ</span>
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
          v-model="el.text"
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
  name: "SingleChoice",
  props: ["data", "loading"],
  data() {
    return {
      answers: [
        {id: 1, text: ""},
        {id: 2, text: ""},
      ],
      right_answer: null,
    }
  },
  watch: {
    data: {
      handler(val) {
        if (val.body && val.right_answer) {
          let next_id = 1;
          this.answers = val.body.map(el => {
            return {id: next_id++, text: el}
          });
          this.right_answer = {
            id: this.answers.find(answer => answer.text === val.right_answer).id,
            text: val.right_answer
          }
        }
      },
      immediate: true
    }
  },
  methods: {
    ...mapMutations('layout', ['SHOW_ERROR_MSG_DIALOG']),
    done() {
      // check empty answer
      if (this.answers.find(el => !el.text)) {
        this.SHOW_ERROR_MSG_DIALOG({type: 'error', text: "Заполните все созданные варианты ответов"});
        return;
      }
      // check duplicate
      for (let i = 0; i < this.answers.length; i++) {
        if (this.answers.find(v => this.answers[i].id !== v.id && this.answers[i].text === v.text)) {
          this.SHOW_ERROR_MSG_DIALOG({type: 'error', text: "Варианты ответа дублируются"});
          return;
        }
      }
      // check answer count
      if (this.answers.length < 2) {
        this.SHOW_ERROR_MSG_DIALOG({type: 'error', text: "Минимальное количество ответов: 2"});
        return;
      }
      // check true answer
      if (!this.right_answer) {
        this.SHOW_ERROR_MSG_DIALOG({type: 'error', text: "Выберите правильный ответ"});
        return;
      }
      // emit answers to parent
      this.$emit('done', {
        body: this.answers.map(el => el.text),
        right_answer: this.right_answer.text
      })
    },
    addAnswer() {
      let next_id = Math.max(...this.answers.map(user => user.id)) + 1;
      this.answers.push({id: next_id, text: ""})
    },
    removeAnswer(index) {
      this.answers.splice(index, 1);
    },
    rightAnswerClick(answer) {
      if (this.right_answer && this.right_answer.id === answer.id) this.right_answer = null
      else this.right_answer = answer
    }
  }
}
</script>