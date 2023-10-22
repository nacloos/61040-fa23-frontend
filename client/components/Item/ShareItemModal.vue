<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';
import { defineEmits } from 'vue';
import { fetchy } from '../../utils/fetchy';


const shareModal = ref(null);
const isShareModalOpen = ref(false);

const addCollabUsername = ref(null);
const removeCollabUsername = ref(null);
const collabList = ref<Array<any>>([]);

const props = defineProps(["itemId"]);
const emit = defineEmits(["shareModalClosed", "addCollab"]);

const openShareModal = () => {
    if (!shareModal.value) {
        return;
    }
    isShareModalOpen.value = true;
    shareModal.value.showModal();
}

const closeShareModal = () => {
    if (!shareModal.value) {
        return;
    }
    isShareModalOpen.value = false;
    shareModal.value.close();
    emit("shareModalClosed")
}

const addCollab = async () => {
    // emit("addCollab", addCollabUsername.value)
    try {
        await fetchy(`/api/figures/${props.itemId}/collaborators`, "POST", {
            body: {
                collaborator: addCollabUsername.value
            }
        });
    } catch (_) {
        return;
    }
    await getCollabs();
}

const removeCollab = async () => {
    console.log("removeCollabUsername", removeCollabUsername.value)
    try {
        // cannot use body with DELETE
        await fetchy(`/api/figures/${props.itemId}/collaborators/${removeCollabUsername.value}`, "DELETE");
    } catch (e) {
        console.log("error", e)
        return;
    }
    await getCollabs();
}

const getCollabs = async () => {
    console.log("getCollabs")
    try {
        const results = await fetchy(`/api/figures/${props.itemId}/collaborators`, "GET");
        console.log("results:", results)
        collabList.value = results.map((res: any) => ({
            username: res
        }));
    } catch (_) {
        console.log("error")
        return;
    }
}


// TODO: could have many modals opened at the same time, which is not desired (e.g. one for each figure)
// the parent has to take care that only one is open at a time
onMounted(() => {
    openShareModal();
    getCollabs();
});

</script>

<template>
<dialog ref="shareModal" id="share_modal" class="modal">
    <div class="modal-box w-72 max-w-5xl">
        <div class="flex flex-col space-y-2">
            <strong>Share</strong>
            <div class="space-y-1">
                <label>Add collaborator</label>
                <div class="flex flex-row items-center space-x-2">
                    <input type="text" v-model="addCollabUsername" placeholder="Username..." class="input input-bordered py-2 min-h-0 h-full w-7/12" />
                    <button @click="addCollab" class="btn btn-outline btn-sm btn-primary">Add</button>
                </div>
            </div>
            <div class="py-2 space-y-1">
                <label>Remove collaborator</label>
                <div class="flex flex-row items-center space-x-2">
                    <input type="text" v-model="removeCollabUsername" placeholder="Username..." class="input input-bordered py-2 min-h-0 h-full w-7/12" />
                    <button @click="removeCollab" class="btn btn-outline btn-sm btn-primary">Remove</button>
                </div>
            </div>
            
            <div v-if="collabList.length === 0">
                No collaborators
            </div>
            <div v-else>
                <p>Collaborators</p>
                <ul>
                    <li v-for="collab in collabList" :key="collab.username">
                        {{ collab.username }}
                    </li>
                </ul>
            </div>

        </div>
    </div>

    <form method="dialog" class="modal-backdrop">
        <button @click="closeShareModal">close</button>
    </form>
</dialog>

</template>