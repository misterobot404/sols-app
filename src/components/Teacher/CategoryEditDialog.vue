<template>
  <v-dialog
      max-width="380"
      :value="show"
      overlay-opacity="0.1"
      @input="v => $emit('update:show', v)"
  >
    <!-- Dialog -->
    <v-card>
      <v-card-text class="pt-6">
        <v-form ref="form">
          <v-text-field
              v-model="category.name"
              autocomplete="off"
              label="Название"
              hide-details
              required
          />
        </v-form>
      </v-card-text>
      <v-card-actions class="px-9 pb-4">
        <v-spacer/>
        <v-btn
            class="h4"
            text
            color="primary"
            @click="$emit('update:show', false)"
        >
          Отмена
        </v-btn>
        <v-btn
            class="h4"
            color="primary"
            text
            :loading="loading"
            :disabled="!category.name.trim()"
            @click="lUpdateCategory()"
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
  name: "CategoryEditDialog",
  props: ["show", "categoryId"],
  data() {
    return {
      loading: false,
      category: {}
    }
  },
  computed: {
    ...mapGetters('data',['getCategoryById'])
  },
  watch: {
    show: {
      handler(val) {
        if (val) Object.assign(this.category, this.getCategoryById(this.categoryId));
      },
      immediate: true
    }
  },
  methods: {
    ...mapMutations('layout', ['SHOW_MSG_DIALOG']),
    ...mapActions('data', ["updateCategory"]),
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
    }
  }
}
</script>
