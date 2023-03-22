<template>
  <div class="lesson">
    <a-typography-title class="mb-3">
      {{ lesson.title }}
    </a-typography-title>

    <video-player-custom :src="lesson.link" :poster="getCoursePreviewImage(lesson.previewImageLink)" />

    <div class="lesson__duration text-red-400 my-2 text-lg">
      <span>Duration: </span>
      <span>{{ getFormattedDuration(lesson.duration) }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

import { Lesson } from '../../types/courses/courseLesson.interface'
import { getCoursePreviewImage } from '~/helpers/getCoursePreviewImage'
import { getFormattedDuration } from '~/helpers/getFormattedDuration'

const props = defineProps<{
  lesson: Lesson
}>()
const { lesson } = toRefs(props)

</script>
