<template>
  <v-dialog
        v-model="show"
        max-width="300px"
      >
    <v-card>
      <v-list-item>
        <v-list-item-avatar>
          <v-img
            contain
            :src="require('../assets/kitty_sad.svg')"
            ></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="headline">Error</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-card-text>
        {{errorMessage}}
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="primary"
          text
          @click="resetError"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState, mapActions } from 'vuex';
import { ToDoState } from '@/store/modules/todo';

export default Vue.extend({
  data: () => ({
    show: false,
  }),
  computed: {
    ...mapState('todo', {
      error: state => (state as ToDoState).error,
    }),
    isAddErrorType() {
      return this.error === 'add';
    },
    isUpdateErrorType() {
      return this.error === 'update';
    },
    isFetchErrorType() {
      return this.error === 'fetch';
    },
    isRemoveErrorType() {
      return this.error === 'remove';
    },
    isRefreshErrorType() {
      return this.error === 'refresh';
    },
    errorMessage() {
      if (this.isAddErrorType) {
        return 'Failed to add a new item to the list. Please try again.';
      }

      if (this.isRemoveErrorType) {
        return 'Failed to remove an item from the list. Please try again';
      }

      if (this.isUpdateErrorType) {
        return 'Cannot update the item due to internal error. Please try again';
      }

      if (this.isFetchErrorType) {
        return 'Failed to fetch items.';
      }

      if (this.isRefreshErrorType) {
        return 'Failed to refresh the old list';
      }

      return '';
    },
  },
  watch: {
    error(newValue) {
      this.show = !!newValue;
    },
  },
  methods: {
    ...mapActions('todo', [
      'resetError',
    ]),
  },
});
</script>
