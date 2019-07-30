<template>
  <v-container class="container" fill-height>
    <v-layout column justify-center align-center>
      <h2 class="text-uppercase title mb-5">
        Thank you for waiting
        <v-icon dark>insert_emoticon</v-icon>
      </h2>
      <a style="text-decoration:none" href="https://enqueapp.web.app">
        <v-btn color="success">SCAN A NEW CODE</v-btn>
      </a>
    </v-layout>
  </v-container>
</template>

<style lang="scss" scoped>
.container {
  background: #313538 !important;
}
.title {
  color: #ffffff;
  font-size: 1rem !important;
  letter-spacing: 4px !important;
}
</style>
