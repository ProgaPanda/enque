  <template>
  <div>
    <v-list class="backgrounds">
      <v-layout justify-center>
        <h4 class="text-uppercase text-xs-center brightText nearby">nearby places</h4>
      </v-layout>
      <v-container fluid class="overflowScroller">
        <loading
          :active.sync="isLoading"
          class="loader"
          color="#0881ff"
          background-color="rgba(0,0,0,0)"
          :is-full-page="false"
        ></loading>
        <v-list-item v-for="(place, index) in nearby" :key="place.name" class="pa-1">
          <a
            :href="`google.navigation:q=${place.geometry.location.lat()},${place.geometry.location.lng()}`"
            style="text-decoration:none;"
          >
            <v-card flat width="90vw" class="mx-auto my-auto backgrounds">
              <v-card-actions>
                <v-layout>
                  <v-avatar :color="colorIcon(place.types[0])" class="avatarMargin">
                    <v-icon color="white">{{typeIcon(place.types[0])}}</v-icon>
                  </v-avatar>
                  <v-flex>
                    <h3>{{place.name}}</h3>
                    <v-layout justify-start>
                      <v-icon small left color="#aeaeae" v-if="distances.length">{{distances[index].icon}}</v-icon>
                      <v-icon small left color="#aeaeae" v-else>location_on</v-icon>
                      <div v-if="distances.length" class="brightText">{{distances[index].text}} away.</div>
                      <div v-else class="brightText">0 min away.</div>
                    </v-layout>
                  </v-flex>
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
    typeIcon(businessType) {
      switch (businessType) {
        case "cafe":
          return "local_cafe";
        case "supermarket":
          return "store_mall_directory";
        case "restaurant":
          return "restaurant";
        default:
          return "place";
      }
    },
    colorIcon(businessType) {
      switch (businessType) {
        case "cafe":
          return "indigo";
        case "supermarket":
          return "blue";
        case "restaurant":
          return "red";
        default:
          return "green";
      }
    },
    async findNearby() {
      this.isLoading = true;

      const crds = await this.getLocation();
      this.coords.lng = crds.longitude;
      this.coords.lat = crds.latitude;
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
        fetchPlaces("restaurant"),
        fetchPlaces("supermarket")
      ]);
      this.nearby = [...new Set(places.flat())];
      this.isLoading = false;

      const distinctBy = (arr, extractorFn) => {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
          const found = result.find(
            item => extractorFn(item) === extractorFn(arr[i])
          );
          if (!found) result.push(arr[i]);
        }
        return result;
      };

      this.nearby = distinctBy(places.flat(), i => i.name).slice(0, 10);

      const destinations = this.nearby.map(e => new google.maps.LatLng(e.geometry.location.lat(), e.geometry.location.lng()));
      const currentLocation = new google.maps.LatLng(this.coords.lat, this.coords.lng);
      const [walkingDistMat, drivingDistMat] = (await Promise.all([
          this.computeDistanceInTime([currentLocation], destinations),
          this.computeDistanceInTime([currentLocation], destinations, "DRIVING")
      ])).map(distMat => distMat.rows[0].elements);

      const distances = [];

      for (let i = 0; i < walkingDistMat.length; i++) {
          if (walkingDistMat[i].duration.value > 60 * 20) {
              distances.push({text: drivingDistMat[i].duration.text, icon: "drive_eta"})
          } else {
              distances.push({text: walkingDistMat[i].duration.text, icon: "directions_walk"})
          }
      }
      this.distances = distances;
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
          pos => res(pos.coords),
          error,
          options
        );
      });
    },
    computeDistanceInTime(origins, destinations, travelMode = "WALKING") {
        return new Promise((res, rej) => {
          const service = new google.maps.DistanceMatrixService;
          service.getDistanceMatrix({
            origins, destinations, travelMode,
            unitSystem: google.maps.UnitSystem.METRIC,
          }, (response, status) => {
              if (status !== 'OK') {
                  rej(status)
              } else {
              res(response)
              }
          }
        );
      })
    }
  },
  data() {
    return {
      isLoading: false,
      nearby: [],
      coords: {},
      distances: [],
    };
  }
};
</script>

<style lang="scss" >
.brightText {
  color: #aeaeae;
}
.avatarMargin {
  margin-right: 15px;
}
.loader {
  top: 50%;
  height: 200px;
}
.nearby {
  letter-spacing: 7px;
}
.overflowScroller {
  height: 60vh;
  overflow-y: scroll;
}
.backgrounds {
  background-color: #f3f3f3 !important;
}
</style>
