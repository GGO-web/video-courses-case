<template>
  <div class="home">
    Welcome home dear {{ name }}

    <a-input v-model:value="name" class="max-w-xl block" placeholder="Write your name bro :)" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
const name = ref('Stranger')

</script>
