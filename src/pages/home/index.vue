<template>
  <div class="home">
    <h1>Home</h1>
    <div class="courses">
      <div v-for="course in courses" :key="course.id">
        <h2>{{ course }}</h2>
        <p>{{ course.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CoursesService from '~/services/courses'

const courses = ref([])

const getCourses = async () => {
  const coursesPreview = await CoursesService.getCourses()
  courses.value = coursesPreview
}

onBeforeMount(() => {
  getCourses()
})

onMounted(() => {
  console.log(courses.value[0])
})

</script>
