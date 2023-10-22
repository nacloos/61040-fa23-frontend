<script setup lang="ts">

const props = defineProps(['content']);
const img = props.content;
const imageURL = props.content.imageURL;
const note = props.content.note;

// const imageURL = "https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fnature12742/MediaObjects/41586_2013_Article_BFnature12742_Fig2_HTML.jpg?as=webp";
</script>

<template>
<div class="flex flex-col justify-center w-full">
    <!-- {{ imageURL }} -->
    <div>
        <img class="object-scale-down" :src="imageURL" alt="">
    </div>
    
    <div class="pt-2">
        <div v-if="note">
            <p class="text-sm"><strong>Note</strong></p>
            <p class="text-sm">{{ note }}</p>
        </div>
    </div>
</div>
</template>


