import type { HTMLAttributes } from 'vue'

interface Extensions { class?: HTMLAttributes['class'] }

export interface NBreadcrumbProps extends Extensions {
  /**
   * Allows you to add `UnaUI` breadcrumb preset properties,
   * Think of it as a shortcut for adding options or variants to the preset if available.
   *
   * @see https://github.com/una-ui/una-ui/blob/main/packages/preset/src/_shortcuts/breadcrumb.ts
   * @example
   * breadcrumb="green""
   */
  breadcrumb?: string
  /**
   * Configuration for the home icon/name.
   */
  home?: NBreadcrumbItemProps
  /**
   *  An array of children BreadcrumbItem.
   */
  items?: NBreadcrumbItemProps[]
  /**
   * `UnaUI` preset configuration
   *
   * @see https://github.com/una-ui/una-ui/blob/main/packages/preset/src/_shortcuts/breadcrumb.ts
   */
  una?: {
    // base
    breadcrumb?: HTMLAttributes['class']
    breadcrumbSeparator?: HTMLAttributes['class']
  }
}

export interface NBreadcrumbItemProps extends Extensions {
  /**
   * Property name or getter function to use as the label of an item.
   */
  label?: string
  /**
   * Icon of the item.
   */
  icon?: string
  /**
   * Url of the item.
   */
  url?: string
}
