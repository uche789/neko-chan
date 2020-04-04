<template>
  <v-list-item>
    <v-list-item-action class="mr-3">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn elevation="0" color="transparent" icon @click="itemCompleted">
            <v-img :src="require('../assets/idea.svg')"
              max-width="30"
              v-on="on"
              v-if="!item.done"/>
            <v-img :src="require('../assets/idea-highlighted.svg')"
              max-width="30"
              v-on="on"
              v-if="item.done"/>
          </v-btn>
        </template>
        <span v-if="!item.done">Mark as done</span>
        <span v-if="item.done">Unmark</span>
      </v-tooltip>
    </v-list-item-action>
    <v-list-item-content>
      <v-list-item-subtitle
        :class="[{'is-strikethrough': item.done, 'font-italic': item.done}]"
      >
        {{item.description}}
      </v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action>
    <v-checkbox
      color="#BD4568"
      v-model="active"
      :value="item.id"
    ></v-checkbox>
  </v-list-item-action>
  </v-list-item>
</template>

<script lang="ts">
import {
  Component, Prop, Watch, Vue,
} from 'vue-property-decorator';
import { ToDo } from '@/api/todo';

@Component
export default class Item extends Vue {
  @Prop() private item!: ToDo;

  active: Array<string> = [];

  get hasActive() {
    return this.active.length > 0;
  }

  @Watch('active')
  onActiveChanged() {
    this.$emit('toggle-selected', {
      isSelected: this.hasActive,
      id: this.item.id,
    });
  }

  itemCompleted() {
    this.$store.dispatch('todo/update', { id: this.item.id, done: !this.item.done });
  }
}
</script>

<style lang="scss">
.is-strikethrough {
  text-decoration: line-through;
}
</style>
