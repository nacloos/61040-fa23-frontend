<script setup>

const props = defineProps(['content']);
const imageURL = props.content.imageURL;

// const imageURL = "https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fnature12742/MediaObjects/41586_2013_Article_BFnature12742_Fig2_HTML.jpg?as=webp";
</script>

<template>
<img :src="imageURL" alt="">
</template>
