<script setup lang="ts">
import type { NInputProps } from '../../types'
import { computed, onMounted, ref } from 'vue'
import { cn, looseToNumber, randomId } from '../../utils'
import NIcon from '../elements/Icon.vue'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<NInputProps>(), {
  size: 'md',
  type: 'text',
  resize: 'none',
  rows: 0,
  autofocusDelay: 0,
})

const emit = defineEmits([
  'leading',
  'trailing',
  'update:modelValue',
  'change',
  'blur',
])

const slots = defineSlots<{
  leading?: any
  trailing?: any
}>()

const [modelValue, modelModifiers] = defineModel<string | number | null | undefined>()

const id = props.id ?? randomId('input')

const isLeading = computed(() => props.leading || slots.leading)
const isTrailing = computed(() => props.trailing || slots.trailing || props.status || props.loading)

const inputVariants = ['outline', 'solid'] as const
const hasVariant = computed(() => inputVariants.some(inputVariants => props.input?.includes(inputVariants)))
const isBaseVariant = computed(() => props.input?.includes('~'))

const statusClassVariants = computed(() => {
  const input = {
    info: 'input-status-info input-solid-info input-status-ring',
    success: 'input-status-success input-solid-success input-status-ring',
    warning: 'input-status-warning input-solid-warning input-status-ring',
    error: 'input-status-error input-solid-error input-status-ring',
    default: !hasVariant.value && !isBaseVariant.value ? 'input-default-variant' : '',
  }

  const text = {
    info: 'text-info',
    success: 'text-success',
    warning: 'text-warning',
    error: 'text-error',
    default: '',
  }

  const icon = {
    info: props.una?.inputWarningIcon ?? 'input-info-icon',
    success: props.una?.inputSuccessIcon ?? 'input-success-icon',
    warning: props.una?.inputWarningIcon ?? 'input-warning-icon',
    error: props.una?.inputErrorIcon ?? 'input-error-icon',
    default: '',
  }

  return {
    input: input[props.status ?? 'default'],
    text: text[props.status ?? 'default'],
    icon: icon[props.status ?? 'default'],
  }
})

const reverseClassVariants = computed(() => {
  const input = {
    false: [{ 'input-leading-padding': isLeading.value }, { 'input-trailing-padding': isTrailing.value }],
    true: [{ 'input-trailing-padding': isLeading.value }, { 'input-leading-padding': isTrailing.value }],
  }

  return {
    input: input[props.reverse ? 'true' : 'false'],
    leadingWrapper: props.reverse ? 'input-trailing-wrapper' : 'input-leading-wrapper',
    trailingWrapper: props.reverse ? 'input-leading-wrapper' : 'input-trailing-wrapper',
  }
})

// html refs
const inputRef = ref<HTMLTextAreaElement>()

function resizeTextarea(): void {
  if (!(props.type === 'textarea' && props.autoresize) || !inputRef.value)
    return

  inputRef.value.rows = props.rows

  const styles = window.getComputedStyle(inputRef.value)
  const paddingTop = Number.parseInt(styles.paddingTop)
  const paddingBottom = Number.parseInt(styles.paddingBottom)
  const padding = paddingTop + paddingBottom
  const lineHeight = Number.parseInt(styles.lineHeight)
  const { scrollHeight } = inputRef.value
  const newRows = (scrollHeight - padding) / lineHeight

  if (newRows > props.rows)
    inputRef.value.rows = newRows

  const maxAutoresizeRows = typeof props.autoresize === 'number' ? props.autoresize : Number.POSITIVE_INFINITY
  if (inputRef.value.rows > maxAutoresizeRows)
    inputRef.value.rows = maxAutoresizeRows
}

function updateInput(value: string | null) {
  if (modelModifiers.trim) {
    value = value?.trim() ?? null
  }

  if (modelModifiers.number || props.type === 'number') {
    value = looseToNumber(value)
  }

  if (modelModifiers.nullify) {
    value ||= null
  }

  modelValue.value = value
  emit('update:modelValue', value)
}

function onInput(event: Event): void {
  if (!modelModifiers.lazy) {
    updateInput((event.target as HTMLInputElement).value)
  }

  resizeTextarea()
}

function onChange(event: Event) {
  const value = (event.target as HTMLInputElement).value

  if (modelModifiers.lazy) {
    updateInput(value)
  }

  // Update trimmed input so that it has same behavior as native input https://github.com/vuejs/core/blob/5ea8a8a4fab4e19a71e123e4d27d051f5e927172/packages/runtime-dom/src/directives/vModel.ts#L63
  if (modelModifiers.trim) {
    (event.target as HTMLInputElement).value = value.trim()
  }

  emit('change', event)
}

function onBlur(event: FocusEvent) {
  emit('blur', event)
}

onMounted(() => {
  setTimeout(() => {
    autoFocus()
  }, props.autofocusDelay)

  resizeTextarea()
})

function autoFocus() {
  if (props.autofocus) {
    inputRef.value?.focus()
  }
}

defineExpose({
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
  select: () => inputRef.value?.select(),
  inputRef,
})
</script>

<template>
  <div
    :size
    :class="cn(
      'input-wrapper',
      una?.inputWrapper,
    )"
    v-bind="_inputWrapper"
  >
    <div
      v-if="isLeading"
      :class="cn(
        una?.inputLeadingWrapper,
        reverseClassVariants.leadingWrapper,
        statusClassVariants.text,
      )"
    >
      <slot name="leading">
        <NIcon
          v-if="leading"
          :name="leading"
          :class="cn(
            'input-leading',
            una?.inputLeading,
          )"
          @click="emit('leading')"
        />
      </slot>
    </div>

    <component
      :is="props.type !== 'textarea' ? 'input' : 'textarea'"
      :id
      ref="inputRef"
      :value="modelValue"
      :type="props.type !== 'textarea' ? props.type : undefined"
      :class="cn(
        'input',
        type === 'textarea' ? 'input-textarea' : 'input-input',
        statusClassVariants.input,
        reverseClassVariants.input,
        una?.input,
      )"
      :input
      :resize="type === 'textarea' ? resize : undefined"
      :rows="type === 'textarea' ? rows : undefined"
      :cols="type === 'textarea' ? cols : undefined"
      v-bind="$attrs"
      @input="onInput"
      @blur="onBlur"
      @change="onChange"
    />

    <div
      v-if="isTrailing"
      :class="cn(
        una?.inputTrailingWrapper,
        reverseClassVariants.trailingWrapper,
        statusClassVariants.text,
      )"
    >
      <NIcon
        v-if="loading"
        :name="una?.inputLoadingIcon ?? 'input-loading-icon'"
        :class="cn(
          'input-loading',
          una?.inputLoading,
        )"
      />

      <NIcon
        v-else-if="status"
        :name="statusClassVariants.icon"
        :class="cn(
          'input-status-icon-base',
          una?.inputStatusIconBase,
        )"
      />

      <slot v-else name="trailing">
        <NIcon
          v-if="trailing"
          :class="cn(
            'input-trailing',
            una?.inputTrailing,
          )"
          :name="trailing"
          @click="emit('trailing')"
        />
      </slot>
    </div>
  </div>
</template>
