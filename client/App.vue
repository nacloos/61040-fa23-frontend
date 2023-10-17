<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { onBeforeMount } from "vue";
import { RouterView } from "vue-router";

import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

const userStore = useUserStore();

// Make sure to update the session before mounting the app in case the user is already logged in
onBeforeMount(async () => {
  try {
    await userStore.updateSession();
  } catch {
    // User is not logged in
  }
});
</script>

<template>
  <Header />
  <RouterView class="py-14" />
  <Footer />
</template>

<style scoped>
@import "./assets/toast.css";

/* nav {
  padding: 1em 2em;
  background-color: rgb(255, 255, 255);
  display: flex;
  align-items: center;
} */
/* 
.title {
  display: flex;
  align-items: center;
  gap: 0.5em;
} */

/* img {
  height: 2em;
} */

/* a {
  font-size: large;
  color: black;
  text-decoration: none;
} */

/* ul {
  list-style-type: none;
  margin-left: auto;
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 1em;
}

.underline {
  text-decoration: underline;
} */
</style>
