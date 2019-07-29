  <template>
  <div>
    <v-btn text @click="getLocation">Click</v-btn>
    <v-list v-for="location in nearby" :key="location">
      <v-list-item>
        <v-card flat width="100vw" class="mx-auto my-auto">
          <v-card-title>
            <v-icon>email</v-icon>
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
    getLocation: function() {
      fetch(
        "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=30.004011,31.3996752&type=cafe&rankby=distance&key=AIzaSyDJR5zil2pek3mXn-QR5AQpPxPPVG9XBmQ"
      )
        .then(res => res.json())
        .then(res => (this.nearby = res.results))
        .catch(err => console.error(err));
    }
  },
  data: () => ({
    nearby: [
      {
        title: "",
        time: ""
      }
    ]
  })
};
</script>