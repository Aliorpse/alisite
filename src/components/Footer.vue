<script setup>
import { Icon } from '@iconify/vue'

const currentYear = new Date().getFullYear()
</script>

<template>
  <div class="w-full">
    <div class="w-[90%] sm:w-[80%] md:w-[60%] mx-auto">
      <div class="w-full border-t-2 border-dashed border-slate-500/30"></div>
      <div class="flex flex-col items-center justify-center h-20 sm:h-24 gap-1 font-mono text-xs sm:text-sm opacity-70 -mt-2">
        <div class="flex items-center gap-2">
          <p>© 2024-{{ currentYear }} Aliorpse. All rights reserved.</p>
        </div>
        <div class="flex items-center gap-2">
          <a 
            href="https://icp.gov.moe/?keyword=aliorpse.tech" 
            target="_blank" 
            class="hover:text-slate-300 transition-colors duration-300"
          >
            萌ICP备20240259号
          </a>
          <span class="text-slate-500">|</span>
          <span>Hosted by 
            <a 
              href="https://scyun.top/" 
              target="_blank" 
              class="hover:text-slate-300 transition-colors duration-300 underline decoration-dotted"
            >
              scyun.top
            </a>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
