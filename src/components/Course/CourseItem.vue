<template>
  <a-card
    :key="course.id"
    class="course"
    hoverable
  >
    <NuxtLink class="block overflow-hidden" :to="'/courses/' + course.id">
      <img class="course__image transition" alt="" :src="getCoursePreviewImage(course.previewImageLink)">
    </NuxtLink>

    <div class="course__body">
      <NuxtLink :to="'/courses/' + course.id">
        <a-typography-title :level="3">
          {{ course.title }}
        </a-typography-title>
      </NuxtLink>

      <a-typography-text class="block mb-3">
        {{ course.description }}
      </a-typography-text>

      <div class="course__stats grid gap-3 justify-items-start">
        <div class="course__start w-full">
          <div class="course__date flex justify-between text-green-600">
            <span>Start date: </span>
            <date>
              {{ getCourseFormattedDate(course.launchDate) }}
            </date>
          </div>
          <div class="course__duration flex justify-between text-blue-600">
            <span>Duration: </span>
            <span>{{ getCourseDuration(course.duration) }}</span>
          </div>
        </div>

        <div class="course__lessons">
          <strong class="mr-3">
            Lessons:
          </strong>

          <div class="course__lessons-count">
            {{ course.lessonsCount }}
          </div>
        </div>

        <div class="course__skills mb-3">
          <strong class="text-blue-400 block mb-2">
            Skills:
          </strong>

          <div class="course__skills-tags flex flex-wrap gap-2">
            <a-tag v-for="skill in course.meta.skills" :key="skill" class="flex-auto text-center" color="blue">
              {{ skill }}
            </a-tag>
          </div>
        </div>

        <div class="course__rating">
          <span class="mr-3">{{ course.rating }}</span>

          <a-rate v-model:value="course.rating" character="✰" allow-half disabled />
        </div>
      </div>

      <div class="course__video mt-3">
        <a-typography-title :level="4" class="mb-3">
          Short course preview:
        </a-typography-title>

        <video-player-custom :src="course.meta.courseVideoPreview.link" :poster="getCoursePreviewImage(course.previewImageLink)" />
      </div>
    </div>
  </a-card>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

import { Course } from '@/types/courses/course.interface'

const props = defineProps<{ course: Course }>()

const { course } = toRefs(props)

console.log(course)

const getCoursePreviewImage = (previewImageLink: string) => {
  return `${previewImageLink}/cover.webp`
}

const getCourseDuration = (duration: number) => {
  const hours = duration / 60
  const roundedHours = Math.floor(hours)

  const minutes = duration - roundedHours * 60

  return `${roundedHours} hours ${minutes} minutes`
}

const getCourseFormattedDate = (date: string) => {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date))
}

</script>

<style lang="scss" scoped>
  .course {
    cursor: unset;
  }

  .course__image {
    width: 100%;
  }
  .course:hover .course__image {
    transform: scale(1.05);
  }

  .course__body {
    @apply border-dashed border-2 border-sky-500 p-4;
  }

  .course__lessons {
    @apply inline-flex items-center bg-teal-400 text-white py-1 px-3;

    &-count {
      @apply inline-flex place-content-center flex-wrap bg-amber-400 rounded-full min-w-[32px] h-[32px];
    }
  }

  .course__rating {
    @apply inline-flex items-center;
  }

</style>
