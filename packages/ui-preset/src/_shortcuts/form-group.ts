export const miscFormGroup = {
  'form-group-wrapper': 'space-y-2 flex flex-col',
  'form-group-top-wrapper': 'flex flex-col',
  'form-group-bottom-wrapper': 'flex justify-between items-start space-x-2',
  'form-group-top-wrapper-inner': 'flex justify-between items-end',

  'form-group-label-base': 'block text-sm font-medium text-$c-gray-900',
  'form-group-label-required': 'after:content-[\'*\'] after:ms-0.5 after:text-error',
  'form-group-hint-wrapper': 'text-sm text-$c-gray-500',
  'form-group-description-wrapper': 'text-sm leading-4 text-$c-gray-500',

  'form-group-error-message': 'text-sm text-error',
  'form-group-help-message': 'text-sm text-$c-gray-500',

  'form-group-counter-wrapper': 'text-sm',
  'form-group-counter-error': 'text-error',
  'form-group-counter-current': 'text-$c-gray-900',
  'form-group-counter-separator': 'text-$c-gray-500',
  'form-group-counter-max': 'text-$c-gray-500',
}

export const staticFormGroup = {
}

export const dynamicFormGroup = [
]

export const formGroup = [
  ...dynamicFormGroup,
  staticFormGroup,
  miscFormGroup,
]
