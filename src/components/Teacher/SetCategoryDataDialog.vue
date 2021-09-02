<template>
  <v-dialog
      max-width="400"
      :value="show"
      overlay-opacity="0.1"
      @input="v => $emit('update:show', v)"
  >
    <!-- Dialog -->
    <v-card>
      <v-card-text class="pt-6">
        <v-form ref="form">
          <h2 class="mb-6" style="color: rgba(0, 0, 0, 0.8)">
            <v-icon color="primary" class="mr-1 pb-1">{{ mode === 'create' ? "create_new_folder" : "edit" }}</v-icon>
            {{ mode === 'create' ? "Создание категории" : "Изменение категории" }}
          </h2>
          <v-text-field
              v-model="category.name"
              autocomplete="off"
              label="Название"
              hide-details
              required
          />
        </v-form>
      </v-card-text>
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
            :style="category.name.trim() ? 'background-color: rgba(25, 118, 211, 0.1)' : 'background-color: rgba(0, 0, 0, 0.06)'"
            :loading="loading"
            :disabled="!category.name.trim()"
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
  name: "SetCategoryDataDialog",
  props: ["show", "category_id"],
  data() {
    return {
      mode: null,
      loading: false,
      category: {
        name: ""
      }
    }
  },
  computed: {
    ...mapGetters('data', ['getCategoryById'])
  },
  watch: {
    show: {
      handler(val) {
        if (val) {
          if (this.category_id) {
            Object.assign(this.category, this.getCategoryById(this.category_id));
            this.mode = "edit"
          } else this.mode = "create"
        } else this.clear();
      },
      immediate: true
    }
  },
  methods: {
    ...mapMutations('layout', ['SHOW_MSG_DIALOG']),
    ...mapActions('data', ["updateCategory",'createCategory']),
    lCreateCategory() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.createCategory(this.category)
            .then(() => {
              this.loading = false;
              this.SHOW_MSG_DIALOG({type: 'primary', text: "Категория создана"});
              this.$emit('update:show', false);
            })
      }
    },
    lUpdateCategory() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.updateCategory(this.category)
            .then(() => {
              this.loading = false;
              this.SHOW_MSG_DIALOG({type: 'primary', text: "Изменения сохранены"});
              this.$emit('update:show', false);
            })
      }
    },
    clear() {
      this.category = {
        name: ""
      }
    }
  }
}
</script>
