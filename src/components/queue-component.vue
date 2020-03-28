<template>
  <v-container class="queue-container pa-5">
    <v-layout class="justify-center">
      <p class="font-weight-light text-uppercase serving-text">now serving</p>
    </v-layout>
    <v-layout class="justify-center">
      <h3 class="font-weight-medium display-3 serving-number">C{{currentlyServing}}</h3>
    </v-layout>
    <v-layout class="justify-center" my-5>
      <v-flex xs11>
        <v-layout class="justify-center">
          <v-layout column class="align-center">
            <v-icon color="#b0b0b0">people</v-icon>
            <span class="overline my-2">people ahead</span>
            <span class="headline font-weight-medium green--text">{{peopleAhead}}</span>
          </v-layout>
          <v-layout column class="align-center">
            <v-icon color="#b0b0b0">bookmark</v-icon>
            <span class="overline my-2">Your ticket</span>
            <span class="headline font-weight-medium">C{{order}}</span>
          </v-layout>
          <v-layout column class="align-center">
            <v-icon color="#b0b0b0">people</v-icon>
            <span class="overline my-2">Est. time left</span>
            <span class="headline font-weight-medium red--text">12 min</span>
          </v-layout>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { db, messaging } from "@/main";
import router from "@/router";

export default {
  async mounted() {
    // Example ticket VEpWc1dReXViNjV0Z0RZVUdEWEstT3UxUlFsOWxlV2FCRkl6cHFaNDgtMQ
    const ticket = this.$route.query.ticket;
    if (!ticket) {
      return router.push("/")
    }

    const { name, ticketNum } = await this.enqueue(ticket);
    this.business_name = name;
    this.order = ticketNum;

    db.collectionGroup('lines')
      .where("id", "==", "Ou1RQl9leWaBFIzpqZ48")
      .onSnapshot(querySnapshot => {
        const data = querySnapshot.docs[0].data();
        this.currentlyServing = data.currentlyServing;

        if (this.currentlyServing === this.order) {
          // TODO display a "please head up to the counter" message
        }

        if (this.currentlyServing > this.order) {
          router.push("/thanks");
        }
      })

    this.requestNotificationPermission()
  },
  data: () => ({
    order: 0,
    currentlyServing: 0,
    business_name: "Bank Al Ahly"
  }),
  computed: {
    peopleAhead() {
      return Math.max(0, this.order - this.currentlyServing)
    }
  },
  methods: {
    async requestNotificationPermission() {
      try {
        await messaging.requestPermission()
        const token = await messaging.getToken();
        localStorage.setItem("notificationToken", token);
      } catch (err) {
        console.log('Unable to get permission to notify.', err);
      }
    },
    async enqueue(ticketData) {
      // const callable = firebase.functions().httpsCallable('enqueue');
      // const notificationToken = localStorage.setItem("notificationToken");
      // return await callable({ ticketData, notificationToken})

      // TODO replace this with the callable code above
      const [queueId, lineId, ticketNum] = atob(ticketData).split('-')
      const notificationToken = localStorage.getItem("notificationToken");

      const queueRef = db.doc(`/queues/${queueId}`);
      const ticketsRef = queueRef.collection(`lines/${lineId}/tickets`);

      await ticketsRef.add({ number: +ticketNum, notificationToken })

      const { name, businessName } = (await queueRef.get()).data()
      return { name, businessName, ticketNum }
    }
  }
};
</script>

<style lang="scss">
.queue-container {
  max-height: 40vh;
  position: relative;
  background-color: #313538;
  color: #fff;
  &::after {
    background: linear-gradient(-45deg, #f3f3f3 16px, transparent 0),
      linear-gradient(45deg, #f3f3f3 16px, transparent 0);
    background-repeat: repeat-x;
    background-size: 32px 32px;
    content: " ";
    display: block;
    position: absolute;
    bottom: -4px;
    left: 0px;
    width: 100%;
    height: 32px;
  }
  .serving-text {
    color: #a2a0a7;
    font-size: 12px;
    letter-spacing: 6px;
  }
  .serving-number {
    color: #0881ff;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
  }
}
</style>
