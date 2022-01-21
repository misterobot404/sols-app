<template>
  <v-container fluid pa-0 style="height: 100%;">
    <v-progress-circular
        value="true"
        :size="120"
        :width="4"
        indeterminate
        color="primary"
        style="position: relative; top: 50%; left: 50%; transform: translate(-50%, -50%);"
    />
  </v-container>
</template>

<script>
import {mapActions, mapMutations, mapState} from "vuex";

export default {
  name: "LoadingData",
  computed: {
    ...mapState('auth', ['user'])
  },
  methods: {
    ...mapActions('data', ['getAllData']),
    ...mapMutations('data', ['SET_DATA_LOADED'])
  },
  beforeMount() {
    this.getAllData().then(() => this.SET_DATA_LOADED(true))
  }
}
</script>
