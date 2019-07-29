<template>
  <div>
    <nearby-places />
  </div>
</template>

<script>
import nearbyPlaces from "@/components/nearby-places.vue";
import appBar from "../components/app-bar";
import queueComponent from "../components/queue-component";
export default {
  name: "Que",
  components: {
    "nearby-places": nearbyPlaces,
    appBar,
    queueComponent
  }
};
</script>
