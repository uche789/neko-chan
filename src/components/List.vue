<template>
  <v-container>
    <v-layout row>
      <v-card
      class="mx-auto"
      tile
      >

      <template v-for="item in todos">
        <Item :item="item" :key="item.id"></Item>
      </template>
      <v-card-text v-if="">

          </v-card-text>
      </v-card>
  </v-layout>
  </v-container>
</template>

<script lang="ts">
import {
  Component, Prop, Watch, Vue,
} from 'vue-property-decorator';
import { ToDo } from '@/api/todo';
import Item from '@/components/Item.vue';

@Component({
  components: {
    Item,
  },
})
export default class List extends Vue {
  todos: Array<ToDo> = [];

  @Watch('$store.state.todo.list')
  onListChange(value: Array<ToDo>) {
    this.todos = value;
  }

  get todosCount() {

  }
}
</script>
