<template>
  <v-navigation-drawer
      :width="$vuetify.breakpoint.lgAndDown ? 280 : 320"
      permanent
      :mini-variant="$vuetify.breakpoint.smAndDown"
      mini-variant-width="70"
      app
  >
    <v-list-item class="mt-8 mt-xl-12 text-center d-none d-md-block">
      <router-link to="/teacher" class="mx-auto">
        <v-list-item-content>
          <v-list-item-title class="primary--text h1">SOLS</v-list-item-title>
          <v-list-item-subtitle class="p-14-regular primary--text">для студентов</v-list-item-subtitle>
        </v-list-item-content>
      </router-link>
    </v-list-item>
    <div class="pt-xl-3 px-4 px-md-9">
      <router-link
          v-for="link in links"
          :key="link.title"
          class="d-flex my-11 navbar-link"
          active-class="navbar-active-link"
          exact
          :to="link.url"
      >
        <v-icon x-large class="material-icons" v-text="link.icon"/>
        <h2 class="my-auto pt-1" style="margin-left: 14px" v-text="link.title"/>
      </router-link>
      <div class="d-flex my-11 navbar-link cursor-pointer" @click="this['auth/LOGOUT']">
        <v-icon x-large>logout</v-icon>
        <h2 class="my-auto navbar pt-1" style="margin-left: 14px">Выход</h2>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script>
import {mapMutations} from 'vuex'

export default {
  name: "NavigationStudent",
  data() {
    return {
      links: [
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
  methods: {
    ...mapMutations(['auth/LOGOUT'])
  }
}
</script>
