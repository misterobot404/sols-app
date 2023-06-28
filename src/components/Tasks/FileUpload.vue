<template>
  <v-row>
    <v-col cols="12">
      <div class="d-flex mb-3 align-center">
        <h4 class="mr-8">Тип файла:</h4>
        <v-checkbox
            v-for="(type, index) in types"
            :key="index"
            v-model="selected_types"
            :value="type"
            :label="type.name"
            hide-details
            class="mt-0 mr-4"
        >
          <template slot="label">
            <v-icon>{{ type.icon }}</v-icon>
            <label class="cursor-pointer">
              {{ '&nbsp;' + type.name }}
            </label>
          </template>
        </v-checkbox>
      </div>
    </v-col>
    <v-btn class="success rounded-lg h4 ml-auto" :loading="loading" large @click="done()">Сохранить</v-btn>
  </v-row>
</template>

<script>
import {mapMutations} from "vuex";

export default {
  name: "FileUpload",
  props: ["data", "loading"],
  data() {
    return {
      selected_types: [],
      types: [
        {name: "Графика", icon: "image"},
        {name: "Архив", icon: "archive"},
        {name: "MS Документ", icon: "description"},
        {name: "Видео", icon: "movie"},
      ]
    }
  },
  methods: {
    ...mapMutations('layout', ['SHOW_ERROR_MSG_DIALOG']),
    done() {
      if (!this.selected_types.length) {
        this.SHOW_ERROR_MSG_DIALOG({type: 'error', text: "Выберите допустимый тип файлов"});
        return;
      }
      // emit answers to parent
      this.$emit('done', {
        body: this.types,
      })
    },
  }
}
</script>

<style scoped>

</style>