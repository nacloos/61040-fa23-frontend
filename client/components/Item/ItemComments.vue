<script setup lang="ts">
import { fetchy } from '../../utils/fetchy';
import { ref, defineProps, onMounted } from 'vue';

const props = defineProps(["itemId"]);
const emit = defineEmits(["closeComments"]);


type Comment = {
    content: string,
    author: string
}
const commentList = ref<Array<Comment>>([]);
const commentMsg = ref("");
const loaded = ref(false);

const closeComments = () => {
    emit("closeComments");
}

const getComments = async () => {
    try {
        const results = await fetchy(`/api/figures/${props.itemId}/comments`, "GET");
        console.log("results:", results)
        commentList.value = results.map((res: any) => ({
            content: res.content,
            author: res.user
        }));
    } catch (_) {
        console.log("error")
        return;
    }
}

const createComment = async () => {
    if (!commentMsg.value) {
        return;
    }
    if (!props.itemId) {
        throw new Error("itemId is undefined");
    }
    try {
        await fetchy(`/api/figures/${props.itemId}/comments`, "POST", {
            body: {
                content: commentMsg.value
            }
        });
    } catch (_) {
        console.log("error")
        return;
    }
    commentMsg.value = "";
    await getComments();
}

onMounted(async () => {
    await getComments();
    loaded.value = true;
});

</script>

<template>

<div class="item-view rounded-2xl bg-base-100 border-2 py-3 px-3"> 
    <div class="card-body p-0 m-0 h-full">
        <div class="flex flex-row">
            <p class="text-sm">Comments</p>
            <button @click="closeComments" class="btn bg-white border-0 p-0 min-h-0 h-fit">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            </button>
        </div>
        
        <!-- TODO -->
        <!-- <div v-if="loaded"> -->
        <div class="flex-grow"> 
            <div v-for="comment in commentList" class="flex flex-col">
                <div class="text-xs">
                    <!-- nacloos -->
                    {{ comment.author }}
                    <!-- TODO -->
                    <!-- <time class="text-xs opacity-50">12:45</time> -->
                </div>
                <div class="text-sm rounded-lg bg-neutral-100 flex items-center py-2 px-3 mb-2  ">
                    {{ comment.content }}    
                </div>
            </div>
        </div>

        <div class="flex flex-row items-center space-x-1">
            <input type="text" v-model="commentMsg" placeholder="Comment" class="input text-sm  w-full bg-neutral-100 max-w-xs max-h-0 px-2 py-4" />
            <button @click="createComment" class="btn bg-white border-0 p-1 min-h-0 h-fit">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
            </button>
        </div>
        <!-- </div> -->
    </div>
</div>
</template>

<style scoped>
.item-view {
    border-color: #dddddd;
    border-width: 1.5px;
}

</style>