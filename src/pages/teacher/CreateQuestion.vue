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
                :extensions="htmlExtensions"
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
            <v-radio-group v-model="typeId" row>
              <v-radio
                  v-for="n in questionTypes"
                  :key="n.id"
                  :label="n.name"
                  :value="n.id"
                  class="mr-6 my-2"
              />
            </v-radio-group>
          </v-col>
          <v-col cols="12" v-if="this.typeId">
            <component
                :is="getQuestionTypeById(typeId).component"
                @done='lCreateQuestion'
                :loading="loading"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-form>
  </v-container>
</template>

<script>
import {mapMutations, mapState, mapActions, mapGetters} from 'vuex'
import {TiptapVuetify} from 'tiptap-vuetify'
import htmlExtensions from '@/plugins/tiptapDefaultExtensions'
import AlternativeAnswer from "../../components/Teacher/CreateQuestionTypes/AlternativeAnswer";
import ChoiceAnswer from "../../components/Teacher/CreateQuestionTypes/ChoiceAnswer";
import ConformityAnswer from "../../components/Teacher/CreateQuestionTypes/ConformityAnswer";
import RangingAnswer from "../../components/Teacher/CreateQuestionTypes/RangingAnswer";
import TextAnswer from "../../components/Teacher/CreateQuestionTypes/TextAnswer";
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
      htmlExtensions,
      // question data
      categoryId: null,
      text: "",
      commentary: "",
      level: null,
      typeId: null,
    }
  },
  computed: {
    ...mapState('data', ["categories", "questionLevels", "questionTypes"]),
    ...mapGetters('data',['getQuestionTypeById'])
  },
  methods: {
    ...mapMutations('layout', ['SHOW_MSG_DIALOG']),
    ...mapActions('data', ['createQuestion']),
    lCreateQuestion(data) {
      let htmlEditorValidation = true;
      if (!this.text) {
        htmlEditorValidation = false;
        let el = this.$el.querySelector(".html-editor");
        el.classList.add('html-editor--error');
      }

      if (this.$refs.form.validate() && htmlEditorValidation) {
        let question = {
          category_id: this.categoryId,
          text: this.text,
          commentary: this.commentary,
          level: this.level,
          type_id: this.typeId,
          body: [...data.body],
        }
        this.loading = true;
        this.createQuestion({question: question, rightAnswer: [...data.rightAnswer]})
            .then(() => {
              this.loading = false;
              this.clear();
              this.SHOW_MSG_DIALOG({type: 'primary', text: "Вопрос успешно добавлен"});
            });
      } else {
        /* scroll to error */
        this.$nextTick(() => {
          let el = this.$el.querySelector(".error--text:first-of-type") || this.$el.querySelector(".html-editor--error");
          this.$vuetify.goTo(el, {offset: 54});
        });
      }
    },
    clear() {
      this.text = "";
      // clear data and valid
      this.$refs.form.reset();
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