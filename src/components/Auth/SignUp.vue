<template>
  <div class="signup-dialog">
    <div class="text-center">
      <h1>Регистрация</h1>
    </div>
    <v-alert
        :value="error"
        class="mt-6 mb-2"
        border="left"
        transition="scale-transition"
        colored-border
        type="error"
        elevation="2"
        style="text-align: left"
    >
      {{ error }}
    </v-alert>
    <form @submit.prevent="lRegister()">
      <div class="mt-7">
        <label>
          <h4>Электронная почта</h4>
          <v-text-field
              prepend-inner-icon="email"
              v-model.trim="email"
              required
              :error-messages="error_email ? 'Введите корректный адрес электронной почты' : null"
              type="email"
              outlined
              class="mt-1 rounded-lg"
              background-color="white"
          />
        </label>
      </div>
      <div class="mt-2">
        <label>
          <h4>Пароль</h4>
          <v-text-field
              v-model.trim="password"
              :append-icon="password ? (show_password ? 'visibility_off' : 'visibility') : null"
              @click:append="() => (show_password = !show_password)"
              :type="show_password ?  'text' : 'password'"
              prepend-inner-icon="lock"
              required
              :error-messages="error_password_length ? 'Введите не менее 8 символов' : null"
              hint="Не менее 8 символов"
              outlined
              class="mt-1 rounded-lg"
              background-color="white"
          />
        </label>
      </div>
      <div class="mt-2">
        <label>
          <h4>Подтвердите пароль</h4>
          <v-text-field
              v-model.trim="confirm_password"
              :append-icon="confirm_password ? (show_confirm_password ? 'visibility_off' : 'visibility') : null"
              @click:append="() => (show_confirm_password = !show_confirm_password)"
              :type="show_confirm_password ?  'text' : 'password'"
              prepend-inner-icon="lock"
              :error-messages="error_password_same ? 'Пароли не совпадают' : null"
              required
              outlined
              class="mt-1 rounded-lg"
              background-color="white"
          />
        </label>
      </div>
      <v-btn
          type="submit"
          :loading="loading"
          block
          class="success rounded-lg h4"
          style="height: 54px; margin-top: 12px"
      >
        Зарегистрироваться
      </v-btn>
      <div class="text-center mt-4">
        <a @click="$router.push('/signin')">Войти</a>
      </div>
    </form>
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
      confirm_password: "",
      show_password: false,
      show_confirm_password: false,
      error: null,
      error_email: false,
      error_password_same: false,
      error_password_length: false
    }
  },
  watch: {
    email() {
      this.error_email = false;
    },
    password() {
      this.error_password_length = false;
    },
    confirm_password() {
      this.error_password_same = false;
    },
  },
  methods: {
    ...mapActions('auth', ['register']),
    lRegister() {
      let email_pattern = /.+@.+\..+/i;
      this.error_email = !(email_pattern.test(this.email));
      this.error_password_same = this.password !== this.confirm_password;
      this.error_password_length = this.password.length < 8;

      if (!this.error_email && !this.error_password_same && !this.error_password_length) {
        this.error = null;
        this.loading = true;
        this.register({login: this.email, password: this.password, confirm_password: this.confirm_password})
            .then((response) => {
              this.clear();
              console.log(response);
            })
            .catch((error) => {
              this.error = error.response.data.error;
            })
            .finally(() => {
              this.loading = false;
            })
      }
    },
    clear() {
      this.email = "";
      this.password = "";
      this.confirm_password = "";
      this.error = null;
      this.error_email = false;
      this.error_password_same = false;
      this.error_password_length = false;
    }
  },
}
</script>

<style scoped>
.signup-dialog {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 4;
  width: 450px;
  background: #ECECF9;
  padding: 34px 30px 24px;
  border: 3px solid #41C284;
  box-sizing: border-box;
  border-radius: 10px;
}

@media screen and (max-width: 1024px) {
  .signup-dialog {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 380px;
    margin: 0;
  }
}
</style>


