<template>
  <div>
    <nearby-places />
  </div>
</template>

<script>
import nearbyPlaces from "@/components/nearby-places.vue";

export default {
  name: "Que",
  components: {
    "nearby-places": nearbyPlaces
  },
  data() {
    return {};
  }
};
</script>
