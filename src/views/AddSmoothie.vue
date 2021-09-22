<template>
  <div>
    <v-container class="mt-2">
      <h1 class="lobster-font text-center mb-2">Create Smoothie</h1>
      <v-card class="pa-3 px-5">
        <v-form @submit.prevent="submit">
          <v-text-field label="Title" v-model="title"></v-text-field>
          <v-text-field
            label="Ingredient"
            v-model="ingre"
            @keydown.tab.prevent="addIngre"
            append-icon="control_point"
            @click:append="addIngre"
            :hint="hint"
          ></v-text-field>
          <v-card v-if="ingredients.length > 0" class="mt-2">
            <v-img
              class="white--text"
              aspect-ratio="1/2"
              src="../../public/img/ingreS.jpg"
              gradient="0deg, rgba(2,0,36,0.1) 0%, rgba(9,9,121,0.5) 50%, rgba(0,212,255,0.8) 100%"
            >
              <h3 class="text-center lobster2">{{ title }}</h3>
              <hr />
              <span v-for="(ingredient, index) in ingredients" :key="index">
                <v-chip
                  class="ma-2"
                  close
                  color="primary"
                  text-color="white"
                  close-icon="mdi-delete"
                  @click:close="delIngre(index)"
                >
                  <v-avatar left>
                    <v-icon small>restaurant</v-icon>
                  </v-avatar>
                  {{ ingredient }}
                </v-chip>
              </span>
            </v-img>
          </v-card>
          <div v-if="subErr">Required Title and Two or more Ingredient</div>
          <v-btn type="submit" color="primary" block class="px-3 mt-3"
            >Add Smoothie</v-btn
          >
        </v-form>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import db from "@/firebase/init";
import { collection, addDoc } from "firebase/firestore";
import slugify from "slugify";
export default {
  name: "AddSmoothie",
  data: () => ({
    title: null,
    ingre: null,
    slug: null,
    subErr: false,
    hint: "Press Tab or Add Icon to Add Ingredient",
    ingredients: [],
  }),
  methods: {
    addIngre() {
      this.subErr = false;
      if (this.ingre !== null) {
        this.ingredients.push(this.ingre);
        this.ingre = null;
        this.hint = null;
      } else {
        this.hint = "Please Add Ingredient";
      }
    },
    delIngre(index) {
      this.ingredients.splice(index, 1);
    },
    async submit() {
      if (this.title && this.ingredients.length >= 2) {
        try {
          this.slug = slugify(this.title, {
            replacement: "-",
            remove: /[$*_+~.()'"!\-:@]/g,
            lower: true,
          });
          await addDoc(collection(db, "smoothies"), {
            title: this.title,
            ingredients: this.ingredients,
            slug: this.slug,
          });
          this.$router.push({ name: "Home" });
        } catch (e) {
          console.log(e);
        }
      } else {
        this.subErr = true;
      }
    },
  },
};
</script>
