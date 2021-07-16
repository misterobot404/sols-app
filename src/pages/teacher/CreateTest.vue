<template>
  <v-container style="min-height: 100%" class="d-flex flex-column px-4 px-lg-8 px-xl-12">
    <!-- Logo -->
    <v-row class="mt-4 mt-xl-5 justify-center align-center flex-grow-0">
      <v-col cols="12" lg="6" class="d-flex justify-center justify-lg-end">
        <img class="create-test-svg pr-lg-4" :src="require('@/assets/svg/Create-1.svg')" alt="Иконка создания">
      </v-col>
      <v-col cols="12" lg="6" class="d-flex justify-center justify-lg-start">
        <span class="create-test-title primary--text text-center text-lg-left">Создайте свой<br>опросник</span>
      </v-col>
    </v-row>
    <!-- Body -->
    <form @submit.prevent="createTest()" class="rounded-lg d-flex flex-column align-center align-center py-8" style="margin-top: 30px; background: #FEFEFF;" >
      <v-col cols="11" md="10" xl="8">
        <v-row class="align-center justify-center">
          <v-col cols="12" md="6">
            <h4>Тип опросника*</h4>
            <v-select
                v-model="selectedType"
                required
                hide-details
                :items="testTypes"
                outlined
                class="mt-2 mb-1 rounded-lg"
                background-color="white"
                hint="Выберите тип"
            />
          </v-col>
          <v-col cols="12" md="6">
            <h4>Название*</h4>
            <v-text-field
                v-model="name"
                required
                hide-details
                append-icon="title"
                outlined
                class="mt-2 mb-1 rounded-lg"
                background-color="white"
            />
          </v-col>
          <v-col cols="12" md="6">
            <h4>Дата начала*</h4>
            <v-text-field
                id="dateBeginning"
                required
                hide-details
                v-model="dateBeginning"
                outlined
                type="date"
                min=""
                class="mt-2 mb-1 rounded-lg"
                background-color="white"
            />
          </v-col>
          <v-col cols="12" md="6">
            <h4>Дата окончания*</h4>
            <v-text-field
                id="dateEnd"
                v-model="dateEnd"
                required
                type="date"
                hide-details
                outlined
                class="mt-2 mb-1 rounded-lg"
                background-color="white"
            />
          </v-col>
          <v-col cols="12" md="6">
            <h4>Количество вопросов*</h4>
            <v-text-field
                required
                v-model="numberQuestions"
                type="number"
                append-icon="format_list_numbered"
                hide-details
                outlined
                class="mt-2 mb-1 rounded-lg"
                background-color="white"
            />
          </v-col>
          <v-col cols="12" md="6">
            <h4>Время для прохождения*</h4>
            <v-text-field
                v-model="testTime"
                required
                append-icon="timer"
                hide-details
                outlined
                type="number"
                class="mt-2 mb-1 rounded-lg"
                background-color="white"
            />
          </v-col>
          <v-col cols="12" md="6">
            <h4>Категории</h4>
            <v-select
                v-model="selectedQuestionCategories"
                :items="questionCategories"
                :item-text="'name'"
                :item-value="'id'"
                chips
                outlined
                hide-details
                clearable
                multiple
                class="mt-2 mb-1 rounded-lg"
            />
          </v-col>
          <v-col align-self="start" cols="12" md="6">
            <h4>Пароль</h4>
            <v-text-field
                required
                hide-details
                outlined
                type="password"
                append-icon="vpn_key"
                class="mt-2 mb-1 rounded-lg"
                background-color="white"
            />
          </v-col>
          <v-btn class="success rounded-lg h4 mx-auto mt-6" x-large type="submit">Создать</v-btn>
        </v-row>
      </v-col>
    </form>
    <!-- Footer -->
    <div class="text-center d-flex justify-center p-14-medium pt-5 pb-2 mt-auto align-center">
      <router-link to="/" class="mx-xl-10 mx-5 black--text text-no-wrap">
        О сайте
      </router-link>
      <router-link to="/" class="mx-xl-10 mx-5 black--text">
        Служба поддержки
      </router-link>
    </div>
  </v-container>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: "CreateTest",
  data() {
    return {
      selectedType: null,
      name: "",
      dateBeginning: null,
      dateEnd: null,
      numberQuestions: null,
      testTime: null,
      selectedQuestionCategories: null,
      password: "",
    }
  },
  computed: {
    ...mapState('data', ["questionCategories", "testTypes"])
  },
  methods: {
    createTest() {
    }
  },
  mounted() {
    /* Set min date for dateBeginning and dateEnd*/
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1; //January is 0!
    let yyyy = today.getFullYear();
    if(dd<10){
      dd='0'+dd
    }
    if(mm<10){
      mm='0'+mm
    }
    today = yyyy+'-'+mm+'-'+dd;
    document.getElementById("dateBeginning").setAttribute("min", today);
    document.getElementById("dateEnd").setAttribute("min", today);
  }
}
</script>

<style scoped>

.create-test-svg {
  height: 250px;
}

.create-test-title {
  font-family: Inter-Medium, sans-serif;
  font-size: 40px;
  line-height: 48px;
}

/* Изменение разметки под более низкое разрешение */
@media screen and (max-width: 600px) {
  .create-test-svg {
    width: 160px;
    height: 160px;
  }

  .create-test-title {
    font-family: Inter-Medium, sans-serif;
    font-size: 22px;
    line-height: 27px;
  }
}
</style>

<style>
.v-select.v-select--chips:not(.v-text-field--single-line).v-text-field--box .v-select__selections, .v-select.v-select--chips:not(.v-text-field--single-line).v-text-field--enclosed .v-select__selections {
  min-height: 56px !important;
}
</style>