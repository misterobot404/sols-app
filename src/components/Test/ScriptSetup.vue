<template>
  <!-- Выбор дисциплин / категорий / вопросов -->
  <v-row>
    <v-col cols="6">
      <v-treeview
          v-model="selection"
          :items="nodes"
          selectable
          selected-color="primary"
          selection-type="independent"
          open-on-click
          return-object
          transition
          item-key="index"
          item-disabled="locked"
      >
        <template v-slot:append="{ item }">
          <template v-if="item.children">
            <v-btn @click.stop="selectAllChildren(item)" icon>
              <v-icon>
                done_all
              </v-icon>
            </v-btn>
            <v-btn icon small class="ml-2" @click.stop="uncheckAllChildren(item)">
              <v-icon>
                remove_done
              </v-icon>
            </v-btn>
          </template>
        </template>
      </v-treeview>
    </v-col>
    <v-divider vertical/>
    <v-col cols="6" class="pl-8">
      <!-- Инструкция -->
      <template v-if="!pure_selection.length">
        <p class="font-italic text-decoration-underline">Инструкция</p>
        <p class="text-justify">
          Для формирования сценария тестирования необходимо выбрать дисциплины и(или) темы в динамическом дереве.
          На первом уровне дерева находятся дисциплины, а на втором - темы.
        </p>
        <p class="text-justify">
          При выборе дисциплины, будут использованы все темы, зарегистрированные для данной дисциплины.
          Для исключения из использования определённой темы зарегистрированной для дисциплины, добавьте все темы дисциплины, кроме той, которую необходимо исключить.
        <p/>
        <p class="mb-2 text-justify">По умолчанию сложность заданий для выбранных дисциплин и(или) тем установлена следующая:</p>
        <ul class="mb-4">
          <li>Лёгкие задания - 25%</li>
          <li>Средние задания - 50%</li>
          <li>Сложные задания - 25%</li>
        </ul>
        <p class="text-justify">При необходимости, для каждой выбранной дисциплины и темы можно настроить индивидуальную сложность.</p>
      </template>
      <!-- Выбранный сценарий -->
      <template v-else>
        <v-switch label="Тест по сценарию" v-model="script_enable"/>
        <div v-if="!script_enable" class="d-flex mb-8 align-center">
          <span class="mr-4">Общая сложность (в процентах):</span>
          <v-text-field style="width: 60px;" class="mx-2" outlined value="25" hide-details type="number"/>
          <v-text-field style="width: 60px;" class="mx-2" outlined value="50" hide-details type="number"/>
          <v-text-field style="width: 60px;" class="mx-2" outlined value="25" hide-details type="number"/>
        </div>
        <!-- Предметы -->
        <h3>Выбранные предметы:</h3>
        <div
            v-for="(node,i) in pure_selection.filter(node => !node.subject_id && !node.category_id)"
            :key="i"
            class="d-flex my-4 align-center"
        >
          <div class="mr-5">
            {{ node }}
          </div>
          <template v-if="!node.category_id && script_enable">
            <div style="width: 100%">
              <div>{{ 'Всего вопросов: ' + getCountOfTaskByNode(node).reduce((a, b) => a + b, 0) }}</div>
              <div class="d-flex mt-4">
                <v-text-field style="width: 60px;" class="mr-2" min="0" :max="getCountOfTaskByNode(node)[0]" label="Лёгкие" outlined
                              :value="getCountOfTaskByNode(node)[0]" hide-details type="number"/>
                <v-text-field style="width: 60px;" class="mr-2" min="0" :max="getCountOfTaskByNode(node)[1]" label="Средние" outlined
                              :value="getCountOfTaskByNode(node)[1]" hide-details type="number"/>
                <v-text-field style="width: 60px;" class="mr-2" min="0" :max="getCountOfTaskByNode(node)[2]" label="Сложные" outlined
                              :value="getCountOfTaskByNode(node)[2]" hide-details type="number"/>
              </div>
            </div>
          </template>
        </div>
        <!-- Темы -->
        <h3>Выбранные темы:</h3>
        <div
            v-for="(node,i) in pure_selection.filter(node => node.subject_id)"
            :key="i"
            class="d-flex my-4 align-center"
        >
          <div class="mr-5">
            {{ node }}
          </div>
          <template v-if="!node.category_id && script_enable">
            <div style="width: 100%">
              <div>{{ 'Всего вопросов: ' + getCountOfTaskByNode(node).reduce((a, b) => a + b, 0) }}</div>
              <div class="d-flex mt-4">
                <v-text-field style="width: 60px;" class="mr-2" min="0" :max="getCountOfTaskByNode(node)[0]" label="Лёгкие" outlined
                              :value="getCountOfTaskByNode(node)[0]" hide-details type="number"/>
                <v-text-field style="width: 60px;" class="mr-2" min="0" :max="getCountOfTaskByNode(node)[1]" label="Средние" outlined
                              :value="getCountOfTaskByNode(node)[1]" hide-details type="number"/>
                <v-text-field style="width: 60px;" class="mr-2" min="0" :max="getCountOfTaskByNode(node)[2]" label="Сложные" outlined
                              :value="getCountOfTaskByNode(node)[2]" hide-details type="number"/>
              </div>
            </div>
          </template>
        </div>
        <!-- Вопросы -->
        <!--        <h3>Выбранные вопросы:</h3>
                <div
                    v-for="(node,i) in pure_selection.filter(node => node.category_id)"
                    :key="i"
                    class="d-flex my-4 align-center"
                >
                  <div class="mr-5">
                    {{ node }}
                  </div>
                  <template v-if="!node.category_id && script_enable">
                    <div style="width: 100%">
                      <div>{{ 'Всего вопросов: ' + getCountOfTaskByNode(node).reduce((a, b) => a + b, 0) }}</div>
                      <div class="d-flex mt-4">
                        <v-text-field style="width: 60px;" class="mr-2" min="0" :max="getCountOfTaskByNode(node)[0]" label="Лёгкие" outlined
                                      :value="getCountOfTaskByNode(node)[0]" hide-details type="number"/>
                        <v-text-field style="width: 60px;" class="mr-2" min="0" :max="getCountOfTaskByNode(node)[1]" label="Средние" outlined
                                      :value="getCountOfTaskByNode(node)[1]" hide-details type="number"/>
                        <v-text-field style="width: 60px;" class="mr-2" min="0" :max="getCountOfTaskByNode(node)[2]" label="Сложные" outlined
                                      :value="getCountOfTaskByNode(node)[2]" hide-details type="number"/>
                      </div>
                    </div>
                  </template>
                </div>-->

        <div class="d-flex justify-center">
          <v-btn @click="selection = []" rounded class="mt-4">Очистить выбор</v-btn>
        </div>
      </template>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "SelectTestTasks",
  props: {
    attached_subjects: {
      type: Array,
      required: true
    },
    attached_categories: {
      type: Array,
      required: true
    },
  },
  data() {
    return {
      script_enable: false,
      selection: [],
      nodes: [
        {
          index: 1,
          id: 1,
          name: 'Предмет 1',
          children: [
            {
              index: 2,
              id: 1,
              subject_id: 1,
              name: 'Тема 1',
              locked: false,
              children: []
            },
            {
              index: 3,
              id: 2,
              subject_id: 1,
              name: 'Тема 2',
              locked: false,
              children: [
                {
                  index: 4,
                  id: 4,
                  category_id: 2,
                  name: 'Вопрос 1',
                  lvl: "easy",
                  locked: false,
                },
                {
                  index: 5,
                  id: 5,
                  category_id: 2,
                  name: 'Вопрос 2',
                  lvl: "normal",
                  locked: false,
                },
              ]
            },
            {
              index: 6,
              id: 3,
              subject_id: 1,
              name: 'Тема 3',
              locked: false,
              children: [
                {
                  index: 7,
                  id: 7,
                  category_id: 3,
                  name: 'Вопрос 1',
                  lvl: "hard",
                  locked: false,
                },
                {
                  index: 8,
                  id: 8,
                  category_id: 3,
                  name: 'Вопрос 2',
                  lvl: "easy",
                  locked: false,
                },
              ],
            },
          ],
        },
        {
          index: 9,
          id: 2,
          name: 'Предмет 2',
          children: [
            {
              index: 10,
              id: 4,
              subject_id: 2,
              name: 'Тема 1',
              locked: false,
              children: [
                {
                  index: 11,
                  id: 11,
                  category_id: 4,
                  name: 'Вопрос 1',
                  lvl: "easy",
                  locked: false,
                },
                {
                  index: 12,
                  id: 12,
                  category_id: 4,
                  name: 'Вопрос 2',
                  lvl: "normal",
                  locked: false,
                },
              ]
            },
          ],
        },
        {
          index: 13,
          id: 3,
          name: 'Предмет 3',
          children: []
        },
      ],
    }
  },
  computed: {
    pure_selection() {
      // Включаем всё отключенные ранее ноды
      this.enableAllNodes();

      let pure = [];
      let copy = JSON.parse(JSON.stringify(this.selection));

      // Массив выбранных нод
      copy.forEach(selected_node => {
        // Текущая нода - предмет
        if (!selected_node.subject_id && !selected_node.category_id) {
          // Деактивируем и выключаем все дочерние темы и вопросы
          let subject = this.nodes.find(node => node.id === selected_node.id);
          this.uncheckAllChildren(subject);

          subject.children.forEach(category => {
            category.children.forEach(task => task.locked = true)
            // Деактивируем категорию и дочерние вопросы
            category.locked = true;
            this.uncheckAllChildren(category);
          })
          pure.push(selected_node);
        }
        // Текущая нода - тема
        else if (selected_node.subject_id) {
          let category = this.getCategoryById(selected_node.id);
          category.children.forEach(task => task.locked = true)
          // Деактивируем дочерние вопросы
          this.uncheckAllChildren(category);
          pure.push(selected_node);
        }
        // Текущая нода - вопрос
        else if (selected_node.category_id) pure.push(selected_node);
      });

      // Удаляем не нужные поля
      pure = pure.map(node => {
        delete node['index'];
        delete node['children'];
        delete node['locked'];
        return node;
      });

      // Фильтруем вложенные элементы
      pure = pure.filter(node => {
        // Текущая нода - тема
        if (!node.subject_id && !node.category_id) {
          return true;
        }
        // Текущая нода - тема
        if (node.subject_id) {
          // Получаем родителя (предмет)
          let subject = this.nodes.find(el => el.id === node.subject_id);
          // Выбран ли родитель (предмет)
          let parent_selected = this.selection.find(el => JSON.stringify(el) === JSON.stringify(subject));

          return !parent_selected;
        }
        // Текущая нода - вопрос
        else if (node.category_id) {
          // Получаем родителя (тема)
          let category = this.getCategoryById(node.category_id);
          // Выбран ли родитель (тема)
          let parent_selected = this.selection.find(el => JSON.stringify(el) === JSON.stringify(category));

          return !parent_selected;
        }
      });

      return pure;
    }
  },
  methods: {
    getCategoryById(id) {
      for (const subject of this.nodes) {
        let el = subject.children.find(el => el.id === id);
        if (el) return el;
      }
    },
    enableAllNodes() {
      // Массив выбранных нод
      this.nodes.forEach(subject => {
        subject.children.forEach(category => {
          category.locked = false;
          category.children.forEach(task => task.locked = false)
        })
      });
    },
    selectAllChildren(node) {
      // Текущая нода - предмет
      if (!node.subject_id && !node.category_id) {
        node.children.forEach(category => {
          // Проверяем, есть ли эта категория в выбранных
          if (!this.selection.find(el => JSON.stringify(el) === JSON.stringify(category))) {
            // Выбираем категорию
            this.selection.push(category);
          }
        })
      }
      // Текущая нода - тема
      else if (node.subject_id) {
        // Перебираем вопросы внутри темы
        node.children.forEach(task => {
          // Проверяем, есть ли этот вопрос уже в выбранных
          if (!this.selection.find(el => JSON.stringify(el) === JSON.stringify(task))) {
            // Выбираем вопрос
            this.selection.push(task);
          }
        })
      }
    },
    uncheckAllChildren(node) {
      // Текущая нода - предмет
      if (!node.subject_id && !node.category_id) {
        node.children.forEach(category => {
          // Проверяем, есть ли эта категория в выбранных
          if (this.selection.find(el => JSON.stringify(el) === JSON.stringify(category))) {
            // Исключаем категорию из выбранных
            this.selection = this.selection.filter(item => JSON.stringify(item) !== JSON.stringify(category))
          }
        })
      }
      // Текущая нода - тема
      else if (node.subject_id) {
        // Перебираем вопросы внутри темы
        node.children.forEach(task => {
          // Проверяем, есть ли этот вопрос уже в выбранных
          if (this.selection.find(el => JSON.stringify(el) === JSON.stringify(task))) {
            // Исключаем вопрос из выбранных
            this.selection = this.selection.filter(item => JSON.stringify(item) !== JSON.stringify(task))
          }
        })
      }
    },
    getCountOfTaskByNode(node) {
      let count = [0, 0, 0];
      // Нода - предмет
      if (!node.subject_id && !node.category_id) {
        let subject = this.nodes.find(subject => subject.id === node.id);
        subject.children.forEach(category => {
          category.children.forEach(task => {
            switch (task.lvl) {
              case 'easy':
                count[0]++;
                break;
              case 'normal':
                count[1]++;
                break;
              case 'hard':
                count[2]++;
                break;
            }
          })
        })
      }
      // Нода - тема
      else if (node.subject_id) {
        let category = this.getCategoryById(node.id);
        category.children.forEach(task => {
          switch (task.lvl) {
            case 'easy':
              count[0]++;
              break;
            case 'normal':
              count[1]++;
              break;
            case 'hard':
              count[2]++;
              break;
          }
        })
      }
      return count;
    }
  },
}
</script>

<style scoped>

</style>