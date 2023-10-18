<script setup lang="ts">
import SearchBar from "@/components/SearchBar.vue";
import { onBeforeUnmount, onMounted, ref } from "vue";

const searchModal = ref(null);
const isModalOpen = ref(false);

const toggleSearchModal = () => {
    if (!searchModal.value) {
        return;
    }
    // Use DaisyUI's modal API
    if (isModalOpen.value) {
        // TODO: temp fix for type error
        (searchModal.value as any).close();
    } else {
        // TODO: temp fix for type error
        (searchModal.value as any).showModal();
    }
    isModalOpen.value = !isModalOpen.value;
};

const keydownListener = (event: any) => {
    // Check if 'CTRL+K' was pressed
    if (event.ctrlKey && event.code === 'KeyK') {
        event.preventDefault(); // Prevent the default CTRL+K behavior (e.g., browser search)
        toggleSearchModal();
    }
    // Check if 'ESC' was pressed (TODO: TypeError when press ESC and model is not open)
    if (event.code === 'Escape') {
        event.preventDefault(); // Prevent the default ESC behavior (e.g., Daisyui closing the modal)
        if (isModalOpen.value) {
            toggleSearchModal();
        }    
    }
};

onMounted(() => {
  window.addEventListener('keydown', keydownListener);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', keydownListener);
});
</script>

<template>
<button @click="toggleSearchModal"  class="btn bg-white font-normal normal-case w-full border-neutral-300 border-1 shadow flex flex-row justify-between items-center">
    <div class="flex items-center space-x-3">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <div>Search...</div>
    </div>
        
    <div class="space-x-1">
        <kbd class="kbd kbd-sm opacity-70">ctrl</kbd>
        <kbd class="kbd kbd-sm opacity-70">k</kbd>
    </div>
</button>

<dialog ref="searchModal" id="search_modal" class="modal">
    <div class="modal-box w-1/2 max-w-5xl h-5/6">
        <SearchBar />
    </div>

    <form method="dialog" class="modal-backdrop">
        <button @click="toggleSearchModal">close</button>
    </form>
</dialog>
</template>