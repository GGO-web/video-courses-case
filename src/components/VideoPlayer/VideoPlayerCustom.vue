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
    @mouseenter="hoverable ? playHandler : null"
    @progress="handleVideoProgress"
  />
</template>

<script lang="ts" setup>
import Player from 'video.js/dist/types/player'
import { ref } from 'vue'
import { VIDEO_PROGRESS } from '../../constants/consts'
import { VideoProgress } from '../../types/video/videoProgress.interface'

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  poster: {
    type: String,
    required: true
  },
  hoverable: {
    type: Boolean,
    default: false
  }
})

const playerRef = ref<Player | null>(null)

const playHandler = () => {
  if (playerRef.value) {
    setTimeout(() => {
      playerRef.value?.play()
    }, 200)
  }
}

const handleVideoProgress = () => {
  const progress = playerRef.value?.currentTime()

  const videoProgressStorage: VideoProgress[] = JSON.parse(
    localStorage.getItem(VIDEO_PROGRESS) as string
  )

  // set initial value for all video progresses as empty array
  if (!videoProgressStorage && !Array.isArray(videoProgressStorage)) {
    localStorage.setItem(VIDEO_PROGRESS, JSON.stringify([]))
  }

  const isPresent = videoProgressStorage.find(el => el.src === props.src)

  if (!isPresent) {
    localStorage.setItem(VIDEO_PROGRESS, JSON.stringify([...videoProgressStorage, {
      src: props.src,
      progress
    }]))
  } else {
    const newVideoProgressStorage = videoProgressStorage.map((item) => {
      if (item.src === props.src) {
        return {
          src: props.src,
          progress
        }
      }

      return item
    })

    localStorage.setItem(VIDEO_PROGRESS, JSON.stringify(newVideoProgressStorage))
  }
}

const getVideoProgressFromStorage = (): number => {
  const videoProgressStorage: VideoProgress[] = JSON.parse(localStorage.getItem(VIDEO_PROGRESS) as string
  )

  if (!videoProgressStorage && !Array.isArray(videoProgressStorage)) {
    localStorage.setItem(VIDEO_PROGRESS, JSON.stringify([]))
  }

  const videoProgress = videoProgressStorage.find(el => el.src === props.src)?.progress

  return videoProgress || 0
}

const playerMounted = (event: {player: Player}) => {
  playerRef.value = event.player

  const savedVideoProgress = getVideoProgressFromStorage()

  // set current video progress from local storage
  playerRef.value.currentTime(savedVideoProgress)
}

</script>
