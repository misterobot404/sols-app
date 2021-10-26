<template>
  <v-navigation-drawer
      :width="$vuetify.breakpoint.lgAndDown ? 280 : 320"
      style="min-height: 100%"
      permanent
      :mini-variant="$vuetify.breakpoint.smAndDown"
      mini-variant-width="70"
      app
  >
    <!-- Лого сайта -->
    <v-list-item class="text-center mt-6 d-none d-md-block">
      <router-link :to="'/' + user.role" class="mx-auto">
        <v-list-item-content>
          <v-list-item-title class="primary--text h1">SOLS</v-list-item-title>
          <v-list-item-subtitle v-if="user.role === 'teacher'" class="p-14-regular primary--text">для преподавателей</v-list-item-subtitle>
          <v-list-item-subtitle v-else-if="user.role === 'student'" class="p-14-regular primary--text">для студентов</v-list-item-subtitle>
        </v-list-item-content>
      </router-link>
    </v-list-item>
    <!-- Панель пользователя -->
    <v-divider class="mt-6"/>
    <v-list-item class="text-center mt-6 d-none d-md-block">
      <div>
        <img :src="require('@/assets/avatar.png')" alt="avatar"/>
        <h4 v-text="user.login"/>
        <v-list-item-subtitle class="mt-1">
          {{ user.role === "teacher" ? 'Преподаватель' : user.role === "student" ? 'Студент' : null }}
        </v-list-item-subtitle>
        <v-btn text small @click="this['auth/LOGOUT']" style="text-transform: none; margin-top: 4px">Выход</v-btn>
      </div>
    </v-list-item>
    <v-divider class="mt-4"/>
    <!-- Навигация -->
    <div class="px-4 px-md-9">
      <router-link
          v-for="link in user.role === 'teacher' ? teacher_links : user.role === 'student' ? student_links : []"
          :key="link.title"
          class="d-flex my-9 navbar-link"
          active-class="navbar-active-link"
          :to="{name: link.name}"
      >
        <v-icon x-large class="material-icons" v-text="link.icon"/>
        <h2 class="my-auto pt-1" style="margin-left: 14px" v-text="link.title"/>
      </router-link>
      <!-- Костыль. Link only for TEACHER -->
      <router-link
          v-if="user.role === 'teacher'"
          class="d-flex my-11 navbar-link"
          style="opacity: 0.5"
          active-class="navbar-active-link"
          to="/teacher/groups"
          :disabled="true"
          :event="''"
      >
        <v-icon x-large class="material-icons">groups</v-icon>
        <h2 class="my-auto pt-1" style="margin-left: 14px">Учебные группы</h2>
      </router-link>
    </div>
  </v-navigation-drawer>
</template>

<script>
import {mapMutations, mapState} from 'vuex'

export default {
  name: "Navigation",
  data() {
    return {
      teacher_links: [
        {
          name: "TeacherHome",
          title: 'Рабочая область',
          icon: 'home'
        },
        {
          name: "Tests",
          title: 'Список тестов',
          icon: 'receipt_long',
        },
        {
          name: "BaseOfQuestions",
          title: 'База вопросов',
          icon: 'folder_open',
        }
      ],
      student_links: [
        {
          url: "/student/home",
          title: 'Домашняя',
          icon: 'portrait'
        },
        {
          url: "/student/answers",
          title: 'Мои ответы',
          icon: 'done_all',
        }
      ],
    }
  },
  computed: {
    ...mapState({
      user: state => state.auth.user
    }),
  },
  methods: {
    ...mapMutations(['auth/LOGOUT'])
  }
}
</script>

<style scoped>
/* Navbar */
.navbar-active-link h2 {
  color: #1976D3 !important;
}

.navbar-active-link .material-icons {
  color: #1976D3 !important;
}

.navbar-link {
  color: rgba(0, 0, 0, 0.52) !important;
  transition: color 0.18s cubic-bezier(0.25, 0.8, 0.5, 1), visibility 0s;
}

.navbar-link:hover {
  color: rgba(0, 0, 0, 0.68) !important;
}

.navbar-link:hover .material-icons {
  color: rgba(0, 0, 0, 0.68);
}
</style>

