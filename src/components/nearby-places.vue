  <template>
  <div>
    <v-list>
      <v-list-item v-for="location in nearby" :key="location.name">
        <v-card flat width="100vw" class="mx-auto my-auto">
          <v-card-title>{{location.name}}</v-card-title>
          <v-card-text>
            <p>
              <v-icon small left>location_on</v-icon>2 minutes away.
              <v-icon right>open_in_new</v-icon>
            </p>
          </v-card-text>
        </v-card>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  mounted() {
    this.findNearby();
  },
  methods: {
    async findNearby() {
      const crds = await this.getLocation();
      const cafes = fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${crds.latitude},${crds.longitude}&type=cafe&rankby=distance&key=AIzaSyDJR5zil2pek3mXn-QR5AQpPxPPVG9XBmQ`
      );
      const restaurants = fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${crds.latitude},${crds.longitude}&type=restaurant&rankby=distance&key=AIzaSyDJR5zil2pek3mXn-QR5AQpPxPPVG9XBmQ`
      );
      const places = await Promise.all([cafes, restaurants]);
      const jsons = await Promise.all(places.map(res => res.json()));
      this.nearby = jsons.reduce((acc, curr) => {
        return acc.concat(curr.results.slice(0, 5));
      }, []);
    },
    getLocation() {
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
      nearby: []
    };
  }
};
</script>