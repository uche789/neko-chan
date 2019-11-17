<template>
  <v-container fluid>
    <v-layout align-center justify-center row fill-height>
      <v-flex xs12 sm5 md4 mx-2>
        <v-text-field
            label="Todo item"
            placeholder="Description..."
            v-model="item"
            maxlength="100"
          ></v-text-field>
      </v-flex>
      <v-flex xs12 sm2 md2 text-center>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn
            @click="addItem"
            v-on="on"
            dark
            color="#BD4568">+ Add item</v-btn>
          </template>
          <span>You can add 50 items!</span>
      </v-tooltip>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapState } from 'vuex';
import { ToDoState } from '@/store/modules/todo';

export default Vue.extend({
  data: () => ({
    item: '',
  }),
  computed: {
    ...mapState('todo', {
      loading: state => (state as ToDoState).loading,
      error: state => (state as ToDoState).error,
    }),
  },
  watch: {
    loading(newValue, oldValue) {
      if (this.error) {
        return;
      }

      if (newValue === false && oldValue === true) {
        this.item = '';
      }
    },
  },
  methods: {
    ...mapActions('todo', [
      'add',
    ]),
    addItem() {
      if (!this.item) {
        return;
      }

      this.add({ description: this.item });
    },
  },
});
</script>
