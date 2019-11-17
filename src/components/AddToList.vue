<template>
  <v-form id="addToList">
    <v-container fluid>
      <v-layout align-center justify-center row fill-height>
        <v-flex xs12 sm5 md4 mx-2>
          <v-text-field
              label="Todo item"
              placeholder="Description..."
              v-model="item"
            ></v-text-field>
        </v-flex>
        <v-flex xs12 sm2 md1 text-center>
            <v-btn
            @click="addItem"
            dark
            color="#BD4568">+ Add item</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
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
      this.add({ description: this.item });
    },
  },
});
</script>
