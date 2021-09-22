<template>
  <div class="post">
    <div v-for="post in posts" :key="post.id">
      {{post.id}} : 
      {{post.title}}
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
export default {
  name: "Posts",
  data() {
    return {
      posts: [],
    };
  },
  created() {
    axios.get('https://jsonplaceholder.typicode.com/posts')
    .then(res => {
      this.posts = res.data
    })
  },
};
</script>
