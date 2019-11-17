<template>
  <v-app>
    <v-content>
      <Header/>
      <AddToList/>
      <List/>
      <Overlay/>
      <Error/>
    </v-content>
    <v-footer>
      <v-layout text-center>
        <v-flex mb-5>
          <div class="font-weight-light body-2">Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Header from '@/components/Header.vue';
import AddToList from '@/components/AddToList.vue';
import List from '@/components/List.vue';
import Overlay from '@/components/Overlay.vue';
import Error from '@/components/Error.vue';

export default Vue.extend({
  name: 'App',

  components: {
    Header,
    AddToList,
    List,
    Overlay,
    Error,
  },
});
</script>
