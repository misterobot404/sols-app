<template>
  <div class="signin-dialog">
    <div class="text-center">
      <h1>Вход</h1>
    </div>
    <v-alert
        :value="show_error"
        class="mt-6"
        border="left"
        transition="scale-transition"
        colored-border
        type="error"
        elevation="2"
        style="text-align: left"
    >
      Такое сочетание электронной почты и пароля - не существует.
    </v-alert>
    <form @submit.prevent="auth()">
      <!-- Email -->
      <div class="mt-6">
        <label>
          <h4>Электронная почта</h4>
          <v-text-field
              v-model.trim="username"
              prepend-inner-icon="email"
              required
              hide-details
              outlined
              type="email"
              class="my-1 rounded-lg"
              background-color="white"
          />
        </label>
      </div>
      <!-- Password -->
      <div class="mt-4">
        <label>
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
              class="my-1 rounded-lg"
              background-color="white"
          />
        </label>
        <router-link to="/password/reset" class="font-s-14">Забыли пароль?</router-link>
      </div>
      <!-- Buttons -->
      <v-row class="mt-4 ">
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
              :loading="loading"
          >
            Войти
          </v-btn>
        </v-col>
      </v-row>
      <!-- Links -->
      <div class="mt-6 d-flex flex-column justify-center align-center">
        <v-divider style="width: 300px" class="mt-1"/>
        <a href="https://student.knastu.ru/" class="mt-4">
          <h4>Вход через домен</h4>
        </a>
        <router-link to="/" class="mt-1">
          <h4>Абитуриенту</h4>
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: "SignIn",
  data() {
    return {
      loading: false,
      username: "",
      password: "",
      show_password: false,
      show_error: false,
    }
  },
  methods: {
    ...mapActions('auth', ['login']),
    auth() {
      this.loading = true;
      this.show_error = false;
      this.login({login: this.username, password: this.password})
          .then(() => this.clear())
          .catch(() => this.show_error = true)
          .finally(() => this.loading = false)
    },
    clear() {
      this.username = "";
      this.password = "";
      this.show_error = false;
    }
  },
}
</script>

<style scoped>
.signin-dialog {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 4;
  width: 500px;
  background: #ECECF9;
  padding: 30px 30px 22px;
  border: 3px solid #41C284;
  box-sizing: border-box;
  border-radius: 10px;
}

@media screen and (max-width: 1024px) {
  .signin-dialog {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 350px;
    margin: 0;
  }
}
</style>