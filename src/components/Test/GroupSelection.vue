<template>
  <v-card class="rounded-lg" outlined>
    <v-card-title>
      <v-icon large class="material-icons mr-2" v-text="'groups'"/>
      Учебные группы
      <v-spacer/>
      <v-select
          outlined
          :items="faculties"
          v-model="selected_faculty"
          :item-text="'Факультет'"
          label="Факультет"
          style="max-width: 300px"
          dense
          single-line
          hide-details
      />
      <v-select
          :items="departments"
          v-model="selected_department"
          :item-text="'Кафедра'"
          label="Кафедра"
          class="ml-4"
          no-data-text="Выберите факультет"
          style="max-width: 300px"
          dense
          outlined
          single-line
          hide-details
      />
    </v-card-title>
    <v-divider/>
    <v-data-table
        :headers="group_headers"
        :items="groups"
        :loading="group_loading"
        :sort-by="'КоличествоСтудентов'"
        :sort-desc="true"
        :footer-props="{'items-per-page-text':'Количество строк:'}"
        loader-height="2"
        no-data-text="Выберите факультет и кафедру"
        :items-per-page="10"
    >
      <template v-slot:item.action="{ item }">
        <v-btn v-if="!attach_groups.includes(item.Аббревиатура)" @click="attach_groups.push(item.Аббревиатура)" icon>
          <v-icon>add</v-icon>
        </v-btn>
        <v-btn v-else @click="attach_groups.splice(attach_groups.findIndex(el => el === item.Аббревиатура), 1)" icon>
          <v-icon>done</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import {mapState} from "vuex";
import axios from "axios";

export default {
  name: "GroupSelection",
  props: {
    attach_groups: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      // Факультеты
      faculties: [],
      selected_faculty: null,
      // Кафедры
      departments: [],
      selected_department: null,
      // Группы
      group_loading: false,
      group_headers: [
        {text: 'Аббревиатура', value: 'Аббревиатура',},
        {text: 'Количество студентов', align: 'center', value: 'КоличествоСтудентов'},
        {text: 'Прикрепить к тесту', align: 'center', value: 'action', sortable: false}
      ],
      groups: [],
    }
  },
  computed: {
    ...mapState('data', ['host'])
  },
  watch: {
    // При выборе факультета, получаем кафедры
    selected_faculty(faculty) {
      this.selected_department = null;
      this.getDepartments(faculty);
    },
    // При выборе кафедр, получаем группы
    selected_department(department) {
      if (department) {
        this.groups = [];
        this.getGroups(department);
      } else this.groups = [];
    }
  },
  methods: {
    getFaculties() {
      axios.get(this.host + '/api/faculties').then(response => {
        this.faculties = response.data.data;
      })
    },
    getDepartments(faculty) {
      axios.get(this.host + '/api/departments', {
        params: {
          faculty: faculty
        }
      }).then(response => {
        this.departments = response.data.data;
      })
    },
    getGroups(department) {
      this.group_loading = true;
      axios.get(this.host + '/api/groups', {
        params: {
          department: department
        }
      }).then(response => {
        this.group_loading = false;
        this.groups = response.data.data;
      })
    },
  },
  beforeMount() {
    // При загрузке компонента получаем факультеты
    this.getFaculties();
  }
}
</script>