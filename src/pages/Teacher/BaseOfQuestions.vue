<template>
  <v-container class="px-4 px-lg-12">
    <!-- Logo -->
    <v-row class="mt-4 mt-xl-5 justify-center align-center flex-grow-0">
      <v-col cols="12" lg="6" class="d-flex justify-center justify-lg-end">
        <img class="questions-svg pr-lg-4" :src="require('@/assets/svg/Base-1.svg')" alt="Иконка создания">
      </v-col>
      <v-col cols="12" lg="6" class="d-flex justify-center justify-lg-start">
        <span class="questions-title primary--text text-center text-lg-left">База<br>вопросов</span>
      </v-col>
    </v-row>
    <!-- Body -->
    <div class="rounded-lg d-flex flex-column align-center align-center pt-12 pb-8 mb-4" style="margin-top: 30px; background: #FEFEFF;">
      <v-col cols="11" class="pa-0">
        <v-row>
          <v-btn
              @click="dialog.show = 'subject'"
              class="mr-2"
              color="primary"
          >
            Добавить предмет
          </v-btn>
          <v-btn
              @click="dialog.show = 'delete_subject'"
              class="mr-2"
              color="error"
          >
            Удалить предмет
          </v-btn>
          <v-btn
              @click="dialog.show = 'category'"
              class="mr-2"
              color="primary"
          >
            Добавить тему
          </v-btn>
          <v-btn
              @click="dialog.show = 'delete_category'"
              class="mr-2"
              color="error"
          >
            Удалить тему
          </v-btn>
          <v-btn
              @click="$router.push({name: 'CreateQuestion'})"
              class="mr-2"
              color="primary"
          >
            Добавить вопрос
          </v-btn>
          <v-btn
              @click="dialog.show = 'delete_question'"
              class="mr-2"
              color="error"
          >
            Удалить вопрос
          </v-btn>
        </v-row>
      </v-col>
    </div>
    <!-- Dialogs  -->
    <SubjectDialog
        :show.sync="dialog.show === 'subject'"
        :subject_id="dialog.el ? dialog.el.id : null"
    />
    <CategoryDialog
        :show.sync="dialog.show === 'category'"
        :category_id="dialog.el ? dialog.el.id : null"
    />
    <DeleteSCQDialog
        :show="dialog.show && dialog.show.includes('delete')"
        :el="dialog.el"
    />
  </v-container>
</template>

<script>
import SubjectDialog from "@/components/SubjectDialog";
import CategoryDialog from "@/components/CategoryDialog";
import DeleteSCQDialog from "@/components/DeleteSCQDialog";

export default {
  name: "QuestionCategories",
  components: {
    SubjectDialog,
    CategoryDialog,
    DeleteSCQDialog
  },
  data() {
    return {
      dialog: {
        // subject, category, delete_subject, delete_category, delete_question
        show: null,
        // Выбранный el для редактирования или удаления. Может являться предметом, категорией или вопросом
        el: null
      },
    }
  },
}
</script>

<style scoped>

.questions-svg {
  height: 250px;
}

.questions-title {
  font-family: Inter-Medium, sans-serif;
  font-size: 40px;
  line-height: 48px;
}

/* Изменение разметки под более низкое разрешение */
@media screen and (max-width: 600px) {
  .questions-svg {
    width: 200px;
    height: 200px;
  }

  .questions-title {
    font-family: Inter-Medium, sans-serif;
    font-size: 22px;
    line-height: 27px;
  }
}
</style>