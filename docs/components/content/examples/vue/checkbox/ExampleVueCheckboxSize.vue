<script setup lang="ts">
const items = ref([
  {
    label: '0.8cm',
    size: '0.8cm',
    checkbox: 'primary',
    value: true,
  },
  {
    label: 'xs md:2xl',
    size: 'xs md:2xl data-[state=checked]:3xl',
    checkbox: 'blue',
    value: 'indeterminate',
  },
  {
    label: 'sm',
    size: 'sm data-[state=checked]:2xl',
    checkbox: 'green',
    value: false,
  },
  {
    label: 'md',
    size: 'md data-[state=checked]:2xl',
    checkbox: 'purple',
    value: false,
  },
  {
    label: 'lg',
    size: 'lg data-[state=checked]:2xl',
    checkbox: 'red',
    value: true,
  },
])
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <NCheckbox
      v-for="item in items"
      :key="item.size"
      v-model="item.value as boolean | 'indeterminate'"
      v-bind="{
        size: item.size,
        label: item.label,
        checkbox: item.checkbox,
      }"
    />
  </div>
</template>
