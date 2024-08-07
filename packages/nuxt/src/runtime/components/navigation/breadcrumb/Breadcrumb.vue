<script setup lang="ts">
import { computed } from 'vue'
import type { NBreadcrumbProps } from '../../../types'
import NIcon from '../../elements/Icon.vue'
import BreadcrumbItem from './BreadcrumbItem.vue'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<NBreadcrumbProps>()

const breadcrumbVariants = ['solid', 'link', 'text'] as const
const hasVariant = computed(() => breadcrumbVariants.some(breadcrumbVariants => props.breadcrumb?.includes(breadcrumbVariants)))
const isBaseVariant = computed(() => {
  return props.breadcrumb?.includes('~')
    || props.breadcrumb?.includes(breadcrumbVariants[2])
    || !props.breadcrumb
})

const activeBreadcrumb = computed(() => {
  if (isBaseVariant.value)
    return 'breadcrumb-active-gray'
  if (!isBaseVariant.value && !hasVariant.value)
    return 'breadcrumb-active-gray'
  if (breadcrumbVariants[0])
    return 'breadcrumb-active-primary'
  return 'breadcrumb-active-link'
})

const defaultClass = computed(() => !isBaseVariant.value && !hasVariant.value ? 'breadcrumb-default-value' : null)
</script>

<template>
  <nav
    v-bind="$attrs"
    overflow-auto
  >
    <ol flex="~ items-center" list-none text-nowrap>
      <BreadcrumbItem
        v-if="home"
        :item="home" :breadcrumb="breadcrumb"
        :active="activeBreadcrumb"
        :default-class="defaultClass"
      />
      <template v-for="(item, i) in items" :key="i">
        <li v-if="home || i !== 0" class="breadcrumb-separator">
          <slot name="separator">
            <NIcon
              name="i-heroicons:chevron-right-20-solid"
              :class="props.una?.breadcrumbSeparator"
            />
          </slot>
        </li>
        <BreadcrumbItem
          :item="item"
          :breadcrumb="breadcrumb"
          :active="activeBreadcrumb"
          :default-class="defaultClass"
        />
      </template>
    </ol>
  </nav>
</template>
