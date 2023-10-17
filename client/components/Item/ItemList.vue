<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { fetchy } from "@/utils/fetchy";
import Item from "@/components/Item/Item.vue";

const loaded = ref(false);
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
    items.value = results.map((res: any) => ({
        type: "figure",
        // path: result.path,
        // name: result.name,
        content: {
            imageURL: res.item.image.url,
            note: res.item.note.content
        }
    }));

}

onBeforeMount(async () => {
    await getItems();
    loaded.value = true;
});

</script>

<template>
<!-- {{  items }} -->

<div v-if="loaded" class="flex flex-col items-center justify-center">
    <!-- <div class="flex space-x-4"> -->
    <div>
        <!-- <p v-for="item in items">{{ item }}</p> -->
        <Item v-for="item in items" :item="item" />
    </div>
</div>
</template>