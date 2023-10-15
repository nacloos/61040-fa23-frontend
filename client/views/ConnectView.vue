<script setup lang="ts">
import Item from "@/components/Item/Item.vue";
import { authenticateWithDropbox, getAccessTokenFromUrl, getOrCreateSharedLink, isAuthenticated } from '@/utils/dropbox';
import { Dropbox } from 'dropbox';
import { computed, ref } from 'vue';

const CLIENT_ID = 'd89ybibvjuhoiak';
const REDIRECT_URI = 'http://localhost:5173/connect';
let accessToken = ref<string | null>(null);


if (isAuthenticated()) {
    accessToken.value = getAccessTokenFromUrl();
    const dbx = new Dropbox({ accessToken: accessToken.value });

    dbx.filesListFolder({ path: '', recursive: true })
    .then(async (response: any) => {
        const entries = response.result.entries;
        const newFiles = entries.filter(entry => entry[".tag"] === "file").slice(0, 6);

        for (const file of newFiles) {
            try {
                const url = await getOrCreateSharedLink(dbx, file);
                const newFile = { ...file, url };
                files.value.push(newFile);
            } catch (err) {
                console.error("Error handling shared link for file:", file.path_display, err);
            }
        }
    })
    .catch((err: any) => {
        console.log("Error listing folder:", err);
    });

} else {
    authenticateWithDropbox(CLIENT_ID, REDIRECT_URI);
}

const files = ref([]);
const figures = computed(() => files.value
    .filter(file => file.path_display.endsWith(".png"))
    .map(file => ({ 
        type: "figure", 
        path: file.path_display,
        name: file.name.split(".")[0],
        content: {
            imageURL: file.url,
        }
    }))
);

</script>

<template>

<div class="w-full overflow-x-auto px-10">
    <div class="flex space-x-4">
        <Item v-for="item in figures" :item="item" />
    </div>
</div>


<!-- <div>
    <ul>
        <li v-for="file in files" :key="file.id">
            {{ file.path_display }}
            <img :src="file.url" alt="Dropbox Image" />
        </li>
    </ul>
</div> -->
</template>
