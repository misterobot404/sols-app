<template>
  <div class="d-flex pa-3 h-100" style="max-height: 100vh">
    <!-- Дисциплины и категории  -->
    <v-col cols="3">
      <v-card class="d-flex flex-column rounded-lg pa-3" style="max-height: 100%">
        <!-- Поиск по дереву -->
        <v-text-field
            v-model="tree_search"
            append-icon="search"
            class="flex-grow-1"
            label="Поиск дисциплины и темы..."
            filled
            dense
            single-line
            hide-details
        />
        <!-- Дерево с дисциплинами и темами -->
        <v-treeview
            :active.sync="selected_category"
            :items="tree"
            :search="tree_search"
            activatable
            item-disabled="disable_selection"
            color="primary"
            open-on-click
            transition
            class="mt-2 flex-grow-1"
            style="overflow-y: scroll;"
        >
          <template v-slot:label="{ item }">
            <div
                v-text="item.name"
                @contextmenu="(e) => {node_for_context_menu = item; showContextMenu(e);}"
                :class="node_for_context_menu ? (node_for_context_menu.id === item.id && (typeof(node_for_context_menu.subject_id) === typeof(item.subject_id)) ? 'node-with-open-context-menu' : null) : null"
                class="d-flex align-center mr-1"
                style="width: 100%; height: 48px;"
            />
          </template>
        </v-treeview>
        <!-- Контекстное меню при нажатии на дисциплину/тему -->
        <v-menu
            v-model="show_context_menu"
            @input="show_context_menu ? null : node_for_context_menu = null"
            :position-x="context_menu_x"
            :position-y="context_menu_y"
            rounded="lg"
        >
          <v-list v-if="node_for_context_menu">
            <!-- Дисциплина -->
            <template v-if="!node_for_context_menu.subject_id">
              <!-- Добавить тему -->
              <v-list-item @click="dialog.el = null; dialog.subject_id = node_for_context_menu.id; dialog.show_type = 'category'">
                <v-list-item-title>Добавить тему</v-list-item-title>
              </v-list-item>
              <!-- Редактировать -->
              <v-list-item @click="dialog.el = node_for_context_menu; dialog.show_type = 'subject'">
                <v-list-item-title>Редактировать</v-list-item-title>
              </v-list-item>
              <!-- Удалить -->
              <v-list-item @click="dialog.el = node_for_context_menu; dialog.show_type = 'delete_subject'">
                <v-list-item-title>Удалить</v-list-item-title>
              </v-list-item>
            </template>
            <!-- Тема -->
            <template v-else>
              <!-- Редактировать -->
              <v-list-item @click="dialog.el = node_for_context_menu; dialog.show_type = 'category'">
                <v-list-item-title>Редактировать</v-list-item-title>
              </v-list-item>
              <!-- Удалить -->
              <v-list-item @click="dialog.el = node_for_context_menu; dialog.show_type = 'delete_category'">
                <v-list-item-title>Удалить</v-list-item-title>
              </v-list-item>
            </template>
          </v-list>
        </v-menu>
        <!-- Кнопка добавления дисциплины -->
        <div class="d-flex justify-center mt-2">
          <v-btn @click="dialog.show_type = 'subject'; dialog.el = null;" outlined color="primary" class="white--text" style="max-width: 100%;" block>
            Добавить дисциплину
          </v-btn>
        </div>
      </v-card>
    </v-col>
    <!-- Задания -->
    <v-col>
      <v-card class="d-flex flex-column text-center rounded-lg h-100 pa-3">
        <!-- Функции -->
        <div class="d-flex justify-end align-center">
          <v-menu offset-y nudge-bottom="4">
            <template v-slot:activator="{ on: menu }">
              <v-btn
                  v-on="{...menu }"
                  :disabled="!tasks_by_selected_category"
                  style="text-transform: unset !important; letter-spacing: normal;"
                  class="mr-2 font-family-inter-regular"
                  depressed
              >
                <span> Сортировка:&nbsp; </span>
                <span class="text-lowercase" :class="tasks_by_selected_category ? 'primary--text' : null" v-text="sort_types[index_of_selected_sort]"/>
              </v-btn>
            </template>
            <v-list class="py-0">
              <v-list-item-group v-model="index_of_selected_sort" mandatory>
                <v-list-item
                    v-for="type in sort_types"
                    :key="type"
                    active-class="primary--text"
                >
                  <v-list-item-title>{{ type }}</v-list-item-title>
                  <v-list-item-action v-if="sort_types[index_of_selected_sort] === type">
                    <v-icon>radio_button_checked</v-icon>
                  </v-list-item-action>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-menu>
          <v-spacer/>
          <v-text-field
              :disabled="!tasks_by_selected_category"
              append-icon="search"
              label="Поиск задания..."
              filled
              v-model="task_search"
              rounded
              style="max-width: 400px"
              dense
              class="mr-2"
              single-line
              hide-details
          />
          <v-btn color="primary" :disabled="!tasks_by_selected_category" outlined>
            Добавить вопрос
          </v-btn>
        </div>
        <!-- Разделение -->
        <v-divider class="mt-3"/>
        <!-- Тема не выбрана -->
        <div v-if="!tasks_by_selected_category" class="my-auto primary--text text-decoration-underline">
          Выберите тему
        </div>
        <!-- Тема выбрана, но задания не найдены -->
        <div v-else-if="tasks_by_selected_category.length === 0" class="my-auto primary--text text-decoration-underline">
          Задания не найдены
        </div>
        <!-- Тема выбрана -->
        <div v-else class="px-3 py-1 flex-grow-1" style="flex-basis: 0; overflow-y: scroll">
          <!-- Список заданий -->
          <div v-for="task in tasks_by_selected_category" :key="task.id" class="mt-3 text-justify">
            {{ task }}
            <!--<h4>Текст вопроса</h4>
            <p v-html="task.text"/>

            <h4>Примечание к вопросу</h4>
            <p v-text="task.instruction"/>

            <h4>Тип ответа</h4>

            <p v-text="getTaskTypeById(task.type_id)"/>

            <component :is="getTaskTypeById(task.type_id).component" :data="{ body: task.body, right_answer: getRightAnswerByTaskId(task.id).answer }"/>-->
          </div>
        </div>
      </v-card>
    </v-col>
    <!-- Добавление/изменение дисциплины  -->
    <SubjectDialog
        :show.sync="dialog.show_type"
        :subject_id="dialog.el ? dialog.el.id : null"
    />
    <!-- Добавление/изменение темы -->
    <CategoryDialog
        :show.sync="dialog.show_type"
        :subject_id="dialog.subject_id"
        :category_id="dialog.el ? dialog.el.id : null"
    />
    <!-- Удаление дисциплины/темы/задания -->
    <DeleteSCQDialog
        :show.sync="dialog.show_type"
        :el="dialog.el"
    />
  </div>
</template>

<script>
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
  name: "Base",
  components: {
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
        show_type: null,
        // Выбранный el. Может являться предметом, категорией или вопросом
        el: null,
        // Передача id дисциплины для создания темы
        subject_id: null
      },
      // Поиск по дереву дисциплин и тем
      tree_search: "",
      // Контекстное меню
      show_context_menu: false,
      node_for_context_menu: null,
      context_menu_x: 0,
      context_menu_y: 0,
      // Поиск по заданиям
      task_search: "",
      // Выбранная тема
      selected_category: [],
      // Сортировка по
      index_of_selected_sort: 0,
      sort_types: ["Сначала новые", "Сначала старые", "Сначала сложные", "Сначала простые"]
    }
  },
  computed: {
    ...mapState('data', [
      'subjects',
      'categories',
      'tasks'
    ]),
    ...mapGetters('data', ['getTaskTypeById', 'getRightAnswerByTaskId']),
    // Дереве дисциплин и тем
    tree() {
      let tree = [];
      // Формируем дерево
      // Добавляем дисциплины
      this.subjects.forEach(el => tree.push(Object.assign({}, el)));
      // Добавляем темы
      tree.forEach(subject => {
        let categories_of_subject = this.categories.filter(el => el.subject_id === subject.id);
        if (categories_of_subject.length) {
          subject.children = categories_of_subject;
        } else subject.disable_selection = true;
      });
      return tree;
    },
    // Задания по выбранной категории для отображения
    tasks_by_selected_category() {
      // Категория не выбрана
      if (!this.selected_category.length) return undefined;
      // Категория выбрана. Получаем задания по выбранной теме
      else {
        // Фильтруем задания по выбранной теме
        let tasks = this.tasks.filter(task => task.category_id === this.selected_category[0]);
        // Фильтруем задания по строке поиска
        if (this.task_search)
          tasks = this.tasks.filter(task => task.text ? task.text.toLowerCase().includes(this.task_search.toLowerCase()) : false);
        // Сортируем задания
        switch (this.index_of_selected_sort) {
          case 0: // Сначала новые
            return tasks.reverse();
          case 1: // Сначала старые
            return tasks;
          case  2: // Сначала сложные
            return tasks.sort((first_el, second_el) => first_el.complication < second_el.complication ? 1 : -1);
          case 3: // Сначала простые
            return tasks.sort((first_el, second_el) => first_el.complication > second_el.complication ? 1 : -1);
        }
      }
    },
  },
  methods: {
    showContextMenu(e) {
      e.preventDefault();
      this.context_menu_x = e.clientX
      this.context_menu_y = e.clientY
      this.show_context_menu = true;
    },
  }
}
</script>

<style scoped>
/* Эффект выделения ноды при открытом контекстном меню */
.node-with-open-context-menu {
  color: #1976d3;
  text-decoration: underline;
}

/* Переносить текст внутри кнопки */
.white--text >>> .v-btn__content {
  max-width: 100%;
  white-space: normal;
}

/* Не менять цвет отключенных нод в дереве */
>>> .v-treeview-node--disabled > .v-treeview-node__root > .v-treeview-node__content > .v-treeview-node__label {
  color: rgba(0, 0, 0, 0.87);
}
</style>