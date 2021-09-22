<template>
  <v-card class="mt-2" :loading="loading" loader-height="8" dark>
    <v-img
      src="../../public/img/smoothieS.jpg"
      aspect-ratio="3/2"
      gradient="0deg, rgba(34,193,195,0.1) 0%, rgba(0,45,156,0.4) 85%"
    >
      <h1 class="lobster mb-1 text-center white--text">My Smoothies</h1>
      <v-row class="pa-3">
        <v-col
          sm="6"
          cols="12"
          md="6"
          lg="4"
          v-for="smoothie in smoothies"
          :key="smoothie.id"
        >
          <v-card :style="{ background: randomColor() }" dark>
            <v-card-title>
              <span class="lobster-font ml-2">{{ smoothie.title }}</span>
              <v-spacer></v-spacer>
              <span>
                <v-btn
                  class="mx-2"
                  fab
                  dark
                  color="indigo"
                  :to="{
                    name: 'EditSmoothie',
                    params: { smoothie_slug: smoothie.slug },
                  }"
                  small
                >
                  <v-icon dark>edit</v-icon>
                </v-btn>
                <v-btn
                  color="red"
                  @click="deleteSomoothies(smoothie.id)"
                  fab
                  dark
                  small
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </span>
            </v-card-title>
            <v-card-text class="text-left">
              <v-chip
                class="ma-2"
                color="primary"
                v-for="(ingredient, index) in smoothie.ingredients"
                :key="index"
              >
                {{ ingredient }}
              </v-chip>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-img>
  </v-card>
</template>

<script>
// @ is an alias to /src
import db from "../firebase/init";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
export default {
  name: "Smoothie",
  data() {
    return {
      smoothies: [],
      loading: true,
    };
  },
  async mounted() {
    const querySnapshot = await getDocs(collection(db, "smoothies"));
    querySnapshot.forEach((doc) => {
      let smoothie = doc.data();
      smoothie.id = doc.id;
      this.smoothies.push(smoothie);
      this.loading = false;
    });
  },
  methods: {
    randomColor() {
      const r = () => Math.floor(256 * Math.random());
      return `linear-gradient(90deg, rgba(${r()}, ${r()}, ${r()}, 0.2) 0%, rgba(${r()}, ${r()}, ${r()}, 0.3) 50%, rgba(${r()}, ${r()}, ${r()}, 0.8) 100%)`;
    },
    async deleteSomoothies(id) {
      await deleteDoc(doc(db, "smoothies", id));
      this.smoothies = this.smoothies.filter((smoothie) => {
        return smoothie.id != id;
      });
    },
  },
};
</script>
