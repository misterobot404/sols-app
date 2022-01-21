<template>
  <v-container class="px-4 px-lg-8">
    <!-- Logo -->
    <v-row v-if="!full_mode" class="mt-4 mt-xl-5 justify-center align-center flex-grow-0">
      <v-col cols="12" lg="6" class="d-flex justify-center justify-lg-end">
        <img class="tasks-svg pr-lg-4" :src="require('@/assets/svg/Base-1.svg')" alt="Иконка создания">
      </v-col>
      <v-col cols="12" lg="6" class="d-flex justify-center justify-lg-start">
        <span class="tasks-title primary--text text-center text-lg-left">База<br>заданий</span>
      </v-col>
    </v-row>
    <!-- Body -->
    <v-card width="100%" class="rounded-lg my-4">
      <v-card-title class="primary white--text">
        <v-icon large color="white" class="material-icons mr-2" v-text="'task_alt'"/>
        База заданий
        <v-spacer/>
        <v-text-field
            append-icon="search"
            label="Поиск..."
            filled
            dark
            style="max-width: 400px"
            dense
            single-line
            hide-details
        />
        <v-switch v-model="full_mode" class="mt-0 ml-8 mr-4" dark hide-details label="Полный экран"/>
      </v-card-title>
      <v-row class="pa-4" justify="space-between">
        <v-col cols="4">
          <v-treeview
              :active.sync="selected_category"
              :items="tree"
              :load-children="openSubject"
              activatable
              color="primary"
              open-on-click
              transition
          >
          </v-treeview>
        </v-col>
        <v-divider vertical/>
        <v-col class="d-flex text-center">
          <div
              v-if="!tasks_by_selected_category"
              style="width: 100%; align-self: center;"
              class="primary--text text-decoration-underline"
          >
            Выберите дисциплину и категорию
          </div>
          <div v-else>
            <div v-for="task in tasks_by_selected_category" :key="task.id" class="text-start">
              <h4>Текст вопроса</h4>
              <p v-html="task.text"/>

              <h4>Примечание к вопросу</h4>
              <p v-text="task.commentary"/>

              <h4>Тип ответа</h4>
              <!-- @change: Удаляем тело ответа и ключ-->
              <p v-text="getTaskTypeById(task.type_id).name"/>

              <component :is="getTaskTypeById(task.type_id).component" :data="{ body: task.body, right_answer: getRightAnswerByTaskId(task.id).answer }"/>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-card>
    <!--    &lt;!&ndash; Buttons &ndash;&gt;
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
            @click="dialog.show = 'categories'"
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
            @click="$router.push({name: 'Tasks'})"
            class="mr-2"
            color="primary"
        >
          Добавить вопрос
        </v-btn>
        <v-btn
            @click="dialog.show = 'delete_task'"
            class="mr-2"
            color="error"
        >
          Удалить вопрос
        </v-btn>
        &lt;!&ndash; Dialogs  &ndash;&gt;
        <SubjectDialog
            :show.sync="dialog.show"
            :subject_id="dialog.el ? dialog.el.id : null"
        />
        <CategoryDialog
            :show.sync="dialog.show"
            :category_id="dialog.el ? dialog.el.id : null"
        />
        <DeleteSCQDialog
            :show.sync="dialog.show"
            :el="dialog.el"
        />-->
  </v-container>
</template>

<script>
import draggable from 'vuedraggable';
import SubjectDialog from "@/components/SubjectDialog";
import CategoryDialog from "@/components/CategoryDialog";
import DeleteSCQDialog from "@/components/DeleteSCTDialog";
import FileUpload from "../../components/Tasks/FileUpload";
import SingleChoice from "../../components/Tasks/SingleChoice";
import MultiChoice from "../../components/Tasks/MultiChoice";
import Conformity from "../../components/Tasks/Conformity";
import Ranging from "../../components/Tasks/Ranging";
import TextInput from "../../components/Tasks/TextInput";
import {mapGetters, mapState} from "vuex";

export default {
  name: "BaseOfTasks",
  components: {
    draggable,
    SubjectDialog,
    CategoryDialog,
    DeleteSCQDialog,
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
      // Гибкий объект управления отображением диалогов
      // Создание/изменение/удаление предметов, тем и вопросов (только удаление)
      dialog: {
        // subject, categories, delete_subject, delete_category, delete_task
        show: null,
        // Выбранный el. Может являться предметом, категорией или вопросом
        el: null
      },
      full_mode: true,
      // Дерево дисциплин и категорий. Устанавливается при изменении subjects
      tree: [],
      // Выбранная категория
      selected_category: [],
    }
  },
  computed: {
    ...mapState('data', [
      'subjects',
      'categories',
      'tasks'
    ]),
    ...mapGetters('data', ['getTaskTypeById', 'getRightAnswerByTaskId']),
    // Задания по выбранной категории для отображения
    tasks_by_selected_category() {
      // Категория не выбрана
      if (!this.selected_category.length) return undefined;
      return this.tasks.filter(task => task.category_id === this.selected_category[0]);
    },
  },
  methods: {
    // Нажатие строки с дисциплиной
    openSubject(item) {
      // Добавление в дисциплину массива с категориями
      item.children.push(...this.categories.filter(el => el.subject_id === item.id));
    },
  },
  watch: {
    // При изменении subjects устанавливать новое дерево дисциплин и категорий
    subjects: {
      immediate: true,
      handler(v) {
        this.tree = JSON.parse(JSON.stringify(v)).map(el => {
          el.children = [];
          return el;
        });
      }
    },
  }
}
</script>

<style scoped>

.tasks-svg {
  height: 250px;
}

.tasks-title {
  font-family: Inter-Medium, sans-serif;
  font-size: 40px;
  line-height: 48px;
}

/* Изменение разметки под более низкое разрешение */
@media screen and (max-width: 600px) {
  .tasks-svg {
    width: 200px;
    height: 200px;
  }

  .tasks-title {
    font-family: Inter-Medium, sans-serif;
    font-size: 22px;
    line-height: 27px;
  }
}
</style>