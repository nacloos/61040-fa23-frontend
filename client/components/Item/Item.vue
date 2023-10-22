<script setup lang="ts">
import ItemMenu from "@/components/Item/ItemMenu.vue";
import ConfigItem from "@/components/Item/ConfigItem.vue";
import FigureItem from "./FigureItem.vue";
import ShareItemModal from "@/components/Item/ShareItemModal.vue";
import ItemComments from "@/components/Item/ItemComments.vue";
import ItemConfig from "@/components/Item/ItemConfig.vue";
import { fetchy } from "../../utils/fetchy";
import { ref } from "vue";
import { useUserStore } from "../../stores/user";

const emit = defineEmits(["refreshItems"]);

const { currentUsername } = useUserStore();

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


// TODO: temp fix for type error
const ItemComponent = (componentMap as any)[item.type]; 
if (!ItemComponent) {
    throw new Error(`Invalid item type: ${item.type}`)
}

// discard leading "/" and file name
let itemPaths = "";
if (item.path) {
    itemPaths = item.path.split("/").slice(1, -1).join(" / ");
}


const deleteItem = async () => {
    try {
        await fetchy(`/api/figures/${item.id}`, "DELETE");
    } catch (_) {
        console.log("error")
        return;
    }
    emit("refreshItems");
    console.log("delete item", item)  
}


const isShareOpen = ref(false);

const openShareModal = () => {
    isShareOpen.value = true;
}

const closeShareModal = () => {
    isShareOpen.value = false;
}

const addCollab = async (username: String) => {
    try {
        await fetchy(`/api/figures/${item.id}/collaborators`, "POST", {
            body: {
                collaborator: username
            }
        });
    } catch (_) {
        return;
    }
}

const removeCollab = async (username: String) => {
    try {
        await fetchy(`/api/figures/${item.id}/collaborators`, "DELETE", {
            body: {
                collaborator: username
            }
        });
    } catch (_) {
        return;
    }
}

const isCommentsOpen = ref(false);
const isConfigOpen = ref(false);

const toggleComments = () => {
    isCommentsOpen.value = !isCommentsOpen.value;
}

const toggleConfig = () => {
    isConfigOpen.value = !isConfigOpen.value;
}

// TODO: content dict to specify the item generically

</script>

<template>
<div class="relative flex flex-col py-4">
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


    <div class="flex flex-row">
    <!-- add shadow? -->
    <div class="item-view rounded-2xl bg-base-100 border-2 w-96 py-3 px-3 mx-2"> 
        <div class="card-body p-0 m-0">
            <div class="card-actions">
                <div class="flex grow">
                    <!-- <div class="itemTitle font-bold mr-1 pr-1 border-neutral-600">{{ itemTitle }}</div>
                    <div class="itemName pl-1">{{ item.name }}</div> -->

                    <!-- <p><strong>{{ itemTitle }}</strong></p> -->
                    <p class="text-sm"><strong>{{ itemTitle }}</strong></p>
                </div>
<!--                 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                </svg> -->


                
                
                <!-- <div class="tooltip tooltip-bottom" data-tip="metadata"> -->
                <button @click="toggleConfig" class="btn bg-white border-0 p-0 min-h-0 h-fit">
                    <!-- <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                    </svg> -->
                    <!-- <div class="flex h-full items-center"> -->
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                    </svg>
                    <!-- </div> -->
                </button>
                <!-- </div> -->
                
                <!-- <div class="tooltip tooltip-bottom" data-tip="comments"> -->
                <button @click="toggleComments" class="btn bg-white border-0 p-0 min-h-0 h-fit">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
                    </svg>
                </button>
                <!-- </div> -->
                
                <ItemMenu @deleteItem="deleteItem" @openShareModal="openShareModal"/>
                
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

            <!-- <p v-if="item.owner != currentUsername" class="flex justify-end text-sm text-neutral-500 space-x-1">
                <div>Shared by</div> 
                <strong> {{ item.owner }}</strong>
            </p> -->
            <div v-if="item.owner != currentUsername" class="flex justify-end items-center text-sm">
                <!-- <div class="text-xs">SHARED</div>  -->
                <div class="grow text-xs">SHARED</div>
                <div class="pr-1"> {{ item.owner }}</div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>

            </div>

            <!-- <div class="card-actions">
                <img :src="imageURL" alt="">
            </div>
            <p><strong>Config</strong></p>
            <p>a = 10</p>
            <p><strong>Comment</strong></p> -->
            
            <!-- <div class="w-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                </svg>
                </div> -->
        </div>
    </div>

    <ItemComments v-if="isCommentsOpen" @closeComments="toggleComments" class="w-64 absolute left-full" :itemId="item.id"/>
    <ItemConfig v-if="isConfigOpen" @closeConfig="toggleConfig" class="w-96 absolute right-full" :item="item"/>

    </div>
    
    <ShareItemModal v-if="isShareOpen" @shareModalClosed="closeShareModal" @addCollab="addCollab" :itemId="item.id"/>
</div>

</template>

<style scoped>
.item-view {
    border-color: #dddddd;
    border-width: 1.5px;
}

/* .itemName {
    border-left-width: 1.5px;
    border-color: black;
} */

</style>

