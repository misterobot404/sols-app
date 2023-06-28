<template>
  <v-app :style="{background: $vuetify.theme.themes['light'].background}">
    <!-- Popup msg -->
    <PopUpMsg/>
    <v-main>
      <!-- Navigation -->
      <Navigation v-if="isAuth"/>

      <!-- Загрузка данных после авторизации пользователя -->
      <!-- Проверка делается для исключения загрузки данных для неавторизованных пользователей -->
      <LoadingData v-if="isAuth && !data_loaded"/>
      <!-- Page -->
      <keep-alive v-else>
        <router-view/>
      </keep-alive>
    </v-main>
  </v-app>
</template>

<script>
import {mapGetters, mapState} from 'vuex';
import Navigation from "./components/Navigation";
import PopUpMsg from "./components/PopUpErrorMsg";
import LoadingData from "@/components/LoadingData";

export default {
  name: 'App',
  components: {
    LoadingData,
    PopUpMsg,
    Navigation
  },
  computed: {
    ...mapState('data', ['data_loaded']),
    ...mapGetters('auth', ['isAuth'])
  },
}
</script>