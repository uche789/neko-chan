<template>
  <v-container>
    <v-layout row>
      <v-card
      width="100%"
      max-width="600"
      class="mx-auto"
      tile
      flat
      >

       <v-toolbar
        color="#BD4568"
        dark
      >
        <v-toolbar-title>Today's list</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon v-if="hasItemsToDelete" @click="deleteItems">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-toolbar>
      <v-list three-line>
        <template v-for="item in todos">
          <Item
            :item="item"
            :key="item.id"
            @toggle-selected="UpdateToDeleteList"
          />
        </template>
      </v-list>
      <v-card-text v-if="noTodos" class="text-center">
          You have no todos at the moment.
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

  toDeleteList: Array<string> = [];

  @Watch('$store.state.todo.list')
  onListChange(value: Array<ToDo>) {
    this.todos = value;
  }

  get noTodos() {
    return this.todos.length === 0;
  }

  get hasItemsToDelete() {
    return this.toDeleteList.length > 0;
  }

  mounted() {
    this.$store.dispatch('todo/fetch');
  }

  UpdateToDeleteList(item: any) {
    if (item.isSelected) {
      this.toDeleteList.push(item.id);
    } else {
      const index = this.toDeleteList.indexOf(item.id);
      this.toDeleteList.splice(index, 1);
    }
  }

  deleteItems() {
    this.$store.dispatch('todo/remove', this.toDeleteList);
  }
}
</script>
