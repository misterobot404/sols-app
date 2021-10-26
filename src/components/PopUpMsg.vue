<template>
  <v-snackbar
      v-model="m_popupMsg"
      :color="popup_msg.type"
      top
      right
      rounded
      class="h4"
      :class="$vuetify.breakpoint.lgAndUp ? 'lg-margin' : null"
      content-class="text-center"
      :timeout="popup_msg.timeout"
      transition="slide-y-transition"
  >
    {{ popup_msg.text }}
  </v-snackbar>
</template>

<script>
import {mapMutations, mapState} from "vuex";

export default {
  name: "popup_msg",
  computed: {
    ...mapState('layout', ["popup_msg"]),
    m_popupMsg: {
      get() {
        return this.popup_msg.show
      },
      set() {
        this.HIDE_MSG_DIALOG()
      }
    }
  },
  methods: {
    ...mapMutations('layout', ['HIDE_MSG_DIALOG'])
  }
}
</script>

<style scoped>
  .lg-margin {
    top: 12px;
    right: 18px
  }
</style>