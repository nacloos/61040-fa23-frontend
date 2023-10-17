<script setup lang="ts">
import ItemMenu from "@/components/Item/ItemMenu.vue";
import ConfigItem from "./ConfigItem.vue";
import FigureItem from "./FigureItem.vue";

// const props = defineProps({
//   imageURL: String
// })


type ItemT = {
    type: string,
    imageURL?: string,
    code?: string
}

const componentMap = {
    figure: FigureItem,
    config: ConfigItem
}

// const props = defineProps({
//     item: ItemT  // TODO
// })
const props = defineProps(["item"])
const item = props.item;
const itemTitle = item.type.charAt(0).toUpperCase() + item.type.slice(1);

const ItemComponent = componentMap[item.type]; 
if (!ItemComponent) {
    throw new Error(`Invalid item type: ${item.type}`)
}

// discard leading "/" and file name
let itemPaths = "";
if (item.path) {
    itemPaths = item.path.split("/").slice(1, -1).join(" / ");
}

// TODO: content dict to specify the item generically

</script>

<template>
<div class="flex flex-col py-5 w-96">
    <!-- <div class="text-xs text-neutral-300 breadcrumbs">
        <ul>
            <li v-for="word in item.path.slice(1, -1).split('/')">
                {{ word }}
            </li>
        </ul>
    </div> -->
    <div class="w-96 px-2 py-1 text-xs text-neutral-300">
        <p>{{ itemPaths }}</p>
    </div>

    <!-- add shadow? -->
    <div class="card card-compact bg-base-100 border-2"> 
        <div class="card-body">
            <div class="card-actions">
                <div class="flex grow">
                    <!-- <div class="itemTitle font-bold mr-1 pr-1 border-neutral-600">{{ itemTitle }}</div>
                    <div class="itemName pl-1">{{ item.name }}</div> -->

                    <p><strong>{{ itemTitle }}</strong></p>
                </div>
                
                <ItemMenu />
                
                <!-- 
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button> -->
            </div>

            <div class="card-actions">
                <component :is="ItemComponent" :content="item.content"/>
            </div>

            <!-- <div class="card-actions">
                <img :src="imageURL" alt="">
            </div>
            <p><strong>Config</strong></p>
            <p>a = 10</p>
            <p><strong>Comment</strong></p> -->
        </div>
    </div>
</div>
</template>

<style scoped>
.card {
    border-color: #dddddd;
    border-width: 1.5px;
}

/* .itemName {
    border-left-width: 1.5px;
    border-color: black;
} */

</style>

