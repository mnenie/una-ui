<script setup lang="ts">
import NIcon from '../../elements/Icon.vue'
import type { NBreadcrumbItemProps } from '../../../types'
import { cn } from '../../../utils'

const props = defineProps<{
  item: NBreadcrumbItemProps
  active: string
  defaultClass?: string | null
}>()
</script>

<template>
  <li
    class="breadcrumb"
    :class="cn(props.item.class, defaultClass)"
  >
    <a
      :href="item.url || '#'" flex="inline items-center"
      :class="{ [props.active]: item.url === $route.path }"
    >
      <div v-if="item.icon && item.label" class="breadcrumb-item">
        <NIcon :name="item.icon" class="breadcrumb-icon" />
        <span class="breadcrumb-label">{{ item.label }}</span>
      </div>
      <NIcon v-else-if="item.icon" :name="item.icon" class="breadcrumb-icon" />
      <span v-else-if="item.label" class="breadcrumb-label">{{ item.label }}</span>
    </a>
  </li>
</template>
