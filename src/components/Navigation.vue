<template>
  <!-- Desktop  -->
  <v-navigation-drawer
      v-if="$vuetify.breakpoint.smAndUp"
      :width="$vuetify.breakpoint.lgAndUp ? 320 : 210"
      permanent
      class="px-4 px-lg-8"
      app
  >
    <!-- Лого сайта -->
    <v-list-item class="text-center mt-8">
      <router-link :to="'/' + user.role" class="mx-auto">
        <v-list-item-content>
          <v-list-item-title class="primary--text"><h1 class="text-h3">SOLS</h1></v-list-item-title>
          <v-list-item-subtitle v-if="user.role === 'teacher'" class="primary--text">для преподавателей</v-list-item-subtitle>
          <v-list-item-subtitle v-else-if="user.role === 'student'" class="primary--text">для студентов</v-list-item-subtitle>
        </v-list-item-content>
      </router-link>
    </v-list-item>
    <!-- Панель пользователя -->
    <v-divider class="mt-6"/>
    <v-list-item class="text-center mt-6 d-block">
      <img :src="require('@/assets/avatar.png')" alt="avatar"/>
      <div class="d-flex justify-center">
        <h4 v-text="user.login"/>
        <v-btn icon small @click="this['auth/logout']" style="margin-left: 4px; padding-bottom: 1px">
          <v-icon small>logout</v-icon>
        </v-btn>
      </div>
      <v-list-item-subtitle class="font-f-nunito">
        {{ user.role === "teacher" ? 'Преподаватель' : user.role === "student" ? 'Студент' : null }}
      </v-list-item-subtitle>
    </v-list-item>
    <v-divider class="mt-6"/>
    <!-- Навигация -->
    <ul class="pl-0">
      <router-link
          v-for="route in user.role === 'teacher' ? teacher_links : user.role === 'student' ? student_links : []"
          :key="route.title"
          tag="li"
          class="d-flex my-6 my-lg-9 navbar-link"
          active-class="navbar-active-link"
          :to="route.url"
      >
        <v-icon x-large class="material-icons" v-text="route.icon"/>
        <h2 class="my-auto pt-1" style="margin-left: 14px" v-text="route.title"/>
      </router-link>
    </ul>
  </v-navigation-drawer>
  <!-- Mobile  -->
  <v-bottom-navigation
      v-else
      fixed
      background-color="#f5f5f5"
      height="62"
      grow
  >
    <v-btn
        v-for="link in user.role === 'teacher' ? teacher_links : user.role === 'student' ? student_links : []"
        :key="link.title"
        :to="link.url"
        class="navbar-link px-2"
        active-class="navbar-active-link"
        height="100%"
    >
      <span style="display: block;width: 100px; white-space: normal; text-align: center" v-text="link.title"/>
      <v-icon v-text="link.icon"/>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
  name: "Navigation",
  data() {
    return {
      teacher_links: [
        {
          url: "/teacher/home",
          title: 'Рабочая область',
          icon: 'home'
        },
        {
          url: "/teacher/tests",
          title: 'Список тестов',
          icon: 'article'
        },
        {
          url: "/teacher/tasks",
          title: 'База заданий',
          icon: 'task_alt'
        },
        {
          url: "/teacher/groups",
          title: 'Учебные группы',
          icon: 'groups'
        }
      ],
      student_links: [
        {
          url: "/student/tests",
          title: 'Тесты',
          icon: 'article'
        },
        {
          url: "/student/results",
          title: 'Результаты',
          icon: 'task_alt',
        }
      ],
    }
  },
  computed: {
    ...mapState({user: state => state.auth.user}),
  },
  methods: {
    ...mapActions(['auth/logout'])
  }
}
</script>

<style scoped>
/* Navbar */
.navbar-active-link h2, .navbar-active-link span {
  color: #1976D3 !important;
}

.navbar-active-link .material-icons {
  color: #1976D3 !important;
}

.navbar-link {
  color: rgba(0, 0, 0, 0.52) !important;
  transition: color 0.18s cubic-bezier(0.25, 0.8, 0.5, 1), visibility 0s;
  cursor: pointer;
  user-select: none;
}

.navbar-link:hover {
  color: rgba(0, 0, 0, 0.68) !important;
}

.navbar-link:hover .material-icons {
  color: rgba(0, 0, 0, 0.68);
}
</style>

