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

        <v-list></v-list>
      </v-menu>

      <v-toolbar-items></v-toolbar-items>
    </v-app-bar>

    <v-navigation-drawer app>
      <v-list class="pa-1" dark></v-list>
    </v-navigation-drawer>
  </v-container>
</template>