<script setup lang="ts">
import ItemMenu from "@/components/Item/ItemMenu.vue";
import FigureItem from "./FigureItem.vue";
import ConfigItem from "./ConfigItem.vue";

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


// TODO: content dict to specify the item generically

</script>

<template>
<div class="flex flex-col py-10">
    <div class="card card-compact w-96 bg-base-100 border-2 shadow">
        <div class="card-body">
            <div class="card-actions">
                <div class="flew grow"><strong>{{ itemTitle }}</strong></div>
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
</style>
