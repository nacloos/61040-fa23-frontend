<script setup lang="ts">
import { useToastStore } from "@/stores/toast";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { RouterLink, useRoute } from "vue-router";

import Search from "@/components/Search.vue";

const currentRoute = useRoute();
const currentRouteName = computed(() => currentRoute.name);
const userStore = useUserStore();
const { isLoggedIn } = storeToRefs(userStore);
const { toast } = storeToRefs(useToastStore());

</script>

<template>
<header class="fixed w-full py-3 px-10 z-10">
    <!-- <nav class="flex flex-row justify-between items-center"> -->
    <nav class="grid grid-cols-3 items-center">

      <RouterLink :to="{ name: 'Home' }" class="justify-self-start">
        <div class="nav-border title p-3 bg-white shadow rounded-md border-neutral-300">
          <svg width="140" height="17" viewBox="0 0 140 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.12 17V0.125999H1.316V15.908H9.064V17H0.12ZM22.8133 11.15L20.3953 17H19.1733L26.2453 0.0219985H26.9473L34.0713 17H32.7453L30.3013 11.15H22.8133ZM26.5313 1.946C26.2713 2.726 26.0373 3.376 25.8293 3.896L23.2293 10.136H29.8853L27.3113 3.922C26.9127 2.95133 26.6527 2.29267 26.5313 1.946ZM46.8381 0.203999C48.0688 0.0999996 49.3341 0.0479997 50.6341 0.0479997C51.9341 0.0479997 53.0435 0.359999 53.9621 0.983999C54.8981 1.608 55.3661 2.518 55.3661 3.714C55.3661 4.61533 55.1235 5.44733 54.6381 6.21C54.1528 6.97267 53.5635 7.55333 52.8701 7.952C53.9968 8.28133 54.9328 8.87067 55.6781 9.72C56.4235 10.5693 56.7961 11.5313 56.7961 12.606C56.7961 14.0967 56.3195 15.2233 55.3661 15.986C54.4301 16.7487 53.1041 17.13 51.3881 17.13C49.6721 17.13 48.1555 17.0693 46.8381 16.948V0.203999ZM49.2041 8.472L48.0341 8.498V15.96C48.7795 16.0293 49.9841 16.064 51.6481 16.064C52.7748 16.064 53.7021 15.752 54.4301 15.128C55.1755 14.4867 55.5481 13.6893 55.5481 12.736C55.5481 11.7653 55.1755 10.9247 54.4301 10.214C53.7021 9.486 52.7488 8.97467 51.5701 8.68C50.9635 8.54133 50.1748 8.472 49.2041 8.472ZM54.1961 3.688C54.1961 2.83867 53.8408 2.18867 53.1301 1.738C52.4195 1.27 51.5701 1.036 50.5821 1.036C49.5941 1.036 48.7448 1.062 48.0341 1.114V7.484C49.5421 7.484 50.7468 7.52733 51.6481 7.614C52.3241 7.25 52.9135 6.72133 53.4161 6.028C53.9361 5.31733 54.1961 4.53733 54.1961 3.688ZM84.0342 17V8.472H72.3082V17H71.1122V0.125999H72.3082V7.406H84.0342V0.125999H85.2302V17H84.0342ZM112.857 15.258C111.713 16.5927 109.971 17.26 107.631 17.26C105.291 17.26 103.549 16.5927 102.405 15.258C101.261 13.9233 100.689 12.0773 100.689 9.72V0.125999H101.885V9.72C101.885 14.036 103.8 16.194 107.631 16.194C111.461 16.194 113.377 14.036 113.377 9.72V0.125999H114.573V9.72C114.573 12.0773 114.001 13.9233 112.857 15.258ZM129.992 0.203999C131.223 0.0999996 132.488 0.0479997 133.788 0.0479997C135.088 0.0479997 136.198 0.359999 137.116 0.983999C138.052 1.608 138.52 2.518 138.52 3.714C138.52 4.61533 138.278 5.44733 137.792 6.21C137.307 6.97267 136.718 7.55333 136.024 7.952C137.151 8.28133 138.087 8.87067 138.832 9.72C139.578 10.5693 139.95 11.5313 139.95 12.606C139.95 14.0967 139.474 15.2233 138.52 15.986C137.584 16.7487 136.258 17.13 134.542 17.13C132.826 17.13 131.31 17.0693 129.992 16.948V0.203999ZM132.358 8.472L131.188 8.498V15.96C131.934 16.0293 133.138 16.064 134.802 16.064C135.929 16.064 136.856 15.752 137.584 15.128C138.33 14.4867 138.702 13.6893 138.702 12.736C138.702 11.7653 138.33 10.9247 137.584 10.214C136.856 9.486 135.903 8.97467 134.724 8.68C134.118 8.54133 133.329 8.472 132.358 8.472ZM137.35 3.688C137.35 2.83867 136.995 2.18867 136.284 1.738C135.574 1.27 134.724 1.036 133.736 1.036C132.748 1.036 131.899 1.062 131.188 1.114V7.484C132.696 7.484 133.901 7.52733 134.802 7.614C135.478 7.25 136.068 6.72133 136.57 6.028C137.09 5.31733 137.35 4.53733 137.35 3.688Z" fill="#979797"/>
          </svg>
        </div>
      </RouterLink>

      <!-- TODO: position at the center of the screen -->
      <!-- <Search /> -->
      <div class="w-80 justify-self-center">
        <Search />
      </div>

      <!-- TODO: border of 1.5? -->
      <div class="nav-border join space-x-0 border-neutral-300 shadow justify-self-end">
  
        <!-- <button class="join-item border-0 min-h-0 h-fit btn bg-white p-2 border-neutral-200 items font-normal normal-case">      
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
            <path fill-rule="evenodd" d="M12 5.25a.75.75 0 01.75.75v5.25H18a.75.75 0 010 1.5h-5.25V18a.75.75 0 01-1.5 0v-5.25H6a.75.75 0 010-1.5h5.25V6a.75.75 0 01.75-.75z" clip-rule="evenodd" />
          </svg>
        </button> -->

        <RouterLink :to="{ name: 'Settings' }">
          <button class="join-item border-0 min-h-0 h-fit btn bg-white p-2 border-neutral-200">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd" />
            </svg>
          </button>
        </RouterLink>


      </div>
      <!-- <ul>
        <li>
          <RouterLink :to="{ name: 'Home' }" :class="{ underline: currentRouteName == 'Home' }"> Home </RouterLink>
        </li>
        <li v-if="isLoggedIn">
          <RouterLink :to="{ name: 'Settings' }" :class="{ underline: currentRouteName == 'Settings' }"> Settings </RouterLink>
        </li>
        <li v-else>
          <RouterLink :to="{ name: 'Login' }" :class="{ underline: currentRouteName == 'Login' }"> Login </RouterLink>
        </li>
      </ul> -->
    </nav>
    <article v-if="toast !== null" class="toast" :class="toast.style">
      <p>{{ toast.message }}</p>
    </article>
</header>
</template>

<style>
.nav-border {
  border-width: 1.5px;
}
</style>