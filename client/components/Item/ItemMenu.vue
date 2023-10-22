<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits(["deleteItem", "openShareModal"]);

const isDropdownOpen = ref(false);
const dropdownButton = ref(null); // Ref for the dropdown button

async function deleteItem() {
  closeDropdown();
  emit("deleteItem");
}

async function openShareModal() {
  closeDropdown();
  emit("openShareModal");
}

const closeDropdown = () => {
  if (!dropdownButton.value) return;
  isDropdownOpen.value = false;
  dropdownButton.value.blur(); // Remove focus from the button
}

const openDropdown = () => {
  isDropdownOpen.value = true;
}

// toggleDropdown => not working properly because not updated when click outside the dropdown (daisyui will close but isDropdownOpen will not be updated)

</script>



<template>
<!-- <div class="dropdown dropdown-bottom dropdown-end" :class="{ 'open': isDropdownOpen }"> -->
<div class="dropdown dropdown-bottom dropdown-end">
  <label ref="dropdownButton" tabindex="0" class="btn bg-white border-0 p-0 min-h-0 h-fit" @click="openDropdown">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
      <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  </label>
  <ul tabindex="0" :hidden="!isDropdownOpen" class="dropdown-content z-[1] menu p-1 bg-base-100 rounded-md w-36 shadow-[0px_0px_10px_rgba(0,0,0,0.1)]">

    <!-- TODO: allow items to be close (for now always show the full list of items) -->
    <!-- <li><a>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
      <div class="text-[14px]">Close</div>
    </a></li> -->

    <li class="flex text-[14px]">
      <a @click="openShareModal">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
        </svg>
        <div>Share</div>
      </a>
  </li>

    <li class="text-[14px]">
      <a @click.stop="deleteItem">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-red-500">
          <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
        </svg>
        <div class="text-red-500">Delete</div>
      </a>
    </li>
  </ul>
</div>
</template>

<style scoped>
svg {
    display: block;
}
</style>
