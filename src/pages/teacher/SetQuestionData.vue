<template>
  <v-container class="px-8 px-xl-12">
    <!-- Logo -->
    <v-row class="mt-4 mt-xl-5 justify-center align-center flex-grow-0">
      <v-col cols="12" lg="6" class="d-flex justify-center justify-lg-end">
        <img class="create-test-svg pr-lg-4" :src="require('@/assets/svg/Kit.svg')" alt="Иконка создания">
      </v-col>
      <v-col cols="12" lg="6" class="d-flex justify-center justify-lg-start">
        <span class="create-test-title primary--text text-center text-lg-left" style="white-space: pre-line">
          {{ mode === "create" ? "Создайте перечень \n вопросов" : "Редактируйте \n вопрос" }}
        </span>
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
                v-model="question.category_id"
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
                v-model="question.level"
                :rules="[ !!question.level || '']"
                row
                class="d-flex justify-space-between"
                hide-details
            >
              <v-radio
                  v-for="n in question_levels"
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
                v-model="question.text"
                class="mt-3"
                :toolbar-attributes="{ color: 'rgba(0, 0, 0, 0.04)' }"
                :extensions="html_extensions"
                :card-props="{ outlined: true, class: 'html-editor rounded-lg' }"
            />
          </v-col>
          <v-col cols="12">
            <h4>Примечание к вопросу</h4>
            <v-text-field
                v-model="question.commentary"
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
            <v-radio-group v-model="question.type_id" row class="d-flex flex-row">
              <v-radio
                  v-for="n in question_types"
                  :key="n.id"
                  :value="n.id"
                  class="col-md-3 col-6 justify-start mr-0"
              >
                <template slot="label">
                  <v-icon>{{ n.icon }}</v-icon>
                  <label class="cursor-pointer">
                    {{ '&nbsp;' + n.name }}
                  </label>
                </template>
              </v-radio>
            </v-radio-group>
          </v-col>
          <v-col cols="12" v-if="question.type_id">
            <component
                :is="getQuestionTypeById(question.type_id).component"
                :data="mode === 'create' ? null : { body: question.body, right_answer: right_answer.answer }"
                @done="(v) => mode === 'create' ? lCreateQuestion(v) : lUpdateQuestion(v)"
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
import html_extensions from '@/plugins/tiptapDefaultExtensions'
import FileUpload from "../../components/Teacher/CreateQuestion/FileUpload";
import SingleChoice from "../../components/Teacher/CreateQuestion/SingleChoice";
import MultiChoice from "../../components/Teacher/CreateQuestion/MultiChoice";
import Conformity from "../../components/Teacher/CreateQuestion/Conformity";
import Ranging from "../../components/Teacher/CreateQuestion/Ranging";
import TextInput from "../../components/Teacher/CreateQuestion/TextInput";

export default {
  name: "SetQuestionData",
  components: {
    TiptapVuetify,
    // answer types
    FileUpload,
    SingleChoice,
    MultiChoice,
    Conformity,
    Ranging,
    TextInput
  },
  data() {
    return {
      mode: null,
      loading: false,
      html_extensions,
      // data
      question: {
        text: "",
        commentary: "",
        level: null,
        body: null,
        category_id: null,
        type_id: null,
      },
      right_answer: []
    }
  },
  computed: {
    ...mapState('data', ["categories", "question_levels", "question_types"]),
    ...mapGetters('data', ['getQuestionTypeById', 'getQuestionById', 'getRightAnswerByQuestionId']),
  },
  methods: {
    ...mapMutations('layout', ['SHOW_MSG_DIALOG']),
    ...mapActions('data', ['createQuestion', 'updateQuestion']),
    lCreateQuestion({body, right_answer}) {
      if (this.$refs.form.validate() && this.question.text) {
        this.loading = true;
        this.question.body = body;
        this.createQuestion({question: this.question, right_answer: right_answer})
            .then(() => {
              this.loading = false;
              this.clear();
              this.SHOW_MSG_DIALOG({type: 'primary', text: "Вопрос успешно добавлен"});
            });
      } else {
        // set error to html editor
        if (!this.question.text) this.$el.querySelector(".html-editor").classList.add('html-editor--error');
        // scroll to error
        this.$nextTick(() => {
          let el = this.$el.querySelector(".error--text:first-of-type") || this.$el.querySelector(".html-editor--error");
          this.$vuetify.goTo(el, {offset: 54});
        });
      }
    },
    lUpdateQuestion({body, right_answer}) {
      if (this.$refs.form.validate() && this.question.text) {
        this.loading = true;
        this.question.body = body;
        this.right_answer.answer = right_answer;
        this.updateQuestion({question: this.question, right_answer: this.right_answer})
            .then(() => {
              this.loading = false;
              this.SHOW_MSG_DIALOG({type: 'primary', text: "Изменения сохранены"});
              this.$router.back();
            })
      } else {
        // set error to html editor
        if (!this.question.text) this.$el.querySelector(".html-editor").classList.add('html-editor--error');
        // scroll to first error
        this.$nextTick(() => {
          let el = this.$el.querySelector(".error--text:first-of-type") || this.$el.querySelector(".html-editor--error");
          this.$vuetify.goTo(el, {offset: 54});
        });
      }
    },
    clear() {
      this.question = {
        text: "",
        commentary: "",
        level: null,
        body: null,
        category_id: null,
        type_id: null,
      };
      this.right_answer = [];
      // clear form valid
      this.$refs.form.resetValidation();
    }
  },
  watch: {
    'question.type_id'() {
      this.question.body = null;
      this.right_answer = []
    },
    'question.text'() {
      let el = this.$el.querySelector(".html-editor--error");
      if (el) el.classList.remove('html-editor--error');
    }
  },
  beforeRouteEnter(to, from, next) {
    if (to.name === "EditQuestion") {
      next(vm => {
        vm.mode = "edit";
        Object.assign(vm.question, vm.getQuestionById(Number(vm.$route.params.id)));
        Object.assign(vm.right_answer, vm.getRightAnswerByQuestionId(Number(vm.$route.params.id)));
      })
    } else next(vm => {
      if (vm.mode === "edit") vm.clear();
      vm.mode = "create";
    });
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