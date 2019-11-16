<template>
  <v-form id="addToList">
    <v-container fluid>
      <v-layout align-center justify-center row fill-height>
        <v-flex xs12 sm6 md3 mx-2>
          <v-text-field
              label="Box"
              placeholder="Placeholder"
              box
              v-model="item"
            ></v-text-field>
        </v-flex>
        <v-flex xs12 sm3 md3  mx-2>
            <v-btn
            @click="add"
            dark
            color="#BD4568">+ Add item</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import {
  Component, Prop, Watch, Vue,
} from 'vue-property-decorator';

@Component
export default class AddToList extends Vue {
  list: Array<string> = [];

  item: string = '';

  add() {
    this.list.push(this.item);
    // add to list
  }
}
</script>
