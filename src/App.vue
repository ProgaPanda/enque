<template>
  <v-app>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {},
  data: () => ({})
};
</script>

<style lang="scss">
* {
  font-family: "Roboto", sans-serif;
  font-weight: 500;
}
</style>
