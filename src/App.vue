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
      <NavigationTeacher v-if="role === 'teacher'"/>
      <NavigationStudent v-else-if="role === 'student'"/>
      <!-- Page -->
      <keep-alive exclude="Testing">
        <router-view/>
      </keep-alive>
    </v-main>
  </v-app>
</template>

<script>
import {mapState} from 'vuex'
import NavigationTeacher from "./components/Teacher/NavigationTeacher";
import NavigationStudent from "./components/Student/NavigationStudent";
import PopUpMsg from "@/components/Share/PopUpMsg";

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