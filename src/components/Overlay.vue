<template>
  <v-overlay :value="loading">
    <v-progress-circular indeterminate size="64"></v-progress-circular>
  </v-overlay>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import { ToDoState } from '@/store/modules/todo';

export default Vue.extend({
  computed: {
    ...mapState('todo', {
      loading: state => (state as ToDoState).loading,
    }),
  },
});
</script>
