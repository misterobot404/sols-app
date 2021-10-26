<template>
  <v-dialog
      :value="show"
      @input="$emit('update:show', null)"
      max-width="400"
      overlay-opacity="0.1"
  >
    <!-- Dialog -->
    <v-card>
      <v-card-text class="pt-6 pb-0">
        <v-form ref="form">
          <h2 class="mb-6" style="color: rgba(0, 0, 0, 0.8)">
            <v-icon class="mr-1 pb-1" color="error">warning</v-icon>
            {{
              'Удалить ' +
              show === 'delete_subject' ? 'эту тему ?' :
                  show === ' delete_category' ? 'эту тему ?' :
                      show === 'delete_question' ? 'эту тему ?' :
                          null
            }}
          </h2>
          <p class="p-14-medium">
            {{
              'Вы собираетесь удалить ' +
              show === 'delete_subject' ? 'предмет \'' + el.name + '\'. Восстановить её будет нельзя. Все вложенные темы и вопросы будут удалены. Категория так же будет исключена из всех тестов.' :
                  show === 'delete_category' ? 'тему \'' + el.name + '\'. Восстановить её будет нельзя. Все вложенные вопросы будут удалены. Категория так же будет исключена из всех тестов.' :
                      show === 'delete_question' ? 'вопрос \'' + el.name + '\'. Восстановить его будет нельзя. Тема так же будет исключена из всех тестов.' :
                          null
            }}
          </p>
        </v-form>
      </v-card-text>
      <v-card-actions class="px-6 pb-4">
        <v-spacer/>
        <v-btn
            class="h4 px-4 mr-1"
            text
            style="text-transform: none; background-color: rgba(0, 0, 0, 0.06)"
            @click="$emit('update:show', null)"
        >
          Отмена
        </v-btn>
        <v-btn
            class="h4 px-4"
            color="error"
            text
            style="text-transform: none; background-color: rgba(239,83,80, 0.12)"
            @click="confirm()"
        >
          Подтвердить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "DeleteConfirmation",
  props: [
    "show",
    "el"
  ],
  methods: {
    confirm() {
      switch (this.show) {
        case 'delete_subject':
          this.lDeleteSubjects();
          break;
        case 'delete_category':
          this.lDeleteCategory();
          break;
        case 'delete_question':
          this.lDeleteQuestion();
          break;
      }
    },
    lDeleteSubjects() {
      this.loading = true;
      this.deleteCategory(this.el.id)
          .then(() => {
            this.loading = false;
            this.SHOW_MSG_DIALOG({type: 'primary', text: 'Предмет удален'});
          });
      this.el = null;
    },
    lDeleteCategory() {
      this.loading = true;
      this.deleteCategory(this.el.id)
          .then(() => {
            this.loading = false;
            this.SHOW_MSG_DIALOG({type: 'primary', text: 'Тема удалена'});
          });
      this.el = null;
    },
    lDeleteQuestion() {
      this.loading = true;
      this.deleteQuestion(this.el.id)
          .then(() => {
            this.loading = false;
            this.SHOW_MSG_DIALOG({type: 'primary', text: 'Вопрос удален'});
          });
      this.el = null;
    }
  }
}
</script>
