<template>
  <v-list-item>
    <v-list-item-content>
      <v-list-item-title>{{item.description}}</v-list-item-title>
    </v-list-item-content>
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
}
</script>
