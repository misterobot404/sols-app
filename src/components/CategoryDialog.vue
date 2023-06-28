<template>
  <v-dialog
      max-width="400"
      v-model="m_show"
      overlay-opacity="0.1"
  >
    <!-- Dialog -->
    <v-card>
      <v-toolbar
          height="64"
          flat
          class="pr-1"
      >
        <v-icon color="primary" class="mr-1 pb-1">{{ mode === 'create' ? "library_add" : "edit" }}</v-icon>
        <v-toolbar-title class="ml-1" v-text="mode === 'create' ? 'Добавление темы' : 'Изменение темы'"/>
        <v-spacer/>
        <v-btn
            icon
            @click="$emit('update:show', false)"
        >
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-divider/>
      <!-- Содержание -->
      <div class="pa-6 pt-3">
        <v-form ref="form">
          <v-text-field
              v-if="mode=== 'edit' && old_category"
              v-model="old_category.name"
              label="Старое название"
              disabled
              required
          />
          <v-text-field
              v-model="new_category.name"
              autofocus
              autocomplete="off"
              :label="mode === 'edit' ? 'Новое название' : 'Название'"
              hide-details
              required
          />
        </v-form>
      </div>
      <v-card-actions class="px-6 pb-4">
        <v-spacer/>
        <v-btn
            class="h4 px-4 mr-1"
            text
            style="text-transform: none; background-color: rgba(0, 0, 0, 0.06)"
            @click="$emit('update:show', false)"
        >
          Отмена
        </v-btn>
        <v-btn
            class="h4 px-4"
            color="primary"
            text
            style="text-transform: none;"
            :style="new_category.name.trim() ? 'background-color: rgba(25, 118, 211, 0.1)' : 'background-color: rgba(0, 0, 0, 0.06)'"
            :loading="loading"
            :disabled="!new_category.name.trim()"
            @click="mode === 'create' ? lCreateCategory() : lUpdateCategory()"
        >
          Подтвердить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapActions, mapMutations, mapGetters} from 'vuex'

export default {
  name: "CategoryDialog",
  props: ["show", "category_id", "subject_id"],
  data() {
    return {
      mode: null,
      loading: false,
      // Тема до редактирования
      old_category: null,
      // Тема до редактирования
      new_category: {
        name: "",
        subject_id: null
      }
    }
  },
  computed: {
    ...mapGetters('data', ['getCategoryById']),
    m_show: {
      get() {
        return this.show === 'category'
      },
      set(v) {
        this.$emit('update:show', v);
      },
    }
  },
  watch: {
    show: {
      handler(val) {
        if (val) {
          if (this.category_id) {
            this.old_category = this.getCategoryById(this.category_id);
            Object.assign(this.new_category, this.old_category);
            this.mode = "edit"
          } else {
            this.mode = "create";
            this.new_category.subject_id = this.subject_id;
          }
        } else this.clear();
      },
      immediate: true
    }
  },
  methods: {
    ...mapMutations('layout', ['SHOW_ERROR_MSG_DIALOG']),
    ...mapActions('data', ["updateCategory", 'createCategory']),
    lCreateCategory() {
      if (this.$refs.form.validate()) {
        this.createCategory(this.new_category);
        this.$emit('update:show', false);
      }
    },
    lUpdateCategory() {
      if (this.$refs.form.validate()) {
        this.$emit('update:show', false);
        this.updateCategory(this.new_category);
      }
    },
    clear() {
      this.new_category = {
        name: "",
        subject_id: null
      }
    }
  }
}
</script>

