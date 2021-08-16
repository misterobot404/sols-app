<template>
  <div style="overflow: hidden; max-height: 100vh;">
    <v-container fluid class="py-0">
      <v-row>
        <v-col/>
        <v-col cols="3">
          <h1 class="site-title primary--text" :class="$vuetify.breakpoint.xlOnly ? 'text-no-wrap' : null">SOLS - Онлайн опросы</h1>
          <img class="svg-people" :src="require('@/assets/svg/Personal-main-1.svg')" alt="Человек">
        </v-col>
        <v-col/>
        <v-col cols="2">
          <img width="374" height="423" :src="require('@/assets/svg/Vector-1.svg')" alt="Клякса">
          <img width="100%" height="290" style="margin-top: 220px; position: relative; z-index: 1" :src="require('@/assets/svg/Vector-2.svg')" alt="Клякса">
        </v-col>
        <v-col cols="1">
          <form class="signin-dialog">
            <div class="text-center">
              <h1>Вход</h1>
            </div>
            <form @submit.prevent="auth()">
              <div style="margin-top: 28px">
                <h4>Логин</h4>
                <v-text-field
                    v-model.trim="username"
                    required
                    hide-details
                    outlined
                    class="mt-2 mb-1 rounded-lg"
                    background-color="white"
                />
                <router-link to="/username/reset" class="p-14-medium">Забыли логин?</router-link>
              </div>
              <div style="margin-top: 38px">
                <h4>Пароль</h4>
                <v-text-field
                    v-model.trim="password"
                    required
                    hide-details
                    outlined
                    class="mt-2 mb-1 rounded-lg"
                    background-color="white"
                    type="password"
                />
                <router-link to="/password/reset" class="p-14-medium">Забыли пароль?</router-link>
              </div>
              <v-row style="margin-top: 26px">
                <v-col cols="12" md="6">
                  <v-btn
                      :to="{path: '/signup'}"
                      class="primary rounded-lg h4"
                      style="min-height: 54px; white-space: normal"
                      type="submit"
                      block
                  >
                    Создать аккаунт
                  </v-btn>
                </v-col>
                <v-col cols="12" md="6">
                  <v-btn
                      block
                      class="success rounded-lg h4"
                      type="submit"
                      style="height: 54px;"
                  >
                    Войти
                  </v-btn>
                </v-col>
              </v-row>
            </form>
          </form>
        </v-col>
        <v-col cols="4" class="overflow-hidden">
          <img style="margin-top: 518px;" width="775" height="788" :src="require('@/assets/svg/Vector-1.svg')" alt="Клякса">
        </v-col>
      </v-row>
    </v-container>
    <div class="text-center p-14-medium" style="position:absolute; bottom: 38px; z-index: 3; width: 100vw">
      <router-link to="/" class="mx-xl-10 mx-5 black--text">
        О сайте
      </router-link>
      <router-link to="/" class="mx-xl-10 mx-5 black--text">
        Служба поддержки
      </router-link>
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'

export default {
  name: "SignIn",
  data() {
    return {
      username: "",
      password: ""
    }
  },
  methods: {
    ...mapMutations('auth', ['LOGIN']),
    auth() {
      if (this.username === "teacher") this.LOGIN({role: "teacher"});
      else if (this.username === "student") this.LOGIN({role: "student"});
    }
  }
}
</script>

<style scoped>
.site-title {
  margin-top: 171px;
}

.signin-dialog {
  position: relative;
  z-index: 3;
  width: 450px;
  background: #ECECF9;
  padding: 34px 30px 40px;
  border: 3px solid #41C284;
  box-sizing: border-box;
  border-radius: 10px;
  margin-top: 240px;
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
  .signin-dialog {
    margin-top: 128px;
  }

  .site-title {
    margin-top: 89px;
  }

  .svg-people {
    width: 547px;
    height: 392px;
  }
}

@media screen and (max-width: 960px) {
  .signin-dialog {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 350px;
    margin: 0;
  }
}
</style>