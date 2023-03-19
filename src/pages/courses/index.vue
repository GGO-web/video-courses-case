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
          <p>{{ course.description }}</p>

          <div class="course__skills flex flex-wrap gap-2 mb-3">
            <a-tag v-for="skill in course.meta.skills" :key="skill" color="blue">
              {{ skill }}
            </a-tag>
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

</script>

<style lang="scss" scoped>
  .courses {
    @apply grid grid-cols-[repeat(auto-fit,_minmax(400px,_1fr))] gap-4 flex-auto min-h-full;
  }
  .course__body {
    @apply border-dashed border-2 border-sky-500 p-4;
  }
</style>
