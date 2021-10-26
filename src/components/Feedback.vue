<template>
  <div>
    <!-- Feedback btn -->
    <v-btn
        @click="SHOW_FEEDBACK_DIALOG"
        fab
        dark
        large
        fixed
        bottom
        right
        color="primary"
        style="bottom: 18px; right: 18px"
    >
      <v-icon>help_outline</v-icon>
    </v-btn>
    <v-fab-transition>
      <div class="feedback-dialog" v-if="feedback_dialog">
        <!-- Dialog -->
        <v-card v-click-outside="HIDE_FEEDBACK_DIALOG">
          <!-- Header -->
          <v-toolbar
              height="68"
              flat
              class="pr-1"
          >
            <v-icon
                large
                class="mr-2 pt-1"
                color="primary"
            >
              help_outline
            </v-icon>
            <v-toolbar-title class="mt-1 h3"> Обратная связь</v-toolbar-title>
            <v-spacer/>
            <v-btn
                icon
                @click="HIDE_FEEDBACK_DIALOG()"
            >
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-divider/>
          <!-- Body -->
          <v-card-text class="pb-0">
            <v-alert
                :value="showSuccess"
                class="mt-4 mb-2"
                border="left"
                transition="scale-transition"
                colored-border
                type="info"
                elevation="2"
                style="text-align: left"
            >
              <h4>Спасибо за обращение!</h4>
              <span>Мы ответим Вам на почту при первой возможности.</span>
            </v-alert>
            <v-form ref="form">
              <v-container class="pb-0">
                <v-row>
                  <v-col cols="12" class="pb-0 pt-3">
                    <v-text-field
                        label="Ваше Имя"
                        filled
                        v-model.trim="name"
                        prepend-icon="person"
                        :rules="[ v => !!v || 'Введите Ваше имя' ]"
                        required
                    />
                  </v-col>
                  <v-col cols="12" class="pb-0 pt-1">
                    <v-text-field
                        label="Ваш Email"
                        filled
                        v-model.trim="email"
                        prepend-icon="mail"
                        :rules="[
                                        v => !!v || 'Введите Email',
                                        v => /.+@.+\..+/.test(v) || 'Email введён не верно.'
                                    ]"
                        required
                    />
                  </v-col>
                  <v-col id="selectSubject" cols="12" class="pb-0 pt-1" style="position: relative">
                    <v-select
                        v-model="subject"
                        attach="#selectSubject"
                        :items="['Ошибки и баги', 'Предложения по улучшению']"
                        :rules="[v => !!v || 'Обязательное поле']"
                        label="Тема обращения"
                        filled
                        required
                    />
                  </v-col>
                  <v-col cols="12" class="pb-2 pt-1">
                    <v-textarea
                        filled
                        label="Описание обращения"
                        v-model.trim="message"
                        :rules="[v => !!v || 'Обязательное поле']"
                        required
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-card-text>
          <v-divider/>
          <!-- Footer -->
          <v-card-actions class="px-9 py-4">
            <v-btn
                text
                class="h4 px-4"
                @click="clearField()"
            >
              Очистить
            </v-btn>
            <v-spacer/>
            <v-btn
                class="px-7 h4"
                color="primary"
                outlined
                :loading="loading"
                @click="sendMail()"
            >
              Отправить
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </v-fab-transition>
  </div>
</template>

<script>
import Vue from "vue"
import {mapMutations, mapState} from "vuex"
import vClickOutside from "v-click-outside"

Vue.use(vClickOutside)

export default {
  name: "Feedback",
  data() {
    return {
      loading: false,
      showSuccess: false,
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  },
  computed: {
    ...mapState('layout', ["feedback_dialog"]),
  },
  methods: {
    ...mapMutations('layout', ["HIDE_FEEDBACK_DIALOG", "SHOW_FEEDBACK_DIALOG"]),
    sendMail() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.showSuccess = false;

        setTimeout(() => {
          this.showSuccess = true;
          this.loading = false;
        }, 2000);
      }
    },
    clearField() {
      this.showSuccess = false;
      this.$refs.form.reset()
    },
  }
}
</script>

<style lang="sass" scoped>
.feedback-dialog
  position: fixed
  bottom: 0
  right: 0
  z-index: 5
  max-width: 440px
  border-radius: 4px
  margin: 24px
  transition: 2s cubic-bezier(0.25, 0.8, 0.25, 1)
  box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2), 0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12)
</style>