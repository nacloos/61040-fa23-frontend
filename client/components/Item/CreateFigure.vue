<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const imageURL = ref("");
const config = ref("");
const note = ref("");
const emit = defineEmits(["figureCreated"]);

async function createFigure(imageURL: string, config: string, note: string) {
    const body = {
        imageURL,
        config,
        note
    }
    console.log("body:", body)
    try {
        await fetchy("/api/figures", "POST", { body });
        emit("figureCreated");
    } catch (_) {
        console.log("error")
        return;
    }
    console.log("success")
    // TODO: emit note creation to close modal
    
}
</script>

<template>
<form @submit.prevent="createFigure(imageURL, config, note)" class="flex flex-col space-y-2">
    <strong>Figure</strong>
    <div class="space-y-1">
        <label>Image</label>
        <input type="text" v-model="imageURL" placeholder="url..." class="input input-bordered py-2 min-h-0 h-full w-full" />
    </div>
    <div class="space-y-1">
        <label>Config</label>
        <textarea v-model="config" class="textarea textarea-bordered w-full" placeholder="config..."></textarea>
    </div>
    <div class="space-y-1">
        <label>Note</label>
        <textarea v-model="note" class="textarea textarea-bordered w-full" placeholder="note..."></textarea>
    </div>
    <div class="flex justify-end pt-1">
        <button type="submit" class="btn btn-outline btn-sm btn-primary w-1/3">Create</button>
    </div>
</form>
</template>