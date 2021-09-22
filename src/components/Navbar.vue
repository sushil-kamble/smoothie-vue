<template>
  <v-card>
    <v-app-bar dark>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <a href="/" class="text-decoration-none">
        <span class="white--text lobster2 grey--text">Ninja</span><span class=" white--text lobster2">Smoothies</span>
        </a>
      </v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list nav dense>
        <v-list-item-group active-class="deep-purple--text text--accent-4">
          <v-list-item router to="/">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item router :to="{ name: 'About' }">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>About</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
  }),
};
</script>

<style>

</style>
