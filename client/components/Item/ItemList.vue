<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "@/utils/fetchy";


const items = ref([]);

async function getItems() {
    let results;
    try {
        results = await fetchy("/api/figures", "GET");
    } catch (_) {
        console.log("error")
        return;
    }
    console.log("results:", results);
    items.value = results;
}

getItems();

</script>

<template>
{{  items }}
</template>