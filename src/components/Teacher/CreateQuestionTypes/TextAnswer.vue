<template>
  <v-row>
    <v-col v-for="(answer, index) in answers" cols="12" :key="index">
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
      answers: [
        {
          text: ""
        }
      ]
    }
  },
  methods: {
    ...mapMutations('layout', ['SHOW_MSG_DIALOG']),
    done() {
      // check empty answer
      let emptyAnswerFound = false;
      this.answers.forEach((el) => {
        if (el.text === "") {
          emptyAnswerFound = true;
        }
      });
      if (emptyAnswerFound) {
        this.SHOW_MSG_DIALOG({type: 'error', text: "Заполните все созданные варианты ответов"});
        return;
      }
      // check answer count
      if (this.answers.length < 1) {
        this.SHOW_MSG_DIALOG({type: 'error', text: "Минимальное количество ответов: 1"});
        return;
      }
      this.$emit('done', this.answers)
    },
    addAnswer() {
      this.answers.push({text: ""})
    },
    removeAnswer(index) {
      this.answers.splice(index, 1);
    }
  },
  watch: {
    data: {
      handler(val) {
        if (val) this.answers = val;
      },
      immediate: true
    }
  }
}
</script>

<style scoped>

</style>