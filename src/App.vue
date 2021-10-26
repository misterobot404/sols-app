<template>
  <v-app :style="{background: $vuetify.theme.themes['light'].background}">
    <!-- Page loading process -->
    <v-progress-linear
        color="blue darken-3"
        top
        :active="page_loading"
        indeterminate
        absolute
        style="z-index: 10"
    />
    <!-- Popup msg -->
    <PopUpMsg/>
    <v-main>
      <!-- Navigation -->
      <Navigation v-if="user"/>
      <!-- Page -->
      <keep-alive>
        <router-view/>
      </keep-alive>
    </v-main>
  </v-app>
</template>

<script>
import {mapState} from 'vuex'
import Navigation from "./components/Navigation";
import PopUpMsg from "@/components/PopUpMsg";

export default {
  name: 'App',
  components: {
    PopUpMsg,
    Navigation
  },
  computed: {
    ...mapState({
      page_loading: state => state.layout.page_loading,
      user: state => state.auth.user,
    })
  }
}
</script>