<template>
  <v-container class="mt-6 mx-4">
    <v-row>
      <v-col cols="11" align-self="center">
        <h1 class="primary--text text-center text-sm-start">Отчёт</h1>
        <hr class="my-3">
        <div class="d-flex justify-space-between">
          <div>
            <h3>Предмет: <span v-text="report.name"/></h3>
            <h3>Студент: <span v-text="report.student"/></h3>
            <h3>Время: <span v-text="report.created_at.toLocaleString()"/></h3>
          </div>
          <div>
            <h3>Количество вопросов: <span v-text="report.q_count"/></h3>
            <h3>Затраченное время: <span v-text="report.time_rem_minut + ' минут'"/></h3>
          </div>
        </div>
      </v-col>
    </v-row>
    <LineChart styles="width: 100%; height: 500px" :chart-data="report.chartData"/>
    <div class="text-center mt-6">
      <h2 class="primary--text text-decoration-underline">Результат: <span v-text="report.result"/></h2>
    </div>
  </v-container>
</template>

<script>
import LineChart from './Line.vue'
import {mapState} from "vuex";

export default {
  name: 'AdaptiveTesting',
  components: {
    LineChart
  },
  computed: {
    ...mapState('data', ['reports']),
    report() {
      return this.reports.find((report) => report.id === Number(this.$route.params.id));
    }
  },
  methods: {
  },
  watch: {
  },
  mounted() {

  }
}
</script>

