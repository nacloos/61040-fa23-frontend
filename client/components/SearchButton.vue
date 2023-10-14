<template>
<button class="btn bg-white font-normal normal-case w-3/12 border-neutral-200 flex justify-between items-center" onclick="my_modal_2.showModal()">
        <div class="flex items-center space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
               <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <div>Search...</div>
        </div>
            
        <div class="space-x-1">
            <kbd class="kbd kbd-sm opacity-70">ctrl</kbd>
            <kbd class="kbd kbd-sm opacity-70">k</kbd>
        </div>
</button>

<dialog id="my_modal_2" class="modal">
    <div class="modal-box w-1/2 max-w-5xl h-5/6">
    <h3 class="font-bold text-lg">Hello!</h3>
    <p class="py-4">Press ESC key or click outside to close</p>
    </div>
    <form method="dialog" class="modal-backdrop">
    <button>close</button>
    </form>
</dialog>
</template>