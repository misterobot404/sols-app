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
            <v-icon class="mr-1 pb-1" color="error">warning</v-icon>
            {{this.header}}
          </h2>
          <p class="p-14-medium">
            {{body}}
          </p>
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
            color="error"
            text
            style="text-transform: none; background-color: rgba(239,83,80, 0.12)"
            @click="$emit('confirm'); $emit('update:show', false)"
        >
          Подтвердить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "DeleteConfirmation",
  props: [
      "show",
      "header",
      "body"
  ],
}
</script>
