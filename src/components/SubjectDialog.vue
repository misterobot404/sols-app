<template>
  <v-dialog
      max-width="380"
      v-model="m_show"
      overlay-opacity="0.1"
      persistent
  >
    <v-card>
      <!-- Шапка -->
      <v-toolbar
          height="64"
          flat
          class="pr-1"
      >
        <v-icon color="primary" class="mr-1 pb-1">{{ mode === 'create' ? "library_add" : "edit" }}</v-icon>
        <v-toolbar-title class="ml-1" v-text="mode === 'create' ? 'Добавление дисциплины' : 'Изменение дисциплины'"/>
        <v-spacer/>
        <v-btn
            icon
            @click="$emit('update:show', false)"
        >
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-divider/>
      <!-- Содержание -->
      <div class="pa-6 pt-3">
        <v-form ref="form">
          <v-text-field
              v-if="mode=== 'edit' && old_subject"
              v-model="old_subject.name"
              label="Старое название"
              disabled
              required
          />
          <v-text-field
              v-model="new_subject.name"
              autofocus
              autocomplete="off"
              :label="mode === 'edit' ? 'Новое название' : 'Название'"
              hide-details
              required
          />
        </v-form>
      </div>
      <!-- Действия -->
      <v-card-actions class="px-6 pb-4">
        <v-spacer/>
        <v-btn
            class="px-4 mr-1"
            text
            style="text-transform: none; background-color: rgba(0, 0, 0, 0.06)"
            @click="$emit('update:show', false)"
        >
          Отмена
        </v-btn>
        <v-btn
            class="px-4"
            color="primary"
            text
            style="text-transform: none;"
            :style="new_subject.name.trim() ? 'background-color: rgba(25, 118, 211, 0.1)' : 'background-color: rgba(0, 0, 0, 0.06)'"
            :loading="loading"
            :disabled="!new_subject.name.trim()"
            @click="mode === 'create' ? lCreateSubject() : lUpdateSubject()"
        >
          Подтвердить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapActions, mapMutations, mapGetters} from 'vuex'

export default {
  name: "SubjectDialog",
  props: ["show", "subject_id"],
  data() {
    return {
      mode: null,
      loading: false,
      old_subject: null,
      new_subject: {
        name: ""
      }
    }
  },
  computed: {
    ...mapGetters('data', ['getSubjectById']),
    m_show: {
      get() {
        return this.show === 'subject'
      },
      set(v) {
        this.$emit('update:show', v);
      },
    }
  },
  watch: {
    show: {
      handler(val) {
        if (val) {
          if (this.subject_id) {
            this.old_subject = this.getSubjectById(this.subject_id);
            Object.assign(this.new_subject, this.old_subject);
            this.mode = "edit";
          } else this.mode = "create"
        } else this.clear();
      },
      immediate: true
    }
  },
  methods: {
    ...mapMutations('layout', ['SHOW_ERROR_MSG_DIALOG']),
    ...mapActions('data', ['createSubject', 'updateSubject']),
    lCreateSubject() {
      if (this.$refs.form.validate()) {
        this.createSubject(this.new_subject)
        this.$emit('update:show', false);
      }
    },
    lUpdateSubject() {
      if (this.$refs.form.validate()) {
        this.updateSubject(this.new_subject);
        this.$emit('update:show', false);
      }
    },
    clear() {
      this.subject = {
        name: ""
      }
    }
  }
}
</script>
