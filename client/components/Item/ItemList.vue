<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { fetchy } from "@/utils/fetchy";
import Item from "@/components/Item/Item.vue";
import Footer from "@/components/Footer.vue";

import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";


const { isLoggedIn } = storeToRefs(useUserStore());

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
        id: res._id,
        owner: res.owner,
        // path: result.path,
        // name: result.name,
        content: {
            imageURL: res.item.image.url,
            config: res.item.config.content,
            note: res.item.note.content
        }
    })).reverse()
    ;
    console.log("items:", items.value)
}

onBeforeMount(async () => {
    await getItems();
    loaded.value = true;
});

</script>

<template>
<section v-if="!isLoggedIn">
<h2 class="flex text-xl justify-center w-full p-20">Please log in!</h2>
</section>

<!-- TODO: show only accessible items -->
<div v-if="loaded" class="flex flex-col items-center justify-center">
    <!-- <div class="flex space-x-4"> -->
    <div>
        <!-- <p v-for="item in items">{{ item }}</p> -->
        <!-- not sure why but adding :key="item.id" makes the items refresh correctly (otherwise the image and text wouldn't update when deleting item). Thanks ChatGPT! -->
        <Item v-for="item in items" :key="item.id" :item="item" @refreshItems="getItems"/>
    </div>
</div>

<Footer @refreshItems="getItems" />

</template>