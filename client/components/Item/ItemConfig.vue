<script setup lang="ts">
import { fetchy } from '../../utils/fetchy';
import { ref, defineProps, onMounted } from 'vue';
import ConfigEditor from './ConfigEditor.vue';

const props = defineProps(["item"]);
const emit = defineEmits(["closeConfig"]);


const loaded = ref(false);

const closeConfig = () => {
    emit("closeConfig");
}

</script>

<template>

<div class="item-view rounded-2xl bg-base-100 border-2 py-3 px-3"> 
    <div class="card-body p-0 m-0 h-full">
        <div class="flex flex-row">
            <p class="text-sm">Metadata</p>
            <button @click="closeConfig" class="btn bg-white border-0 p-0 min-h-0 h-fit">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            </button>
        </div>
        
        <ConfigEditor :content="props.item"/>
    </div>
</div>
</template>

<style scoped>
.item-view {
    border-color: #dddddd;
    border-width: 1.5px;
}

</style>