<template>
  <v-row>
    <v-col v-for="(answer, index) in answers" cols="12" :key="index">
      <div class="d-flex align-center mb-3">
        <h4>Вариант ответа</h4>
        <v-checkbox
            v-model="answer.correct"
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
              <v-icon>remove_circle_outline</v-icon>
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
      <v-btn class="success rounded-lg h4" large @click="done()">Сохранить</v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "ChoiceAnswer",
  data() {
    return {
      answers: [
        {
          text: "",
          correct: false
        },
        {
          text: "",
          correct: false
        }
      ]
    }
  },
  methods: {
    done() {
      this.$emit('done', this.answers)
    },
    addAnswer() {
      this.answers.push({
        text: "",
        correct: false
      })
    },
    removeAnswer(index) {
      this.answers.splice(index, 1);
    }
  }
}
</script>

<style scoped>

</style>