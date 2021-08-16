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
          <form class="password-forget-dialog">
            <div class="text-center">
              <h1>Восстановление пароля</h1>
            </div>
            <form>
              <div style="margin-top: 28px">
                <h4>Электронная почта</h4>
                <v-text-field required hide-details outlined class="mt-2 mb-1 rounded-lg" background-color="white"/>
                <div class="p-14-medium primary--text">Введите почту, к которой привязан аккаунт</div>
              </div>
              <div style="margin-top: 38px">
                <h4>Код</h4>
                <v-text-field
                    required
                    hide-details
                    outlined
                    class="mt-2 mb-1 rounded-lg"
                    background-color="white"
                    type="password"
                />
                <div class="p-14-medium primary--text">Введите код, отправленный Вам на почту</div>
              </div>
              <v-btn
                  block
                  class="success rounded-lg h4"
                  type="submit"
                  style="height: 54px; margin-top: 42px"
              >
                Восстановить
              </v-btn>
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
export default {
  name: "PasswordForget"
}
</script>

<style scoped>
.site-title {
  margin-top: 171px;
}

.password-forget-dialog {
  position: relative;
  z-index: 3;
  width: 450px;
  background: #ECECF9;
  padding: 34px 30px 40px;
  border: 3px solid #41C284;
  box-sizing: border-box;
  border-radius: 10px;
  margin-top: 200px;
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
  .password-forget-dialog {
    margin-top: 100px;
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