<template>
  <v-snackbar
      v-model="m_popupMsg"
      :color="popupMsg.type"
      bottom
      rounded
      app
      class="h4"
      content-class="text-center"
      timeout="3000"
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

</style>