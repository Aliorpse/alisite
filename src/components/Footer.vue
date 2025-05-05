<template>
  <div class="w-full">
    <div class="w-[90%] sm:w-[80%] md:w-[60%] mx-auto">
      <div class="w-full border-t-2 border-dashed border-slate-500/30"></div>
      <div class="flex flex-col items-center justify-center h-20 sm:h-24 gap-1 font-mono text-xs sm:text-sm opacity-70 px-4">
        <p class="text-center">© 2024-{{ new Date().getFullYear() }} Aliorpse. All rights reserved.</p>
        <div class="opacity-90 text-center">
          Inspired by 
          <a 
            href="https://github.com/eurooooo/zephyrlin.me" 
            target="_blank"
            class="underline hover:text-slate-300 transition-colors duration-300"
          >
            zephyrlin.me
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
