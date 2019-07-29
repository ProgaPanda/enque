<template>
  <v-container class="pa-0">
    <appBar />
    <queueComponent />
    <nearby-places />
  </v-container>
</template>

<script>
import nearbyPlaces from "@/components/nearby-places.vue";
import appBar from "../components/app-bar";
import queueComponent from "../components/queue-component";
export default {
  name: "Queue",
  components: {
    nearbyPlaces,
    appBar,
    queueComponent
  }
};
</script>
