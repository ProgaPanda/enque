  <template>
  <div>
    <v-list>
      <v-container fluid>
        <v-list-item @click="onLinkClick" v-for="location in nearby" :key="location.name">
          <v-card flat width="100vw" class="mx-auto my-auto">
            <h3>{{location.name}}</h3>
            <v-card-actions style="padding-left:0">
              <v-layout>
                <v-icon small left color="#aeaeae">location_on</v-icon>
                <div style="color:#757575;padding:0 auto;">2 minutes away.</div>
                <v-spacer></v-spacer>
                <v-icon right color="blue">open_in_new</v-icon>
              </v-layout>
            </v-card-actions>
            <br />
          </v-card>
        </v-list-item>
      </v-container>
    </v-list>
  </div>
</template>

<script>
export default {
  mounted() {
    this.findNearby();
  },
  methods: {
    onLinkClick() {},
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