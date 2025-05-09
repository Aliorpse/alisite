<script setup>
defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="w-[90%] sm:w-[80%] md:w-[60%] mx-auto mt-20">
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 mb-8">
      <h1 class="text-3xl font-bold whitespace-nowrap">{{ title }}</h1>
      <div class="w-full sm:w-auto -my-2">
        <slot name="right"></slot>
      </div>
    </div>
    <div class="w-full border-t-2 border-dashed border-slate-500/30"></div>
  </div>
</template> 