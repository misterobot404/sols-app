<template>
  <v-container style="min-height: 100%" class="d-flex flex-column px-8 px-xl-12">
    <!-- Logo -->
    <v-row class="mt-4 mt-xl-5 justify-center align-center flex-grow-0">
      <v-col cols="12" lg="6" class="d-flex justify-center justify-lg-end">
        <img class="create-test-svg pr-lg-4" :src="require('@/assets/svg/Kit.svg')" alt="Иконка создания">
      </v-col>
      <v-col cols="12" lg="6" class="d-flex justify-center justify-lg-start">
        <span class="create-test-title primary--text text-center text-lg-left">Создайте перечень<br>вопросов</span>
      </v-col>
    </v-row>
    <!-- Body -->
    <form @submit.prevent="createQuestion()" class="rounded-lg d-flex flex-column align-center align-center py-6" style="margin-top: 30px; background: #FEFEFF;">
      <v-col cols="11" md="10" xl="8">
        <v-row class="align-center justify-center">
          <v-col cols="12">
            <h4>Выберите категорию</h4>
            <v-select
                v-model="selectedCategories"
                :items="questionCategories"
                :item-text="'name'"
                :item-value="'id'"
                outlined
                hide-details
                class="mt-2 mb-1 rounded-lg"
            />
          </v-col>
          <v-col cols="12">
            <h4>Текст вопроса</h4>
            <tiptap-vuetify
                v-model="text"
                class="mt-3"
                :toolbar-attributes="{ color: 'rgba(0, 0, 0, 0.04)' }"
                :extensions="extensions"
                :card-props="{ outlined: true, style: 'width: 100%; border-radius: 8px; border-color: rgba(0, 0, 0, 0.42); overflow: hidden' }"
            />
          </v-col>
          <v-col cols="12">
            <h4>Примечание к вопросу</h4>
            <v-text-field
                v-model="commentary"
                required
                hide-details
                append-icon="error_outline"
                outlined
                class="mt-2 mb-1 rounded-lg"
                background-color="white"
            />
          </v-col>
          <v-col cols="12" md="6">
            <h4>Уровень сложности</h4>
            <v-radio-group v-model="selectedQuestionLevel" row>
              <v-radio
                  v-for="n in questionLevels"
                  :key="n"
                  :label="n"
                  :value="n"
                  class="mr-6 my-1"
              />
            </v-radio-group>
          </v-col>
          <v-col cols="12" md="6" align-self="start">
            <h4>Тип вопроса</h4>
            <v-radio-group v-model="selectedQuestionType" row>
              <v-radio
                  v-for="n in testTypes"
                  :key="n"
                  :label="n"
                  :value="n"
                  class="mr-6 my-1"
              />
            </v-radio-group>
          </v-col>
          <v-col cols="12">
            <h4>Тип ответа</h4>
            <v-radio-group v-model="selectedAnswerType" row>
              <v-radio
                  v-for="n in answerTypes"
                  :key="n.name"
                  :label="n.name"
                  :value="n"
                  class="mr-6 my-1"
              />
            </v-radio-group>
          </v-col>
          <v-col cols="12">
            <component v-if="answerTypes" :is="selectedAnswerType.component"/>
          </v-col>
          <v-btn class="success rounded-lg h4 mx-auto mt-6" x-large type="submit">Сохранить</v-btn>
        </v-row>
      </v-col>
    </form>
    <!-- Footer -->
    <div class="text-center d-flex justify-center p-14-medium pt-5 pb-2 mt-auto align-center">
      <router-link to="/" class="mx-xl-10 mx-5 black--text text-no-wrap">
        О сайте
      </router-link>
      <router-link to="/" class="mx-xl-10 mx-5 black--text">
        Служба поддержки
      </router-link>
    </div>
  </v-container>
</template>

<script>
import {mapState} from 'vuex'
// import answer types
import AlternativeAnswer from "../../components/AnswerTypes/AlternativeAnswer";
import ChoiceAnswer from "../../components/AnswerTypes/ChoiceAnswer";
import ConformityAnswer from "../../components/AnswerTypes/ConformityAnswer";
import RangingAnswer from "../../components/AnswerTypes/RangingAnswer";
import TextAnswer from "../../components/AnswerTypes/TextAnswer";
// import TipTap - html editor
import Vue from 'vue'
import vuetify from "@/plugins/vuetify"
import {TiptapVuetifyPlugin} from 'tiptap-vuetify'
import 'tiptap-vuetify/dist/main.css'
Vue.use(TiptapVuetifyPlugin, {
  vuetify,
  iconsGroup: 'md'
})
import {
  TiptapVuetify,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  CodeBlock,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History,
  Image
} from 'tiptap-vuetify'

export default {
  name: "CreateQuestion",
  components: {
    TiptapVuetify,
    // answer types
    AlternativeAnswer,
    ChoiceAnswer,
    ConformityAnswer,
    RangingAnswer,
    TextAnswer
  },
  data() {
    return {
      selectedCategories: null,
      text: "",
      commentary: "",
      selectedQuestionLevel: null,
      selectedQuestionType: null,
      selectedAnswerType: null,
      // declare extensions you want to use  in html editor
      extensions: [
        History,
        Link,
        [Heading, {
          options: {
            levels: [1, 2, 3, 4]
          }
        }],
        Underline,
        Strike,
        Italic,
        Bold,
        ListItem,
        BulletList,
        OrderedList,
        Blockquote,
        HorizontalRule,
        Paragraph,
        HardBreak,
        Code,
        CodeBlock,
        Image
      ],
    }
  },
  computed: {
    ...mapState('data', ["questionCategories","questionLevels","testTypes","answerTypes"])
  },
  methods: {
    createQuestion() {}
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
    width: 160px;
    height: 160px;
  }

  .create-test-title {
    font-family: Inter-Medium, sans-serif;
    font-size: 22px;
    line-height: 27px;
  }
}
</style>