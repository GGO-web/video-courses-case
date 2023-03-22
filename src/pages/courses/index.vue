<template>
  <div class="container pt-3 pb-3 flex flex-col min-h-screen">
    <a-typography-title>Courses preview</a-typography-title>

    <div
      :class="['courses', 'justify-center', courses.length === 0 ? 'items-center': 'items-start']"
    >
      <a-spin v-if="courses.length === 0" size="large" />

      <course-item
        v-for="course in paginatedCourses"
        :key="course.id"
        :course="course"
      />
    </div>

    <a-pagination
      v-if="courses.length > 0"
      class="pagination"
      :current="pagination.current"
      :page-size="pagination.pageSize"
      :total="courses.length"
      @change="pagination.current = $event"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import CoursesService from '~/services/courses'
import { Courses } from '~/types/courses/courses.interface'

const courses = ref<Courses>([])
const pagination = reactive({
  current: 1,
  pageSize: 10
})

const paginatedCourses = computed(() => {
  const start = (pagination.current - 1) * pagination.pageSize
  const end = start + pagination.pageSize

  return courses.value.slice(start, end)
})

const getCourses = async () => {
  const coursesPreview = await CoursesService.getCourses()
  courses.value = coursesPreview
}

onBeforeMount(() => {
  getCourses()
})

</script>

<style lang="scss" scoped>
  .courses {
    @apply grid grid-cols-[repeat(auto-fit,_minmax(400px,_1fr))] gap-4 flex-auto min-h-full;
  }

  .pagination {
    @apply flex justify-center mt-4;
  }
</style>
