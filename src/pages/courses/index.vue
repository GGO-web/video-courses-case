<template>
  <div class="container pt-3 pb-3 flex flex-col min-h-screen">
    <a-typography-title>Courses preview</a-typography-title>

    <div
      :class="['courses', 'justify-center', courses.length === 0 ? 'items-center': 'items-start']"
    >
      <a-spin v-if="courses.length === 0" size="large" />

      <a-card
        v-for="course in courses"
        :key="course.id"
        :class="course"
        hoverable
      >
        <img alt="" :src="getCoursePreviewImage(course.previewImageLink)">

        <div class="course__body">
          <a-typography-title :level="3">
            {{ course.title }}
          </a-typography-title>
          <a-typography-text class="block mb-3">
            {{ course.description }}
          </a-typography-text>

          <div class="course__start mb-3">
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

          <div class="course__skills mb-3">
            <strong class="text-blue-400 block mb-2">
              Skills:
            </strong>

            <div class="course__skills-tags flex flex-wrap gap-2 ">
              <a-tag v-for="skill in course.meta.skills" :key="skill" class="flex-auto text-center" color="blue">
                {{ skill }}
              </a-tag>
            </div>
          </div>

          <div class="course__rating grid">
            <a-rate :count="5" :value="3" disabled />
          </div>
        </div>
      </a-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import CoursesService from '~/services/courses'
import { Courses } from '~/types/courses/courses.interface'

const courses = ref<Courses>([])

const getCourses = async () => {
  const coursesPreview = await CoursesService.getCourses()
  courses.value = coursesPreview
}

onBeforeMount(() => {
  getCourses()
})

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
  .courses {
    @apply grid grid-cols-[repeat(auto-fit,_minmax(400px,_1fr))] gap-4 flex-auto min-h-full;
  }
  .course__body {
    @apply border-dashed border-2 border-sky-500 p-4;
  }
</style>
