<template>
  <div class="px-4 px-xl-8 py-3 py-xl-6">
    <!-- Body -->
    <v-card width="100%" class="rounded-lg">
      <v-card-title class="primary white--text">
        <template v-if="!selected_group">
          <v-icon large color="white" class="material-icons mr-2" v-text="'groups'"/>
          Учебные группы
        </template>
        <template v-else-if="!user_info">
          <v-btn class="mr-1" icon dark @click="selected_group=null">
            <v-icon>chevron_left</v-icon>
          </v-btn>
          {{ selected_group.Аббревиатура }}
        </template>
        <template v-else>
          <v-btn class="mr-1" icon dark @click="user_info=null">
            <v-icon>chevron_left</v-icon>
          </v-btn>
          {{ selected_group.Аббревиатура + ' ' + user_info.Фамилия + ' ' + user_info.Имя }}
        </template>

        <v-spacer/>
        <v-select
            :items="faculties"
            v-model="selected_faculty"
            :item-text="'Факультет'"
            label="Факультет"
            style="max-width: 300px"
            dark
            filled
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
            dark
            filled
            dense
            single-line
            hide-details
        />
        <v-text-field
            v-model="search"
            append-icon="search"
            label="Поиск..."
            filled
            dark
            class="ml-4"
            style="max-width: 300px"
            dense
            single-line
            hide-details
        />
      </v-card-title>
      <v-data-table
          v-if="!selected_group"
          :headers="group_headers"
          :items="groups"
          :search="search"
          :sort-by="'КоличествоСтудентов'"
          :sort-desc="true"
          :loading="loading"
          :footer-props="{'items-per-page-text':'Количество строк:'}"
          loader-height="2"
          no-data-text="Выберите факультет и кафедру"
          no-results-text="Группа не найдена"
          :items-per-page="15"
          class="row-pointer"
          @click:row="(v) => getStudents(v)"
      >
        <template v-slot:item.Успеваемость="{ item }">
          <v-chip color="gray">{{ Math.round(Math.random() * 100) }}</v-chip>
        </template>
      </v-data-table>
      <v-data-table
          v-else-if="!user_info"
          :headers="student_headers"
          :items="students"
          :search="search"
          :footer-props="{'items-per-page-text':'Количество строк:'}"
          loader-height="2"
          :items-per-page="15"
          class="row-pointer"
          @click:row="(v) => getUserInfo(v)"
      >
        <template v-slot:item.Успеваемость="{ item }">
          <v-chip color="gray">{{ Math.round(Math.random() * 100) }}</v-chip>
        </template>
      </v-data-table>
      <v-container v-else>
        Аналитика по пользователю {{user_info}} <br>
        Пройденные тесты. <br>
        Успеваемость. <br>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import {mapState} from "vuex";
import axios from "axios";

export default {
  name: "Groups",
  data() {
    return {
      search: "",
      loading: false,
      // Факультеты
      faculties: [],
      selected_faculty: null,
      // Кафедры
      departments: [],
      selected_department: null,
      // Группы
      groups: [],
      selected_group: null,
      // Студенты
      students: null,
      // Данные для таблицы групп
      group_headers: [
        {text: 'Аббревиатура', value: 'Аббревиатура',},
        {text: 'Количество студентов', align: 'center', value: 'КоличествоСтудентов'},
        {text: 'Общая успеваемость', align: 'center', value: 'Успеваемость'}
      ],
      // Данные для таблицы групп
      student_headers: [
        {text: 'Фамилия', value: 'Фамилия',},
        {text: 'Имя', value: 'Имя'},
        {text: 'Отчество', value: 'Отчество'},
        {text: 'Успеваемость', align: 'center', value: 'Успеваемость'}
      ],
      // Данные по студенту
      user_info: null
    }
  },
  computed: {
    ...mapState('data', ['host'])
  },
  watch: {
    selected_faculty(faculty) {
      this.selected_department = null;
      this.selected_group = null;
      this.user_info = null;
      this.getDepartments(faculty);
    },
    selected_department(department) {
      if (department) {
        this.groups = [];
        this.user_info = null;
        this.selected_group = null;
        this.getGroups(department);
      } else this.groups = [];
    },
    selected_group(group) {
      if (group)
        this.getStudents(group);
      else if(!this.selected_department) this.groups = [];
    },
  },
  methods: {
    getFaculties() {
      this.students = null
      axios.get(this.host + '/api/faculties').then(response => {
        this.faculties = response.data;
      })
    },
    getDepartments(faculty) {
      this.students = null
      axios.get(this.host + '/api/departments', {
        params: {
          faculty: faculty
        }
      }).then(response => {
        this.departments = response.data;
      })
    },
    getGroups(department) {
      this.loading = true;
      this.students = null
      axios.get(this.host + '/api/groups', {
        params: {
          department: department
        }
      }).then(response => {
        this.loading = false;
        this.groups = response.data;
      })
    },
    getStudents(group) {
      this.loading = true;
      axios.get(this.host + '/api/students', {
        params: {
          group: group.uid
        }
      }).then(response => {
        this.loading = false;
        this.students = response.data.СписокСтудентов;
        this.selected_group = group;
      })
    },
    getUserInfo(user) {
      this.user_info = user;
    }
  },
  beforeMount() {
    this.getFaculties();
  }
}
</script>

<style scoped>
.row-pointer >>> tbody tr :hover {
  cursor: pointer;
}
</style>