<template>
  <div v-if="smoothie">
    <v-container class="mt-2">
      <h1 class="lobster-font text-center mb-2">{{ smoothie.title }}</h1>
      <v-card class="pa-3 px-5">
        <v-form @submit.prevent="smoothieEdit">
          <v-text-field label="Title" v-model="smoothie.title"></v-text-field>
          <v-text-field
            label="Add Ingredient"
            v-model="ingreinput"
            @keydown.tab.prevent="addIngre"
            append-icon="control_point"
            @click:append="addIngre"
            :hint="hint"
          ></v-text-field>
          <v-card v-if="smoothie.ingredients.length > 0" class="mt-2">
            <v-img
              class="white--text"
              aspect-ratio="1/2"
              src="../../public/img/ingreS.jpg"
              gradient="0deg, rgba(2,0,36,0.3) 0%, rgba(9,9,121,0.5) 50%, rgba(0,212,255,0.8) 100%"
            >
              <h3 class="text-center lobster2">{{ smoothie.title }}</h3>
              <hr />
              <span
                v-for="(ingredient, index) in smoothie.ingredients"
                :key="index"
              >
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
            >Edit Smoothie</v-btn
          >
        </v-form>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import db from "@/firebase/init";
import { doc, updateDoc } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";
import slugify from "slugify";
export default {
  data() {
    return {
      smoothie: null,
      ingreinput: null,
      subErr: false,
      hint: "Press Tab or Add Icon to Add Ingredient",
    };
  },
  async mounted() {
    const q = query(
      collection(db, "smoothies"),
      where("slug", "==", this.$route.params.smoothie_slug)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      this.smoothie = doc.data();
      this.smoothie.id = doc.id;
    });
  },
  methods: {
    addIngre() {
      if (this.ingreinput !== null) {
        this.smoothie.ingredients.push(this.ingreinput);
        this.ingreinput = null;
        this.hint = null;
      } else {
        this.hint = "Please Add Ingredient";
      }
    },
    delIngre(index) {
      this.smoothie.ingredients.splice(index, 1);
    },
    async smoothieEdit() {
      if (this.smoothie.title && this.smoothie.ingredients.length > 2) {
        try {
          this.slug = slugify(this.smoothie.title, {
            replacement: "-",
            remove: /[$*_+~.()'"!\-:@]/g,
            lower: true,
          });
          const frankDocRef = doc(db, "smoothies", this.smoothie.id);
          await updateDoc(frankDocRef, {
            title: this.smoothie.title,
            ingredients: this.smoothie.ingredients,
            slug: this.smoothie.slug,
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
