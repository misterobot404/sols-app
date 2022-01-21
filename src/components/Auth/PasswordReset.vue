<template>
  <div class="password-forget-dialog">
    <div class="text-center">
      <h1>Восстановление<br>пароля</h1>
    </div>
    <form @submit.prevent="passwordReset()">
      <div class="mt-7">
        <label>
          <h4>Электронная почта</h4>
          <v-text-field
              required
              outlined
              v-model="email"
              append-icon="email"
              type="email"
              :error-messages="error_email ? 'qwe' : null"
              class="mt-2 mb-1 rounded-lg"
              background-color="white"
              hide-details
          >
            <template v-slot:append>
              <div class="mr-1">
                <v-progress-circular
                    v-if="sendingCode"
                    size="24"
                    color="info"
                    indeterminate
                />
                <div v-else class="pt-1 font-s-14 primary--text cursor-pointer" @click="sendCode">Отправить код</div>
              </div>
            </template>
          </v-text-field>
        </label>
      </div>
      <div class="mt-5">
        <label>
          <h4>Код</h4>
          <v-text-field
              required
              outlined
              :disabled="!codeSend"
              class="mt-2 mb-1 rounded-lg"
              background-color="white"
              hint="Введите код, отправленный Вам на почту"
              :persistent-hint="codeSend"
          />
        </label>
      </div>
      <v-btn
          block
          class="success rounded-lg h4 mt-2"
          type="submit"
          style="height: 54px;"
          :loading="loading"
      >
        Восстановить
      </v-btn>
      <div class="text-center mt-4">
        <a @click="$router.push('/signin')">Войти</a>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "PasswordForget",
  data() {
    return {
      loading: false,
      email: null,
      error_email: false,
      sendingCode: false,
      codeSend: false
    }
  },
  methods: {
    sendCode() {
      let email_pattern = /.+@.+\..+/i;
      this.error_email = !(email_pattern.test(this.email));

      if (!this.error_email) {
        this.sendingCode = true;
        setTimeout(() => {
          this.sendingCode = false;
          this.codeSend = true;
        }, 1000)
      }
    },
    passwordReset() {
      this.loading = true;
    }
  }
}
</script>

<style scoped>
.password-forget-dialog {
  position: relative;
  z-index: 4;
  width: 450px;
  background: #ECECF9;
  padding: 34px 30px 24px;
  border: 3px solid #41C284;
  box-sizing: border-box;
  border-radius: 10px;
  margin-top: 200px;
}

@media screen and (max-width: 1024px) {
  .password-forget-dialog {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 380px;
    margin: 0;
  }
}
</style>