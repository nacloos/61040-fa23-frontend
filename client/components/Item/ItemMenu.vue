<template>
<div class="dropdown dropdown-bottom dropdown-end">
  <label tabindex="0" class="btn bg-white border-0 p-0 min-h-0 h-fit">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  </label>
  <ul tabindex="0" class="dropdown-content z-[1] menu p-1 bg-base-100 rounded-md w-36 shadow-[0px_0px_10px_rgba(0,0,0,0.1)]">
    <li><a>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
      <!-- TODO: smaller font size but not thiner -->
      <div class="text-[14px]">Close</div>
    </a></li>
    <li class="text-[14px]"><a>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
      </svg>
      <div>Share</div>
    </a></li>
  </ul>
</div>
</template>

<style scoped>
svg {
    display: block;
}
</style>
