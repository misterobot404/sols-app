<template>
  <v-row>
    <v-col v-for="(answer, index) in right_answers" cols="12" :key="index">
      <div class="d-flex align-center mb-3">
        <h4>Правильный ответ</h4>
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
          v-model="answer.text"
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
      <v-btn class="success rounded-lg h4" :loading="loading" large @click="done()">Сохранить</v-btn>
    </v-col>
  </v-row>
</template>

<script>
import {mapMutations} from "vuex";

export default {
  name: "TextAnswer",
  props: ["data", "loading"],
  data() {
    return {
      right_answers: [
        {
          id: 1,
          text: ""
        }
      ]
    }
  },
  watch: {
    data: {
      handler(val) {
        if (val) {
          let next_id = 1;
          this.right_answers = val.right_answer.map(el => {return {id: next_id++, text: el}});
        }
      },
      immediate: true
    }
  },
  methods: {
    ...mapMutations('layout', ['SHOW_MSG_DIALOG']),
    done() {
      // check empty answer
      if (this.right_answers.find(el => !el.text)) {
        this.SHOW_MSG_DIALOG({type: 'error', text: "Заполните все созданные варианты ответов"});
        return;
      }
      // check duplicate
      for (let i = 0; i < this.right_answers.length; i++) {
        if (this.right_answers.find(v => this.right_answers[i].id !== v.id && this.right_answers[i].text === v.text)) {
          this.SHOW_MSG_DIALOG({type: 'error', text: "Варианты ответа дублируются"});
          return;
        }
      }
      // check answer count
      if (this.right_answers.length < 1) {
        this.SHOW_MSG_DIALOG({type: 'error', text: "Минимальное количество ответов: 1"});
        return;
      }
      this.$emit('done', {
        body: null,
        right_answer: this.right_answers.map(el => el.text)
      })
    },
    addAnswer() {
      let next_id = Math.max(...this.right_answers.map(el => el.id)) + 1;
      this.right_answers.push({id: next_id, text: ""})
    },
    removeAnswer(index) {
      this.right_answers.splice(index, 1);
    }
  }
}
</script>