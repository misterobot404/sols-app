<template>
  <v-dialog
      max-width="400"
      :value="show"
      overlay-opacity="0.1"
      @input="v => $emit('update:show', v)"
  >
    <!-- Dialog -->
    <v-card>
      <v-card-text class="pt-6 pb-0">
        <v-form ref="form">
          <h2 class="mb-6" style="color: rgba(0, 0, 0, 0.8)">
            <v-icon color="primary" class="mr-1 pb-1">info</v-icon>
            Подтверждение
          </h2>
          <p class="font-s-14" style="text-align: justify;">
            После начала, Вы не сможете приостановить время тестирования или начать тест заново. Продолжить?
          </p>
          <v-checkbox v-model="skip_confirm" label="Не показывать больше"/>
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
            style="text-transform: none; background-color: rgba(25, 118, 211, 0.1)"
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
  name: "StartTestConfirm",
  props: ["show"],
  data() {
    return {
      skip_confirm: false
    }
  },
  methods: {
    confirm() {
      if (this.skip_confirm) localStorage.setItem("testing_start_test_skip_confirm", "true");
      this.$emit('confirm');
      this.$emit('update:show', false);
    }
  }
}
</script>
