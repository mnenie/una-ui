type BreadcrumbPrefix = 'breadcrumb'

export const staticBreadcrumb: Record<`${BreadcrumbPrefix}-${string}` | BreadcrumbPrefix, string> = {
  // config
  'breadcrumb-default-variant': 'breadcrumb-gray',

  // base
  'breadcrumb': 'overflow-auto breadcrumb-default-variant text-sm',
  'breadcrumb-list': 'inline-flex items-center gap-1.5',
  'breadcrumb-disabled': 'disabled:n-disabled',
  'breadcrumb-icon': 'pt-1',
  'breadcrumb-item': 'inline-flex items-center gap-1',
  'breadcrumb-separator': 'flex-shrink-0 text-$c-gray-400 dark:text-$c-gray-200 mx-1',

  // variants active
  'breadcrumb-active': 'text-$c-gray-700 dark:text-$c-gray-700',
  'breadcrumb-active-primary': '!text-primary',
  'breadcrumb-active-link': '!text-primary !underline-offset-4 !underline',
}

export const dynamicBreadcrumb: [RegExp, (params: RegExpExecArray) => string][] = [
  [/^breadcrumb-solid(-(\S+))?$/, ([, , c = 'primary']) => `text-${c}-400 dark:text-${c}-200 hover:text-${c}-600 dark:hover:text-${c}-500 active:text-${c}-600 dark:active:text-${c}-700`],
  [/^breadcrumb-text(-(\S+))?$/, ([, , c = 'gray']) => `text-${c}-400 dark:text-${c}-400 hover:text-${c}-700 dark:hover:text-${c}-200`],
  [/^breadcrumb-link(-(\S+))?$/, ([, , c = 'primary']) => `text-${c}-400 dark:text-${c}-200 hover:underline underline-offset-4 hover:text-${c}-600 dark:hover:text-${c}-500`],
]

export const breadcrumb = [
  ...dynamicBreadcrumb,
  staticBreadcrumb,
]
