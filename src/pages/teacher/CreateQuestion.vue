<template>
  <v-container class="px-8 px-xl-12">
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
    <v-form ref="form"
            class="rounded-lg d-flex flex-column align-center align-center pt-12 pb-6 mb-8"
            style="margin-top: 30px; background: #FEFEFF;"
    >
      <v-col cols="11" md="10" xl="9">
        <v-row class="align-center justify-center">
          <v-col cols="12" md="6">
            <h4>Выберите категорию</h4>
            <v-select
                v-model="categoryId"
                :items="categories"
                :item-text="'name'"
                :item-value="'id'"
                hide-details
                outlined
                :rules="[(v) => !!v ||  '']"
                class="mt-2 mb-1 rounded-lg"
            />
          </v-col>
          <v-col cols="12" md="6" align-self="start" class="pl-md-8">
            <h4>Уровень сложности</h4>
            <v-radio-group
                v-model="level"
                :rules="[ !!level || '']"
                row
                class="d-flex justify-space-between"
                hide-details
            >
              <v-radio
                  v-for="n in questionLevels"
                  :key="n"
                  :label="n"
                  :value="n"
                  required
                  class="mr-6 mt-1"
              />
            </v-radio-group>
          </v-col>
          <v-col cols="12">
            <h4>Текст вопроса</h4>
            <tiptap-vuetify
                v-model="text"
                class="mt-3"
                :toolbar-attributes="{ color: 'rgba(0, 0, 0, 0.04)' }"
                :extensions="extensions"
                :card-props="{ outlined: true, class: 'html-editor rounded-lg' }"
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
          <v-col cols="12">
            <h4>Тип ответа</h4>
            <v-radio-group v-model="type" row>
              <v-radio
                  v-for="n in questionTypes"
                  :key="n.name"
                  :label="n.name"
                  :value="n.component"
                  class="mr-6 my-2"
              />
            </v-radio-group>
          </v-col>
          <v-col cols="12" v-if="this.type">
            <component :is="this.type" @done='createQuestion' :loading="loading"/>
          </v-col>
        </v-row>
      </v-col>
    </v-form>
  </v-container>
</template>

<script>
import {mapMutations, mapState} from 'vuex'
// import answer types
import AlternativeAnswer from "../../components/AnswerTypes/Create/AlternativeAnswer";
import ChoiceAnswer from "../../components/AnswerTypes/Create/ChoiceAnswer";
import ConformityAnswer from "../../components/AnswerTypes/Create/ConformityAnswer";
import RangingAnswer from "../../components/AnswerTypes/Create/RangingAnswer";
import TextAnswer from "../../components/AnswerTypes/Create/TextAnswer";
// import TipTap - html editor
import Vue from 'vue'
import vuetify from "@/plugins/vuetify"
import {TiptapVuetifyPlugin} from 'tiptap-vuetify'
import 'tiptap-vuetify/dist/main.css'

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

Vue.use(TiptapVuetifyPlugin, {
  vuetify,
  iconsGroup: 'md'
})

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
      loading: false,
      // question data
      categoryId: null,
      text: "",
      commentary: "",
      level: null,
      type: null,
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
    ...mapState('data', ["categories", "questionLevels", "questionTypes"])
  },
  methods: {
    ...mapMutations('layout', ['SHOW_MSG_DIALOG']),
    ...mapMutations('data', ['CREATE_QUESTION']),
    /* Method called only from AnswerTypes/Create */
    createQuestion(answers) {
      let htmlEditorValidation = true;
      if (!this.text) {
        htmlEditorValidation = false;
        let el = this.$el.querySelector(".html-editor");
        el.classList.add('html-editor--error');
      }

      if (this.$refs.form.validate() && htmlEditorValidation) {
        this.loading = true;
        setTimeout(() => {
          let question = {
            category_id: this.categoryId,
            text: this.text,
            commentary: this.commentary,
            level: this.level,
            type: this.type,
            answers: answers
          }
          this.CREATE_QUESTION(question);
          this.SHOW_MSG_DIALOG({type: 'primary', text: "Вопрос успешно добавлен"});
          this.loading = false;
        }, 800);
      } else {
        /* scroll to error */
        this.$nextTick(() => {
          let el = this.$el.querySelector(".error--text:first-of-type") || this.$el.querySelector(".html-editor--error");
          this.$vuetify.goTo(el, {offset: 54});
        });
      }
    }
  },
  watch: {
    text() {
      let el = this.$el.querySelector(".html-editor--error");
      if (el) el.classList.remove('html-editor--error');
    }
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

<style>
.html-editor {
  width: 100%;
  border-color: rgba(0, 0, 0, 0.42) !important;
  overflow: hidden;
}

.html-editor--error {
  border-color: #ff5252 !important;
  border-width: 2px !important;
}
</style>