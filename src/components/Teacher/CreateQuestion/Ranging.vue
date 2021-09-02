<template>
  <v-row>
    <v-col v-for="(el, index) in answers" cols="12" :key="index">
      <h4 class="mb-3">Вариант ответа</h4>
      <v-row no-gutters align="center">
        <v-textarea
            v-model="el.text"
            hide-details
            outlined
            auto-grow
            class="rounded-lg"
        />
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-select
                v-on="on"
                @input="on.blur"
                :items="Array.from({length: answers.length}, (v, k) => k + 1)"
                v-model="right_answer[index]"
                filled
                hide-details
                class="ml-4 elevation-1"
                append-icon=""
                rounded
                style="max-width: 54px"
            >
              <template v-slot:selection="{ item }">
                <span class="d-flex justify-center p-14-medium" style="width: 100%;">
                  {{ item }}
                </span>
              </template>
              <template v-slot:item="{ item }">
                <span class="d-flex justify-center p-14-medium" style="width: 100%;">
                  {{ item }}
                </span>
              </template>
            </v-select>
          </template>
          <span>Порядковый номер элемента в ключе ответа</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                v-bind="attrs"
                v-on="on"
                class="ml-2"
                @click="removeAnswer(index)"
                icon
            >
              <v-icon>close</v-icon>
            </v-btn>
          </template>
          <span>Удалить ответ</span>
        </v-tooltip>
      </v-row>
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
  name: "RangingAnswer",
  props: ["data", "loading"],
  data() {
    return {
      answers: [
        {id: 1, text: ""},
        {id: 2, text: ""},
      ],
      right_answer: [],
    }
  },
  watch: {
    data: {
      handler(val) {
        if (val) {
          let next_id = 1;
          this.answers = val.body.map(el => {
            return {id: next_id++, text: el}
          });
          this.right_answer = [...val.right_answer];
        } else {
          this.right_answer = Array.from({length: this.answers.length}, (v, k) => k + 1);
        }
      },
      immediate: true
    }
  },
  methods: {
    ...mapMutations('layout', ['SHOW_MSG_DIALOG']),
    done() {
      // check empty answer
      if (this.answers.find(el => !el.text)) {
        this.SHOW_MSG_DIALOG({type: 'error', text: "Заполните все созданные варианты ответов"});
        return;
      }
      // check duplicate
      for (let i = 0; i < this.answers.length; i++) {
        if (this.answers.find(v => this.answers[i].id !== v.id && this.answers[i].text === v.text)) {
          this.SHOW_MSG_DIALOG({type: 'error', text: "Варианты ответа дублируются"});
          return;
        }
      }
      // check answer count
      if (this.answers.length < 2) {
        this.SHOW_MSG_DIALOG({type: 'error', text: "Минимальное количество ответов: 2"});
        return;
      }
      // check true answer duplicate
      for (let i = 0; i < this.right_answer.length; i++) {
        for (let j = 0; j < this.right_answer.length; j++) {
          if (i !== j && this.right_answer[i] === this.right_answer[j]) {
            this.SHOW_MSG_DIALOG({type: 'error', text: "Номера в ключах ответа дублируются"});
            return;
          }
        }
      }
      // emit answers to parent
      this.$emit('done', {
        body: this.answers.map(el => el.text),
        right_answer: this.right_answer
      })
    },
    addAnswer() {
      let next_id = Math.max(...this.answers.map(user => user.id)) + 1;
      this.answers.push({id: next_id, text: ""});
      this.right_answer.push(this.answers.length);
    },
    removeAnswer(index) {
      this.answers.splice(index, 1);
      this.right_answer.splice(index, 1);
    }
  }
}
</script>