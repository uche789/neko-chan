<template>
  <v-container>
    <v-layout
     text-center
     wrap
    >

    <v-flex xs12>
      <v-img
        :src="require('../assets/kitty_write.svg')"
        class="my-3"
        contain
        height="200"
      ></v-img>
    </v-flex>

    <v-flex mb-4>
      <h1 class="display-2 font-weight-bold text-lowercase mb-3">
        ねこちゃん
      </h1>
      <p class="subheading font-weight-light font-italic">
       I love cats and daily lists!
      </p>
    </v-flex>

    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'AppHeader',
});
</script>
