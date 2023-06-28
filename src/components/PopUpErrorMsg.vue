<template>
  <v-snackbar
      v-model="m_popupMsg"
      rounded="pill"
      top
      right
      text
      outlined
      timeout="-1"
      color="error"
  >
    <h3>{{ popup_error_msg.text }}</h3>
    <template v-slot:action="{ attrs }">
      <v-btn
          color="red"
          icon
          v-bind="attrs"
          @click="m_popupMsg = false"
      >
        <v-icon>close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import {mapMutations, mapState} from "vuex";

export default {
  name: "PopUpErrorMsg",
  computed: {
    ...mapState('layout', ["popup_error_msg"]),
    m_popupMsg: {
      get() {
        return this.popup_error_msg.show
      },
      set() {
        this.HIDE_ERROR_MSG_DIALOG()
      }
    }
  },
  methods: {
    ...mapMutations('layout', ['HIDE_ERROR_MSG_DIALOG'])
  }
}
</script>