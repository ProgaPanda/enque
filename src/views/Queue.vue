<template>
  <v-container>
    <appBar />
    <queueComponent />
  </v-container>
</template>

<script>
import appBar from "../components/app-bar";
import queueComponent from "../components/queue-component";
export default {
  components: {
    appBar,
    queueComponent
  },

  data() {
    return {};
  }
};
</script>
