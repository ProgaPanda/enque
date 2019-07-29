<template>
  <v-container class="queue-container pa-5">
    <v-layout class="justify-center">
      <p class="font-weight-light text-uppercase serving-text">now serving</p>
    </v-layout>
    <v-layout class="justify-center">
      <h3 class="font-weight-medium display-3 serving-number">C63</h3>
    </v-layout>
    <v-layout class="justify-center" my-5>
      <v-flex xs11>
        <v-layout class="justify-center">
          <v-layout column class="align-center">
            <v-icon color="#b0b0b0">people</v-icon>
            <span class="overline my-2">people ahead</span>
            <span class="headline font-weight-medium green--text">4</span>
          </v-layout>
          <v-layout column class="align-center">
            <v-icon color="#b0b0b0">bookmark</v-icon>
            <span class="overline my-2">Your ticket</span>
            <span class="headline font-weight-medium">W73</span>
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
export default {};
</script>

<style lang="scss">
.queue-container {
  max-height: 40vh;
  position: relative;
  background-color: #313538;
  color: #fff;
  &::after {
    background: linear-gradient(-45deg, #fafafa 16px, transparent 0),
      linear-gradient(45deg, #fafafa 16px, transparent 0);
    background-position: left-bottom;
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