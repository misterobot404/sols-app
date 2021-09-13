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
          <div class="signup-dialog">
            <div class="text-center">
              <h1>Регистрация</h1>
            </div>
            <v-alert
                :value="show_error"
                class="mt-6 mb-2"
                border="left"
                transition="scale-transition"
                colored-border
                type="error"
                elevation="2"
                style="text-align: left"
            >
              <h4>Пользователь с таким логином уже существует.</h4>
            </v-alert>
            <form @submit.prevent="lRegister()">
              <div style="margin-top: 28px">
                <h4>Логин</h4>
                <v-text-field
                    prepend-inner-icon="person"
                    v-model.trim="email"
                    required
                    hide-details
                    outlined
                    class="mt-2 rounded-lg"
                    background-color="white"
                />
              </div>
              <div style="margin-top: 38px">
                <h4>Пароль</h4>
                <v-text-field
                    v-model.trim="password"
                    :append-icon="password ? (show_password ? 'visibility_off' : 'visibility') : null"
                    @click:append="() => (show_password = !show_password)"
                    :type="show_password ?  'text' : 'password'"
                    prepend-inner-icon="lock"
                    required
                    hide-details
                    outlined
                    class="mt-2 rounded-lg"
                    background-color="white"
                />
              </div>
              <div style="margin-top: 38px">
                <h4>Подтвердите пароль</h4>
                <v-text-field
                    v-model.trim="confirm_password"
                    :append-icon="confirm_password ? (show_confirm_password ? 'visibility_off' : 'visibility') : null"
                    @click:append="() => (show_confirm_password = !show_confirm_password)"
                    :type="show_confirm_password ?  'text' : 'password'"
                    prepend-inner-icon="lock"
                    :error-messages="password_same ? null : 'Пароли не совпадают'"
                    required
                    hide-details
                    outlined
                    class="mt-2 rounded-lg"
                    background-color="white"
                />
              </div>
              <v-btn
                  type="submit"
                  :loading="loading"
                  block
                  class="success rounded-lg h4"
                  style="height: 54px; margin-top: 42px"
              >
                Зарегистрироваться
              </v-btn>
            </form>
          </div>
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
import {mapActions} from "vuex";

export default {
  name: "SignUp",
  data() {
    return {
      loading: false,
      email: "",
      password: "",
      show_password: false,
      confirm_password: "",
      show_confirm_password: false,
      show_error: false,
      password_same: true
    }
  },
  methods: {
    ...mapActions('auth', ['register']),
    lRegister() {
      this.password_same = this.password === this.confirm_password;
      if (this.password_same) {
        this.show_error = false;
        this.loading = true;
        this.register({login: this.email, password: this.password, confirm_password: this.confirm_password})
            .then(() => this.clear())
            .catch(() => this.show_error = true)
            .finally(() => {
              this.loading = false;
            })
      }
    },
    clear() {
      this.email = "";
      this.password = "";
      this.confirm_password = "";
      this.show_error = false;
      this.password_same = true;
    }
  },
}
</script>

<style scoped>

.site-title {
  margin-top: 171px;
}

.signup-dialog {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 3;
  width: 450px;
  background: #ECECF9;
  padding: 34px 30px 40px;
  border: 3px solid #41C284;
  box-sizing: border-box;
  border-radius: 10px;
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
  .signup-dialog {
    margin-top: 86px;
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
  .signup-dialog {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 380px;
    margin: 0;
  }
}
</style>


