<template>
  <v-dialog
      max-width="400"
      overlay-opacity="0.1"
      v-model="m_show"
  >
    <!-- Dialog -->
    <v-card v-if="test">
      <v-card-text class="pt-6 pb-0">
        <v-form ref="form">
          <h2 class="mb-6" style="color: rgba(0, 0, 0, 0.8)">
            <v-icon class="mr-1 pb-1" color="error">warning</v-icon>
            Удалить этот тест?
          </h2>
          <p class="p-14-medium">
            {{ 'Вы собираетесь удалить тест \'' + test.name + '\'. Восстановить его будет нельзя.' }}
          </p>
        </v-form>
      </v-card-text>
      <v-card-actions class="px-6 pb-4">
        <v-spacer/>
        <v-btn
            class="h4 px-4 mr-1"
            text
            style="text-transform: none; background-color: rgba(0, 0, 0, 0.06)"
            @click="$emit('update:test', false)"
        >
          Отмена
        </v-btn>
        <v-btn
            class="h4 px-4"
            color="error"
            text
            style="text-transform: none; background-color: rgba(239,83,80, 0.12)"
            :loading="loading"
            @click="lDeleteTest()"
        >
          Подтвердить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapActions, mapMutations} from "vuex";

export default {
  name: "DeleteConfirmation",
  props: [
      "test",
      "show"
  ],
  data() {
    return {
      loading: false
    }
  },
  computed: {
    m_show: {
      get() {
        return this.show;
      },
      set(v) {
        this.$emit('update:show', v);
      },
    }
  },
  methods: {
    ...mapActions('data', ['deleteTest']),
    ...mapMutations('layout', ['SHOW_MSG_DIALOG']),
    lDeleteTest() {
      this.loading = true;
      this.deleteTest(this.test.id)
          .then(() => {
            this.loading = false;
            this.SHOW_MSG_DIALOG({type: 'primary', text: 'Тест удален'});
            this.$emit('update:show', null);
          });
    }
  }
}
</script>
