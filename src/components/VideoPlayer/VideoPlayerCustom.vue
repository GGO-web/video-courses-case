<template>
  <video-player
    :ref="playerRef"
    class="player"
    :src="props.src"
    :poster="props.poster"
    controls
    width="100%"
    preload
    fluid
    muted
    @mounted="playerMounted"
    @mouseenter="playHandler"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  poster: {
    type: String,
    required: true
  }
})

const playerRef = ref<any>(null)

const playHandler = () => {
  if (playerRef.value) {
    setTimeout(() => {
      playerRef.value.play()
    }, 200)
  }
}

const playerMounted = (event: {player: any}) => {
  playerRef.value = event.player
}

</script>

<style scoped>
</style>
