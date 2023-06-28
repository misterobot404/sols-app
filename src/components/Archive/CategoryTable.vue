<template>
  <div>
    <v-data-table
        loader-height="2"
        :loading="loading"
        :headers="headers"
        :items="tableData"
        :search="search"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        no-results-text="Данные не найдены"
        no-data-text="Нет данных"
        @click:row="goToCategory"
        class="row-pointer"
        locale="ru-RU"
        :footer-props="{'items-per-page-text':'Строк на странице:'}"
    >
      <template v-slot:top>
        <v-toolbar flat class="mb-4">
          <v-spacer/>
          <v-text-field
              v-model="search"
              append-icon="search"
              label="Поиск..."
              style="max-width: 340px"
              single-line
              hide-details
          />
          <v-btn icon class="ml-2" @click="openCreateDialog()">
            <v-icon>
              add
            </v-icon>
          </v-btn>
          <v-btn icon @click="sync">
            <v-icon>
              sync
            </v-icon>
          </v-btn>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn icon @click.stop="openEditDialog(item.id)">
          <v-icon class="material-icons-outlined">
            edit
          </v-icon>
        </v-btn>
        <v-btn icon @click.stop="openDeleteDialog(item)">
          <v-icon>
            delete_outline
          </v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <SetCategoryDataDialog
        :show.sync="showEditDialog"
        :category_id="editableCategoryId"
    />
    <DeleteConfirmation
        :show.sync="showDeleteDialog"
        header="Удалить эту категорию?"
        :body="selected_category_to_delete ? 'Вы собираетесь удалить категорию вопросов \'' + selected_category_to_delete.name + '\'. Восстановить её будет нельзя. Все вложенные вопросы будут удалены. Категория так же будет исключена из всех тестов.' : null"
        @confirm="lDeleteCategory"
    />
  </div>

</template>

<script>
import {mapMutations, mapState, mapActions} from 'vuex'
import SetCategoryDataDialog from "@/components/Category/SetCategoryDataDialog";
import DeleteConfirmation from "@/components/DeleteTestDialog";

export default {
  name: "CategoryTable",
  components: {
    SetCategoryDataDialog,
    DeleteConfirmation
  },
  data() {
    return {
      loading: false,
      search: "",
      sortBy: 'count_of_tasks',
      sortDesc: true,
      headers: [
        {
          text: 'Название',
          value: 'name',
        },
        {text: 'Лёгких вопросов', value: 'count_of_easy_q', align: 'center'},
        {text: 'Средних вопросов', value: 'count_of_normal_q', align: 'center'},
        {text: 'Сложных вопросов', value: 'count_of_hard_q', align: 'center'},
        {text: 'Всего вопросов', value: 'count_of_tasks', align: 'center'},
        {value: 'actions', sortable: false, align: 'right'}
      ],
      // Edit dialog
      showEditDialog: false,
      editableCategoryId: null,
      // Delete dialog
      showDeleteDialog: false,
      selected_category_to_delete: null
    }
  },
  computed: {
    ...mapState('data', ["categories", "tasks"]),
    tableData() {
      // DATE FORMATTING FOR PRINTF TO TABLE
      let result = this.categories.map(a => Object.assign({}, a));
      result.forEach(category => {
        category.count_of_tasks = 0;
        category.count_of_easy_q = 0;
        category.count_of_normal_q = 0;
        category.count_of_hard_q = 0;
        this.tasks.forEach(task => {
          if (task.category_id === category.id) {
            if (task.level === "Лёгкий") category.count_of_easy_q++;
            else if (task.level === "Средний") category.count_of_normal_q++;
            else if (task.level === "Сложный") category.count_of_hard_q++;
            category.count_of_tasks++;
          }
        })
      })
      return result.reverse();
    }
  },
  methods: {
    ...mapMutations('layout', ['SHOW_ERROR_MSG_DIALOG']),
    ...mapActions('data', ['deleteCategory']),
    goToCategory(category) {
      this.$router.push("categories/" + category.id)
    },
    sync() {
      this.loading = true;
      setTimeout(() => {
        this.SHOW_ERROR_MSG_DIALOG({type: 'primary', text: 'Данные обновлены'});
        this.loading = false;
      }, 1000);
    },
    openEditDialog(categoryId) {
      this.editableCategoryId = categoryId;
      this.showEditDialog = true;
    },
    openCreateDialog() {
      this.editableCategoryId = null;
      this.showEditDialog = true;
    },
    openDeleteDialog(category) {
      this.selected_category_to_delete = category;
      this.showDeleteDialog = true;
    }
  }
}
</script>

<style scoped>
.row-pointer >>> tbody tr :hover {
  cursor: pointer;
}
</style>