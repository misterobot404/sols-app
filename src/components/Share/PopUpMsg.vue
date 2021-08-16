<template>
  <v-snackbar
      v-model="m_popupMsg"
      :color="popupMsg.type"
      top
      right
      rounded
      class="h4"
      :class="$vuetify.breakpoint.lgAndUp ? 'lg-margin' : null"
      content-class="text-center"
      :timeout="popupMsg.timeout"
      transition="slide-y-transition"
  >
    {{ popupMsg.text }}
  </v-snackbar>
</template>

<script>
import {mapMutations, mapState} from "vuex";

export default {
  name: "PopUpMsg",
  computed: {
    ...mapState('layout', ["popupMsg"]),
    m_popupMsg: {
      get() {
        return this.popupMsg.show
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