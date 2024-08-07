<script setup lang="ts">
const home = ref({
  label: 'Home',
})
const items = ref([
  { label: 'Components' },
])
</script>

<template>
  <NBreadcrumb :home="home" :items breadcrumb="text" />
</template>
