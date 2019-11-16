<template>
  <v-app>
    <v-content mx-5 my-0 px-5 py-5>
      <Header/>
      <AddToList/>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Header from './components/Header.vue';
import AddToList from './components/AddToList.vue';

export default Vue.extend({
  name: 'App',

  components: {
    Header,
    AddToList,
  },

  data: () => ({
    //
  }),
});
</script>
