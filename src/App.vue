<template>
  <v-app :style="{background: $vuetify.theme.themes['light'].background}">
    <!-- Page loading process -->
    <v-progress-linear
        color="blue darken-3"
        top
        :active="pageLoading"
        indeterminate
        absolute
        style="z-index: 10"
    />
    <!-- Popup msg -->
    <PopUpMsg/>
    <v-main>
      <!-- Navigation -->
      <NavigationTeacher v-if="role === 'Teacher'"/>
      <NavigationStudent v-else-if="role === 'Student'"/>
      <!-- Page -->
      <keep-alive>
        <router-view/>
      </keep-alive>
    </v-main>
  </v-app>
</template>

<script>
import {mapState} from 'vuex'
import NavigationTeacher from "./components/NavigationTeacher";
import NavigationStudent from "./components/NavigationStudent";
import PopUpMsg from "@/components/PopUpMsg";

export default {
  name: 'App',
  components: {
    PopUpMsg,
    NavigationStudent,
    NavigationTeacher
  },
  computed: {
    ...mapState('auth', ["role"]),
    ...mapState('layout', ["pageLoading"]),
  }
}
</script>