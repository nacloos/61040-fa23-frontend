<script setup lang="ts">
import { ref, watch } from 'vue';
import { fetchy } from '../utils/fetchy';

const searchQuery = ref("");
// don't use computed because fetchy is async
const searchResults = ref([]);

const executeSearch = async () => {
  if (!searchQuery.value) {
    searchResults.value = [];
    return;
  }

  try {
    const response = await fetchy(`/api/search`, "GET", { query: { query: searchQuery.value } });
    searchResults.value = response; 
  } catch (error) {
    console.error("Failed to fetch search results:", error);
  }
};

// Watcher to react to search input changes
watch(searchQuery, executeSearch);

</script>


<template>
<div class="relative">
  <input type="text" v-model="searchQuery" placeholder="Search..." class="input input-bordered w-full pl-11" /> 
  <div class="absolute inset-y-0 left-0 flex items-center pl-3">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  </div>
</div>

<div class="pt-3">
    <ul>
        <li v-for="result in searchResults" :key="result">
        {{ result }}
        </li>
    </ul>
</div>
</template>