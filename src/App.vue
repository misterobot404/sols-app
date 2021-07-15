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
    <v-main>
      <NavigationTeacher v-if="role === 'teacher'"/>
      <NavigationStudent v-else-if="role === 'student'"/>
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

export default {
  name: 'App',
  components: {NavigationStudent, NavigationTeacher},
  data() {
    return {}
  },
  computed: {
    ...mapState('auth', ["role"]),
    ...mapState('layout', ["pageLoading"])
  }
}
</script>