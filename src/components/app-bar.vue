<template>
  <v-container pa-0>
    <v-app-bar dark app flat color="#313538" class="pl-2 py-2">
      <span class="title">Bank Al Ahly</span>
      <v-spacer></v-spacer>
      <v-menu transition="slide-y-transition" light bottom left offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>more_vert</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item to="/">
            <v-list-item-action>
              <v-icon>control_camera</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="text-uppercase">SCAN QR CODE</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </v-container>
</template>