<template>
  <div class="container py-3 flex flex-col">
    <a-typography-title>Course preview</a-typography-title>

    <div class="course-preview" :class="['justify-center', 'items-center']">
      <a-spin v-if="!course" size="large" />

      <course-item v-if="course" :course="course" :video-preview="false" :lessons="true" />
    </div>
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

<style scoped>
.course-preview {
  @apply flex flex-auto;
}
</style>
