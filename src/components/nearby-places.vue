  <template>
  <div>
    <v-list>
      <v-list-item v-for="location in nearby" :key="location.name">
        <v-card flat width="100vw" class="mx-auto my-auto">
          <v-card-title>
            <v-icon left>location_on</v-icon>
            {{location.name}}
          </v-card-title>
        </v-card>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  methods: {
    findNearby: async function() {
      const crds = await this.getLocation();
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${crds.latitude},${crds.longitude}&type=cafe&rankby=distance&key=AIzaSyDJR5zil2pek3mXn-QR5AQpPxPPVG9XBmQ`
      );
      const json = await res.json();
      this.nearby = json.results;
    },
    getLocation: function() {
      let options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };

      function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }
      return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(
          pos => {
            var crd = pos.coords;
            res(crd);
          },
          error,
          options
        );
      });
    }
  },
  data() {
    return {
      nearby: [
        {
          title: "",
          time: ""
        }
      ]
    };
  }
};
</script>