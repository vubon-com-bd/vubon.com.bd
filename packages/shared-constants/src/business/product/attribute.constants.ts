export const ATTRIBUTE_TYPE = {
  TEXT: 'text',
  NUMBER: 'number',
  BOOLEAN: 'boolean',
  SELECT: 'select',
  MULTISELECT: 'multiselect',
  DATE: 'date',
  COLOR: 'color',
} as const;

export const ATTRIBUTE = {
  MAX_ATTRIBUTES_PER_PRODUCT: 50,
  NAME_MAX_LENGTH: 100,
  VALUE_MAX_LENGTH: 255,
  MAX_OPTIONS: 100,
  REQUIRED_DEFAULT: false,
  SEARCHABLE_DEFAULT: true,
  FILTERABLE_DEFAULT: true,
} as const;

export type AttributeType = (typeof ATTRIBUTE_TYPE)[keyof typeof ATTRIBUTE_TYPE];
