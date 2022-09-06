<template>
  <div class="flex flex-col h-screen justify-between">
    <Header />
    <Nuxt />
  </div>
</template>
<script>
import Header from "../components/Header.vue";
export default {
  components: {
    Header,
  },
};
</script>