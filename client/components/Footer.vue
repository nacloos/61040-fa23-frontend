<script setup lang="ts">
import { ref } from 'vue';
import CreateFigure from '@/components/Item/CreateFigure.vue';
import { defineEmits } from 'vue';


const createModal = ref(null);
const isCreateModalOpen = ref(false);

const emit = defineEmits(["refreshItems"]);


function figureCreated() {
    toggleCreateModal()
    emit("refreshItems");
}

function toggleCreateModal() {
    if (!createModal.value) {
        return;
    }
    // Use DaisyUI's modal API
    if (isCreateModalOpen.value) {
        // TODO: temp fix for type error
        (createModal.value as any).close();
    } else {
        // TODO: temp fix for type error
        (createModal.value as any).showModal();
    }
    isCreateModalOpen.value = !isCreateModalOpen.value;
}

</script>

<template>
<footer class="relative">
<div class="fixed pb-3 w-80 pt-10 bottom-0 left-1/2 transform -translate-x-1/2">
    <div class="relative">
        <!-- TODO: general create bar -->
        <!-- <input type="text" v-on:keyup.enter="toggleCreateModal" placeholder="Create..." class="input input-bordered shadow w-full pl-11" />  -->
        <!-- <div class="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z" />
            </svg>
        </div> -->
 
        <!-- restrict to create figure -->
        <button @click="toggleCreateModal"  class="btn bg-white font-normal normal-case w-full border-neutral-300 border-1 shadow flex flex-row justify-between items-center">
            <div class="flex items-center space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z" />
                </svg>
                <div> New figure...</div>
            </div> 
        </button>        
    </div>
</div>

<dialog ref="createModal" id="search_modal" class="modal">
    <div class="modal-box w-80 max-w-5xl">
        <!-- <CreateFigure /> -->
        <!-- TODO: refreshItems -->
        <CreateFigure @figureCreated="figureCreated" />
 
    </div>

    <form method="dialog" class="modal-backdrop">
        <button @click="toggleCreateModal">close</button>
    </form>
</dialog>


</footer>
</template>

<style>
.nav-border {
  border-width: 1.5px;
}
</style>