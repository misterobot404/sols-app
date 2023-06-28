<template>
  <v-dialog
      v-model="m_show"
      max-width="400"
      persistent
      overlay-opacity="0.1"
  >
    <!-- Dialog -->
    <v-card>
      <v-card-text class="pt-6 pb-0">
        <h2 class="mb-5" style="color: rgba(0, 0, 0, 0.8)">
          <v-icon class="mr-1 pb-1" color="error">warning</v-icon>
          Удалить {{
            show === 'delete_subject' ? 'эту дисциплину?' :
                show === 'delete_category' ? 'эту тему?' :
                    show === 'delete_task' ? 'это задание?' :
                        null
          }}
        </h2>
        <p class="font-s-14 text-justify mb-3">
          Вы собираетесь удалить {{
            show === 'delete_subject' ? 'дисциплину \'' + el.name + '\'. Восстановить её будет нельзя. Все вложенные темы и задания будут удалены. Дисциплина так же будет исключена из всех тестов.' :
                show === 'delete_category' ? 'тему \'' + el.name + '\'. Восстановить её будет нельзя. Все вложенные задания будут удалены. Тема так же будет исключена из всех тестов.' :
                    show === 'delete_task' ? 'задание \'' + el.name + '\'. Восстановить его будет нельзя. Тема так же будет исключена из всех тестов.' :
                        null
          }}
        </p>
      </v-card-text>
      <v-card-actions class="px-6 pb-4">
        <v-spacer/>
        <v-btn
            class="px-4 mr-1"
            text
            style="text-transform: none; background-color: rgba(0, 0, 0, 0.06)"
            @click="$emit('update:show', false)"
        >
          Отмена
        </v-btn>
        <v-btn
            class="px-4"
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
import {mapActions} from "vuex";

export default {
  name: "DeleteConfirmation",
  props: ["show", "el"],
  computed: {
    m_show: {
      get() {
        return this.show === 'delete_subject' || this.show === 'delete_category' || this.show === 'delete_task'
      },
      set(v) {
        this.$emit('update:show', v);
      },
    }
  },
  methods: {
    ...mapActions('data', [
      'deleteSubject',
      'deleteCategory',
      'deleteTask'
    ]),
    confirm() {
      switch (this.show) {
        case 'delete_subject':
          this.lDeleteSubjects();
          break;
        case 'delete_category':
          this.lDeleteCategory();
          break;
        case 'delete_task':
          this.lDeleteTask();
          break;
      }
    },
    lDeleteSubjects() {
      this.$emit('update:show', false);
      this.deleteSubject(this.el.id);
    },
    lDeleteCategory() {
      this.$emit('update:show', false);
      this.deleteCategory(this.el.id)
    },
    lDeleteTask() {
      this.loading = true;
      this.deleteTask(this.el.id)
          .then(() => {
            this.loading = false;
            this.SHOW_ERROR_MSG_DIALOG({type: 'primary', text: 'Вопрос удален'});
          });
      this.el = null;
    }
  }
}
</script>
