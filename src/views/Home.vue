<template>
  <div class="home">
    <v-container>
      <v-card shaped>
        <v-img
          class="white--text align-end"
          height="150px"
          src="../../public/img/addS.jpg"
          gradient="0deg, rgba(2,0,36,0.9) 0%, rgba(9,9,121,0.8) 50%, rgba(0,212,255,0.3) 100%"
        >
          <v-card-title class="lobster">
            Add Smoothie
            <v-spacer></v-spacer>
            <v-btn
              class="mx-2"
              fab
              dark
              color="indigo"
              :to="{ name: 'AddSmoothie' }"
            >
              <v-icon dark>mdi-plus</v-icon>
            </v-btn>
          </v-card-title>
        </v-img>
      </v-card>
      <Smoothie />
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Smoothie from "@/components/Smoothie.vue";

export default {
  name: "Home",
  components: {
    Smoothie,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Lobster&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Lobster+Two:ital@1&display=swap");
.lobster {
  font-family: "Lobster", cursive;
  font-size: 24px;
  text-shadow: 2px 2px 8px blue;
}
.lobster-font {
  font-family: "Lobster", cursive;
  font-size: 24px;
}
.lobster2 {
  font-family: "Lobster Two", cursive;
  font-size: 22px;
}
</style>
