<template>
  <div style="overflow: hidden; max-height: 100vh;">
    <v-container fluid class="py-0">
      <v-row>
        <v-col/>
        <v-col cols="3">
          <h1 class="site-title primary--text" style="font-size: 48px; line-height: 1.2">
            SOLS<span class="d-none d-md-inline"> - Система тестирования</span>
          </h1>
          <img class="svg-people" :src="require('@/assets/svg/Personal-main-1.svg')" alt="Человек">
        </v-col>
        <v-col/>
        <v-col cols="2">
          <img width="374" height="423" :src="require('@/assets/svg/Vector-1.svg')" alt="Клякса">
          <img width="100%" height="290" style="margin-top: 200px; position: relative; z-index: 1" :src="require('@/assets/svg/Vector-2.svg')" alt="Клякса">
        </v-col>
        <v-col cols="1">
          <component :is="componentForPage"/>
        </v-col>
        <v-col cols="4" class="overflow-hidden">
          <img style="margin-top: 518px;" width="775" height="788" :src="require('@/assets/svg/Vector-1.svg')" alt="Клякса">
        </v-col>
      </v-row>
    </v-container>
    <footer class="d-flex justify-center" style="position:absolute; bottom: 8px; z-index: 3; width: 100vw">
      <v-col cols="6" class="d-flex pa-0 align-center justify-end">
        <router-link to="/" class="black--text">
          <h4>О сайте</h4>
        </router-link>
        <span style="opacity: 0.7">&#160&#160•&#160&#160</span>
      </v-col>
      <v-col cols="6" class="pa-0 d-flex align-center">
        <router-link to="/" class="black--text">
          <h4>Служба поддержки</h4>
        </router-link>
      </v-col>
    </footer>
  </div>
</template>

<script>
import SignIn from "@/components/Auth/SignIn";
import SignUp from "@/components/Auth/SignUp";
import PasswordReset from "@/components/Auth/PasswordReset";

export default {
  name: "Auth",
  components: {
    SignIn,
    SignUp,
    PasswordReset
  },
  computed: {
    componentForPage() {
      switch (this.$route.path) {
        case "/signin":
          return "SignIn";
        case "/signup":
          return "SignUp";
        case "/password/reset":
          return "PasswordReset";
        default:
          return "SignIn";
      }
    }
  }
}
</script>

<style scoped>
.site-title {
  margin-top: 120px;
}

.svg-people {
  width: 724px;
  height: 519px;
  margin-top: 61px;
  position: relative;
  z-index: 2;
}

/* Изменение разметки под более низкое разрешение */
@media screen and (max-width: 1280px) {
  .site-title {
    margin-top: 80px;
  }

  .svg-people {
    width: 547px;
    height: 392px;
  }
}
</style>