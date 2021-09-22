<template>
  <div class="Profile">
    <button @click="goHome">Go Home</button>
    <h1>Hello {{ userId }}</h1>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Profile",
  data() {
    return {
      userId: this.$route.params.user_id,
    };
  },
  methods: {
    routeChanged() {
      this.userId = this.$route.params.user_id;
    },
    goHome() {
      this.$router.push({name: 'Home'})
    }
  },
  watch: {
    $route : "routeChanged"
  },
};
</script>
