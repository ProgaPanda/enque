  <template>
  <div>
    <v-list style="background-color:#f3f3f3;">
      <v-container fluid style="height: 60vh; overflow-y: scroll">
        <loading
          :active.sync="isLoading"
          style="top:50%; height:200px"
          color="#0881ff"
          background-color="rgba(0,0,0,0)"
          :is-full-page="false"
        ></loading>

        <v-list-item v-for="place in nearby" :key="place.name">
          <a
            :href="`google.navigation:q=${place.geometry.location.lat()},${place.geometry.location.lng()}`"
            style="text-decoration:none;"
          >
            <v-card style="background-color:#f3f3f3;" flat width="90vw" class="mx-auto my-auto">
              <h3>{{place.name}}</h3>
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
          </a>
        </v-list-item>
      </v-container>
    </v-list>
  </div>
</template>
<script>
//import loading components
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import "vue-loaders/dist/vue-loaders.css";
export default {
  components: {
    Loading
  },
  mounted() {
    this.findNearby();
  },
  methods: {
    async findNearby() {
      this.isLoading = true;

      const crds = await this.getLocation();
      const fetchPlaces = (businessType, distance = "2000") =>
        new Promise((res, rej) => {
          const service = new google.maps.places.PlacesService(
            document.createElement("div")
          );
          const location = new google.maps.LatLng(
            crds.latitude,
            crds.longitude
          );

          service.nearbySearch(
            { location, radius: distance, type: [businessType] },
            data => res(data)
          );
        });
      const places = await Promise.all([
        fetchPlaces("cafe"),
        fetchPlaces("restaurant")
      ]);
      this.nearby = [...new Set(places.flat())];
      this.isLoading = false;
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
      isLoading: false,
      nearby: []
    };
  }
};
</script>
