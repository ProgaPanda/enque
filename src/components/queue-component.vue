<template>
  <v-container class="queue-container pa-5">
    <v-layout class="justify-center">
      <p class="font-weight-light text-uppercase serving-text">now serving</p>
    </v-layout>
    <v-layout class="justify-center">
      <h3 class="font-weight-medium display-3 serving-number">C{{currentServing}}</h3>
    </v-layout>
    <v-layout class="justify-center" my-5>
      <v-flex xs11>
        <v-layout class="justify-center">
          <v-layout column class="align-center">
            <v-icon color="#b0b0b0">people</v-icon>
            <span class="overline my-2">people ahead</span>
            <span
              class="headline font-weight-medium green--text"
            >{{Math.max(0,order - currentServing)}}</span>
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
import { db } from "@/main";
import firebase from "firebase/app";
import router from "@/router";

export default {
  mounted: function() {
    let id = this.$route.query.queueId;
    if (!id) {
      router.push("/");
      return;
    }
    db.collection("queues")
      .where("name", "==", this.business_name)
      .onSnapshot(querySnapshot => {
        this.currentServing = querySnapshot.docs[0].data().currentServing;
        this.queue = querySnapshot.docs[0].data().queue;
        this.queue.forEach(entry => {
          if (entry.id === id) {
            this.order = entry.order;
          }
          if (this.currentServing > this.order) {
            router.push("/thanks");
          }
        });
      });

    db.collection("queues")
      .where("name", "==", this.business_name)
      .get()
      .then(querySnapshot => {
        let data = querySnapshot.docs[0].data();
        let queue = data.queue;
        let exists = false;
        queue.forEach(entry => {
          if (entry.id === id) {
            exists = true;
          }
        });

        if (!exists) {
          const new_queue_entry = {
            id,
            order: this.queue.length,
            notificationToken: localStorage.getItem("notificationToken")
          };
          this.queue.push(new_queue_entry);
          db.collection("queues")
            // TODO: dynamic id
            .doc("zfG8pmQNxRROJbIeeSJJ")
            .update({
              queue: this.queue
            });
        }
      });
  },
  data: () => ({
    queue: [],
    order: 0,
    ticketsCount: 0,
    currentServing: 0,
    business_name: "Bank Al Ahly"
  })
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
