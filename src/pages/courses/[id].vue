<template>
  <div class="container">
    <a-typography-title>Course preview</a-typography-title>
    <course-item :course="course" />
  </div>
</template>

<script lang="ts" setup>
import CoursePreviewService from '@/services/coursePreview'

const route = useRoute()
const courseId = computed(() => route.params.id as string)

const course = ref(null)

onBeforeMount(async () => {
  course.value = await CoursePreviewService.getCourse(courseId.value)
})

</script>
