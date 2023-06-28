<template>
  <v-container class="ma-6">
    <v-row class="mx-1 mt-8 primary--text flex-grow-0">
      <v-col cols="12" sm="6" align-self="center">
        <h1 class="primary--text text-center text-sm-start">Отчёты</h1>
      </v-col>
    </v-row>
    <div class="d-flex flex-wrap rounded-lg mt-5">
      <v-row>
        <v-card
            v-for="(report, index) in reports"
            class="ma-4 rounded-xl"
            max-width="344"
            :key="index"
        >
          <v-card-subtitle class="pb-0">
            <span v-text="report.mode"/> • Вопросов: <span v-text="report.q_count"/>
          </v-card-subtitle>
          <v-card-title v-text="report.name" class="mb-2 pt-2"/>
          <v-card-subtitle>
            <v-chip
                class="mr-2 mb-1"
                small
                :key="report.student"
                v-text="report.student"
            />
          </v-card-subtitle>
          <v-card-actions>
            <v-spacer/>
            <v-btn
                :to="'/reports/' + report.id"
                dark
                color="success"
                class="ma-2 mt-1 px-4 h4 rounded-lg"
                style="letter-spacing: 0.05em"
            >
              Открыть отчёт
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import LineChart from './Line.vue'
import {mapState} from "vuex";

export default {
  name: 'AdaptiveTesting',
  components: {

  },
  computed: {
    ...mapState('data', ['reports']),
  }
}
</script>

