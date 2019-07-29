  <template>
  <div>
    <v-list style="background-color:#f3f3f3;">
      <v-container fluid style="height: 60vh; overflow-y: scroll">
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
export default {
  mounted() {
    this.findNearby();
  },
  methods: {
    async findNearby() {
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
      console.log(this.nearby);
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
        navigator.geolocation.getCurrentPosition(pos => res(pos.coords), error, options);
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
