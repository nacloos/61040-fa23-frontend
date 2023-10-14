<script setup lang="ts">
import Item from "@/components/Item/Item.vue";
import NoteItem from "@/components/Item/NoteItem.vue";
import ConfigItem from "@/components/Item/ConfigItem.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());


const imageURLs = [
  "https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fnature12742/MediaObjects/41586_2013_Article_BFnature12742_Fig1_HTML.jpg?as=webp",
  "https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fnature12742/MediaObjects/41586_2013_Article_BFnature12742_Fig2_HTML.jpg?as=webp",
  "https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fnature12742/MediaObjects/41586_2013_Article_BFnature12742_Fig5_HTML.jpg?as=webp",
  // "https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fnature12742/MediaObjects/41586_2013_Article_BFnature12742_Fig5_HTML.jpg?as=webp"
]

const sampleCode = `x: {
  "a": 1
  "b": 2
  "c": 3
}
name: GitHub Copilot
description: An AI programming assistant
languages:
  - JavaScript
  - Python
  - TypeScript
  - Java
website: https://copilot.github.com
version: 1.0.0
`

const items = [
  {
    "type": "figure",
    "content": {
      "imageURL": imageURLs[0]
    }
  },
  {
    "type": "figure",
    "content": {
      "imageURL": imageURLs[1]
    }
  },
  {
    "type": "figure",
    "content": {
      "imageURL": imageURLs[2]
    }
  },
  {
    "type": "config",
    "content": {
      "code": sampleCode,
      "language": "yaml"
    }
  },
  {
    "type": "config",
    "content": {
      "code": sampleCode,
      "language": "yaml"
    }
  }
]

</script>

<!-- TODO: center search input -->
<template>
<main>

    <!-- <div class="flex flex-col items-center justify-center"> -->
      <div class="flex space-x-4">
        <Item v-for="item in items" :item="item" />
      </div>
  <!-- </div> -->
</main>
</template>

<style scoped>
</style>
