<template>
  <v-row>
    <v-col cols="6">
      <div class="list-border rounded-lg pb-2 elevation-1">
        <v-text-field
            append-icon="add"
            @click:append="addElToLeft"
            hide-details
            filled
            label="Название списка 1 (СЛЕВА)"
            class="pb-3"
        />
        <v-scale-transition group>
          <v-col v-for="(el, index) in left_list" cols="12" :key="index" style="transition: .2s !important;">
            <v-row no-gutters align="center">
              <v-textarea
                  v-model="left_list[index]"
                  hide-details
                  outlined
                  auto-grow
                  class="rounded-lg ml-2"
              />
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-select
                      v-on="on"
                      @input="on.blur"
                      :items="Array.from({length: right_list.length}, (v, k) => k + 1)"
                      v-model="right_answer[index]"
                      filled
                      hide-details
                      class="ml-4 elevation-1"
                      append-icon=""
                      rounded
                      style="max-width: 54px"
                  >
                    <template v-slot:selection="{ item }">
                      <h4 class="d-flex justify-center" style="width: 100%;">
                        {{ item }}
                      </h4>
                    </template>
                    <template v-slot:item="{ item }">
                <span class="d-flex justify-center font-s-14" style="width: 100%;">
                  {{ item }}
                </span>
                    </template>
                  </v-select>
                </template>
                <span>Правильное соответствие</span>
              </v-tooltip>
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                      v-bind="attrs"
                      v-on="on"
                      class="ml-2"
                      @click="removeFromLeft(index)"
                      icon
                  >
                    <v-icon>close</v-icon>
                  </v-btn>
                </template>
                <span>Удалить элемент списка</span>
              </v-tooltip>
            </v-row>
          </v-col>
        </v-scale-transition>
      </div>
    </v-col>
    <v-col cols="6">
      <div class="list-border rounded-lg pb-2 elevation-1">
        <v-text-field
            append-icon="add"
            @click:append="addElToRight"
            hide-details
            filled
            label="Название списка 2 (СПРАВА)"
            class="pb-3"
        />
        <v-scale-transition group>
          <v-col v-for="(el, index) in right_list" cols="12" :key="index" style="transition: .2s !important;">
            <v-row no-gutters align="center">
              <h4 class="d-flex justify-center align-center ml-4 mr-6">
                {{ Array.from({length: right_list.length}, (v, k) => k + 1)[index] + "." }}
              </h4>
              <v-textarea
                  v-model="right_list[index]"
                  hide-details
                  outlined
                  auto-grow
                  class="rounded-lg"
              />
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                      v-bind="attrs"
                      v-on="on"
                      class="ml-2"
                      @click="removeFromRight(index)"
                      icon
                  >
                    <v-icon>close</v-icon>
                  </v-btn>
                </template>
                <span>Удалить элемент списка</span>
              </v-tooltip>
            </v-row>
          </v-col>
        </v-scale-transition>
      </div>
    </v-col>
    <v-col cols="12" class="mt-4 d-flex justify-center align-center">
      <v-btn :loading="loading" class="success rounded-lg h4" large @click="done()">Сохранить</v-btn>
    </v-col>
  </v-row>
</template>

<script>
import {mapMutations} from "vuex";

export default {
  name: "ConformityAnswer",
  props: ["data", "loading"],
  data() {
    return {
      left_list: ["", "", ""],
      right_list: ["", ""],
      right_answer: [null, null],
    }
  },
  watch: {
    data: {
      handler(val) {
        if (val.body && val.right_answer) {
          this.left_list = [...val.body.left_list];
          this.right_list = [...val.body.right_list];
          this.right_answer = [...val.right_answer];
        }
        else this.right_answer = Array(this.right_list.length)
      },
      immediate: true
    }
  },
  methods: {
    ...mapMutations('layout', ['SHOW_ERROR_MSG_DIALOG']),
    done() {
      // check empty el
      if (this.left_list.includes("") || this.right_list.includes("")) {
        this.SHOW_ERROR_MSG_DIALOG({type: 'error', text: "Заполните все созданные элементы списков"});
        return;
      }
      // check empty answer
      if (this.right_answer.includes("") || this.right_answer.includes(null)) {
        this.SHOW_ERROR_MSG_DIALOG({type: 'error', text: "Заполните все соответствия"});
        return;
      }
      // check true answer duplicate
      for (let i = 0; i < this.right_list.length; i++) {
        if (this.right_answer.indexOf(i+1) === -1) {
          this.SHOW_ERROR_MSG_DIALOG({type: 'error', text: "Не на все элементы правого списка существуют связи"});
          return;
        }
      }
      // emit answers to parent
      this.$emit('done', {
        body: {
          left_list: this.left_list,
          right_list: this.right_list,
        },
        right_answer: this.right_answer
      })
    },
    addElToLeft() {
      this.left_list.push("");
    },
    addElToRight() {
      this.right_list.push("");
    },
    removeFromLeft(index) {
      this.left_list.splice(index, 1);
    },
    removeFromRight(index) {
      this.right_list.splice(index, 1);
    }
  }
}
</script>

<style scoped>
.list-border {
  border: 1px grey solid;
}
</style>