/**
 * Admin Settings Type Constants
 * Detailed settings type definitions
 */

export const ADMIN_SETTINGS_TYPE = {
  // Basic types
  STRING: 'string',
  NUMBER: 'number',
  BOOLEAN: 'boolean',
  NULL: 'null',
  UNDEFINED: 'undefined',

  // Complex types
  ARRAY: 'array',
  OBJECT: 'object',
  JSON: 'json',
  YAML: 'yaml',
  XML: 'xml',
  CSV: 'csv',

  // Text types
  TEXT: 'text',
  TEXTAREA: 'textarea',
  RICH_TEXT: 'rich_text',
  HTML: 'html',
  MARKDOWN: 'markdown',

  // Numeric types
  INTEGER: 'integer',
  FLOAT: 'float',
  DECIMAL: 'decimal',
  PERCENTAGE: 'percentage',
  CURRENCY: 'currency',

  // Date/time types
  DATE: 'date',
  TIME: 'time',
  DATETIME: 'datetime',
  TIMESTAMP: 'timestamp',
  DURATION: 'duration',
  INTERVAL: 'interval',

  // Contact types
  EMAIL: 'email',
  PHONE: 'phone',
  URL: 'url',
  ADDRESS: 'address',
  SOCIAL: 'social',

  // Selection types
  SELECT: 'select',
  MULTI_SELECT: 'multi_select',
  RADIO: 'radio',
  CHECKBOX: 'checkbox',
  TOGGLE: 'toggle',
  DROPDOWN: 'dropdown',

  // Range types
  SLIDER: 'slider',
  RANGE: 'range',
  COLOR: 'color',
  FONT: 'font',

  // File types
  FILE: 'file',
  IMAGE: 'image',
  VIDEO: 'video',
  AUDIO: 'audio',
  DOCUMENT: 'document',

  // Security types
  PASSWORD: 'password',
  TOKEN: 'token',
  KEY: 'key',
  CERTIFICATE: 'certificate',

  // Advanced types
  EXPRESSION: 'expression',
  QUERY: 'query',
  FILTER: 'filter',
  SORT: 'sort',
  GROUP: 'group',
  AGGREGATE: 'aggregate',

  // Integration types
  API_KEY: 'api_key',
  WEBHOOK_URL: 'webhook_url',
  ENDPOINT: 'endpoint',
  SECRET: 'secret',

  // System types
  PATH: 'path',
  ENV: 'env',
  CONFIG: 'config',
  TEMPLATE: 'template',

  // UI types
  LAYOUT: 'layout',
  THEME: 'theme',
  STYLE: 'style',
  ICON: 'icon',
} as const;

export type AdminSettingsTypeDetail =
  (typeof ADMIN_SETTINGS_TYPE)[keyof typeof ADMIN_SETTINGS_TYPE];

export const ADMIN_SETTINGS_TYPE_CATEGORIES: Record<AdminSettingsTypeDetail, string> = {
  // Basic types
  [ADMIN_SETTINGS_TYPE.STRING]: 'basic',
  [ADMIN_SETTINGS_TYPE.NUMBER]: 'basic',
  [ADMIN_SETTINGS_TYPE.BOOLEAN]: 'basic',
  [ADMIN_SETTINGS_TYPE.NULL]: 'basic',
  [ADMIN_SETTINGS_TYPE.UNDEFINED]: 'basic',

  // Complex types
  [ADMIN_SETTINGS_TYPE.ARRAY]: 'complex',
  [ADMIN_SETTINGS_TYPE.OBJECT]: 'complex',
  [ADMIN_SETTINGS_TYPE.JSON]: 'complex',
  [ADMIN_SETTINGS_TYPE.YAML]: 'complex',
  [ADMIN_SETTINGS_TYPE.XML]: 'complex',
  [ADMIN_SETTINGS_TYPE.CSV]: 'complex',

  // Text types
  [ADMIN_SETTINGS_TYPE.TEXT]: 'text',
  [ADMIN_SETTINGS_TYPE.TEXTAREA]: 'text',
  [ADMIN_SETTINGS_TYPE.RICH_TEXT]: 'text',
  [ADMIN_SETTINGS_TYPE.HTML]: 'text',
  [ADMIN_SETTINGS_TYPE.MARKDOWN]: 'text',

  // Numeric types
  [ADMIN_SETTINGS_TYPE.INTEGER]: 'numeric',
  [ADMIN_SETTINGS_TYPE.FLOAT]: 'numeric',
  [ADMIN_SETTINGS_TYPE.DECIMAL]: 'numeric',
  [ADMIN_SETTINGS_TYPE.PERCENTAGE]: 'numeric',
  [ADMIN_SETTINGS_TYPE.CURRENCY]: 'numeric',

  // Date/time types
  [ADMIN_SETTINGS_TYPE.DATE]: 'datetime',
  [ADMIN_SETTINGS_TYPE.TIME]: 'datetime',
  [ADMIN_SETTINGS_TYPE.DATETIME]: 'datetime',
  [ADMIN_SETTINGS_TYPE.TIMESTAMP]: 'datetime',
  [ADMIN_SETTINGS_TYPE.DURATION]: 'datetime',
  [ADMIN_SETTINGS_TYPE.INTERVAL]: 'datetime',

  // Contact types
  [ADMIN_SETTINGS_TYPE.EMAIL]: 'contact',
  [ADMIN_SETTINGS_TYPE.PHONE]: 'contact',
  [ADMIN_SETTINGS_TYPE.URL]: 'contact',
  [ADMIN_SETTINGS_TYPE.ADDRESS]: 'contact',
  [ADMIN_SETTINGS_TYPE.SOCIAL]: 'contact',

  // Selection types
  [ADMIN_SETTINGS_TYPE.SELECT]: 'selection',
  [ADMIN_SETTINGS_TYPE.MULTI_SELECT]: 'selection',
  [ADMIN_SETTINGS_TYPE.RADIO]: 'selection',
  [ADMIN_SETTINGS_TYPE.CHECKBOX]: 'selection',
  [ADMIN_SETTINGS_TYPE.TOGGLE]: 'selection',
  [ADMIN_SETTINGS_TYPE.DROPDOWN]: 'selection',

  // Range types
  [ADMIN_SETTINGS_TYPE.SLIDER]: 'range',
  [ADMIN_SETTINGS_TYPE.RANGE]: 'range',
  [ADMIN_SETTINGS_TYPE.COLOR]: 'range',
  [ADMIN_SETTINGS_TYPE.FONT]: 'range',

  // File types
  [ADMIN_SETTINGS_TYPE.FILE]: 'file',
  [ADMIN_SETTINGS_TYPE.IMAGE]: 'file',
  [ADMIN_SETTINGS_TYPE.VIDEO]: 'file',
  [ADMIN_SETTINGS_TYPE.AUDIO]: 'file',
  [ADMIN_SETTINGS_TYPE.DOCUMENT]: 'file',

  // Security types
  [ADMIN_SETTINGS_TYPE.PASSWORD]: 'security',
  [ADMIN_SETTINGS_TYPE.TOKEN]: 'security',
  [ADMIN_SETTINGS_TYPE.KEY]: 'security',
  [ADMIN_SETTINGS_TYPE.CERTIFICATE]: 'security',

  // Advanced types
  [ADMIN_SETTINGS_TYPE.EXPRESSION]: 'advanced',
  [ADMIN_SETTINGS_TYPE.QUERY]: 'advanced',
  [ADMIN_SETTINGS_TYPE.FILTER]: 'advanced',
  [ADMIN_SETTINGS_TYPE.SORT]: 'advanced',
  [ADMIN_SETTINGS_TYPE.GROUP]: 'advanced',
  [ADMIN_SETTINGS_TYPE.AGGREGATE]: 'advanced',

  // Integration types
  [ADMIN_SETTINGS_TYPE.API_KEY]: 'integration',
  [ADMIN_SETTINGS_TYPE.WEBHOOK_URL]: 'integration',
  [ADMIN_SETTINGS_TYPE.ENDPOINT]: 'integration',
  [ADMIN_SETTINGS_TYPE.SECRET]: 'integration',

  // System types
  [ADMIN_SETTINGS_TYPE.PATH]: 'system',
  [ADMIN_SETTINGS_TYPE.ENV]: 'system',
  [ADMIN_SETTINGS_TYPE.CONFIG]: 'system',
  [ADMIN_SETTINGS_TYPE.TEMPLATE]: 'system',

  // UI types
  [ADMIN_SETTINGS_TYPE.LAYOUT]: 'ui',
  [ADMIN_SETTINGS_TYPE.THEME]: 'ui',
  [ADMIN_SETTINGS_TYPE.STYLE]: 'ui',
  [ADMIN_SETTINGS_TYPE.ICON]: 'ui',
};

export const ADMIN_SETTINGS_TYPE_LABELS_DETAIL: Record<AdminSettingsTypeDetail, string> = {
  // Basic types
  [ADMIN_SETTINGS_TYPE.STRING]: 'String',
  [ADMIN_SETTINGS_TYPE.NUMBER]: 'Number',
  [ADMIN_SETTINGS_TYPE.BOOLEAN]: 'Boolean',
  [ADMIN_SETTINGS_TYPE.NULL]: 'Null',
  [ADMIN_SETTINGS_TYPE.UNDEFINED]: 'Undefined',

  // Complex types
  [ADMIN_SETTINGS_TYPE.ARRAY]: 'Array',
  [ADMIN_SETTINGS_TYPE.OBJECT]: 'Object',
  [ADMIN_SETTINGS_TYPE.JSON]: 'JSON',
  [ADMIN_SETTINGS_TYPE.YAML]: 'YAML',
  [ADMIN_SETTINGS_TYPE.XML]: 'XML',
  [ADMIN_SETTINGS_TYPE.CSV]: 'CSV',

  // Text types
  [ADMIN_SETTINGS_TYPE.TEXT]: 'Text',
  [ADMIN_SETTINGS_TYPE.TEXTAREA]: 'Textarea',
  [ADMIN_SETTINGS_TYPE.RICH_TEXT]: 'Rich Text',
  [ADMIN_SETTINGS_TYPE.HTML]: 'HTML',
  [ADMIN_SETTINGS_TYPE.MARKDOWN]: 'Markdown',

  // Numeric types
  [ADMIN_SETTINGS_TYPE.INTEGER]: 'Integer',
  [ADMIN_SETTINGS_TYPE.FLOAT]: 'Float',
  [ADMIN_SETTINGS_TYPE.DECIMAL]: 'Decimal',
  [ADMIN_SETTINGS_TYPE.PERCENTAGE]: 'Percentage',
  [ADMIN_SETTINGS_TYPE.CURRENCY]: 'Currency',

  // Date/time types
  [ADMIN_SETTINGS_TYPE.DATE]: 'Date',
  [ADMIN_SETTINGS_TYPE.TIME]: 'Time',
  [ADMIN_SETTINGS_TYPE.DATETIME]: 'DateTime',
  [ADMIN_SETTINGS_TYPE.TIMESTAMP]: 'Timestamp',
  [ADMIN_SETTINGS_TYPE.DURATION]: 'Duration',
  [ADMIN_SETTINGS_TYPE.INTERVAL]: 'Interval',

  // Contact types
  [ADMIN_SETTINGS_TYPE.EMAIL]: 'Email',
  [ADMIN_SETTINGS_TYPE.PHONE]: 'Phone',
  [ADMIN_SETTINGS_TYPE.URL]: 'URL',
  [ADMIN_SETTINGS_TYPE.ADDRESS]: 'Address',
  [ADMIN_SETTINGS_TYPE.SOCIAL]: 'Social',

  // Selection types
  [ADMIN_SETTINGS_TYPE.SELECT]: 'Select',
  [ADMIN_SETTINGS_TYPE.MULTI_SELECT]: 'Multi-Select',
  [ADMIN_SETTINGS_TYPE.RADIO]: 'Radio',
  [ADMIN_SETTINGS_TYPE.CHECKBOX]: 'Checkbox',
  [ADMIN_SETTINGS_TYPE.TOGGLE]: 'Toggle',
  [ADMIN_SETTINGS_TYPE.DROPDOWN]: 'Dropdown',

  // Range types
  [ADMIN_SETTINGS_TYPE.SLIDER]: 'Slider',
  [ADMIN_SETTINGS_TYPE.RANGE]: 'Range',
  [ADMIN_SETTINGS_TYPE.COLOR]: 'Color',
  [ADMIN_SETTINGS_TYPE.FONT]: 'Font',

  // File types
  [ADMIN_SETTINGS_TYPE.FILE]: 'File',
  [ADMIN_SETTINGS_TYPE.IMAGE]: 'Image',
  [ADMIN_SETTINGS_TYPE.VIDEO]: 'Video',
  [ADMIN_SETTINGS_TYPE.AUDIO]: 'Audio',
  [ADMIN_SETTINGS_TYPE.DOCUMENT]: 'Document',

  // Security types
  [ADMIN_SETTINGS_TYPE.PASSWORD]: 'Password',
  [ADMIN_SETTINGS_TYPE.TOKEN]: 'Token',
  [ADMIN_SETTINGS_TYPE.KEY]: 'Key',
  [ADMIN_SETTINGS_TYPE.CERTIFICATE]: 'Certificate',

  // Advanced types
  [ADMIN_SETTINGS_TYPE.EXPRESSION]: 'Expression',
  [ADMIN_SETTINGS_TYPE.QUERY]: 'Query',
  [ADMIN_SETTINGS_TYPE.FILTER]: 'Filter',
  [ADMIN_SETTINGS_TYPE.SORT]: 'Sort',
  [ADMIN_SETTINGS_TYPE.GROUP]: 'Group',
  [ADMIN_SETTINGS_TYPE.AGGREGATE]: 'Aggregate',

  // Integration types
  [ADMIN_SETTINGS_TYPE.API_KEY]: 'API Key',
  [ADMIN_SETTINGS_TYPE.WEBHOOK_URL]: 'Webhook URL',
  [ADMIN_SETTINGS_TYPE.ENDPOINT]: 'Endpoint',
  [ADMIN_SETTINGS_TYPE.SECRET]: 'Secret',

  // System types
  [ADMIN_SETTINGS_TYPE.PATH]: 'Path',
  [ADMIN_SETTINGS_TYPE.ENV]: 'Environment',
  [ADMIN_SETTINGS_TYPE.CONFIG]: 'Config',
  [ADMIN_SETTINGS_TYPE.TEMPLATE]: 'Template',

  // UI types
  [ADMIN_SETTINGS_TYPE.LAYOUT]: 'Layout',
  [ADMIN_SETTINGS_TYPE.THEME]: 'Theme',
  [ADMIN_SETTINGS_TYPE.STYLE]: 'Style',
  [ADMIN_SETTINGS_TYPE.ICON]: 'Icon',
};

export function getAdminSettingsTypeCategory(type: AdminSettingsTypeDetail): string {
  return ADMIN_SETTINGS_TYPE_CATEGORIES[type] || 'other';
}

export function getAdminSettingsTypeLabel(type: AdminSettingsTypeDetail): string {
  return ADMIN_SETTINGS_TYPE_LABELS_DETAIL[type] || 'Unknown Type';
}

export function isBasicType(type: AdminSettingsTypeDetail): boolean {
  return getAdminSettingsTypeCategory(type) === 'basic';
}

export function isComplexType(type: AdminSettingsTypeDetail): boolean {
  return getAdminSettingsTypeCategory(type) === 'complex';
}

export function isTextType(type: AdminSettingsTypeDetail): boolean {
  return getAdminSettingsTypeCategory(type) === 'text';
}

export function isNumericType(type: AdminSettingsTypeDetail): boolean {
  return getAdminSettingsTypeCategory(type) === 'numeric';
}

export function isDateTimeType(type: AdminSettingsTypeDetail): boolean {
  return getAdminSettingsTypeCategory(type) === 'datetime';
}

export function isContactType(type: AdminSettingsTypeDetail): boolean {
  return getAdminSettingsTypeCategory(type) === 'contact';
}

export function isSelectionType(type: AdminSettingsTypeDetail): boolean {
  return getAdminSettingsTypeCategory(type) === 'selection';
}

export function isRangeType(type: AdminSettingsTypeDetail): boolean {
  return getAdminSettingsTypeCategory(type) === 'range';
}

export function isFileType(type: AdminSettingsTypeDetail): boolean {
  return getAdminSettingsTypeCategory(type) === 'file';
}

export function isSecurityType(type: AdminSettingsTypeDetail): boolean {
  return getAdminSettingsTypeCategory(type) === 'security';
}

export function isIntegrationType(type: AdminSettingsTypeDetail): boolean {
  return getAdminSettingsTypeCategory(type) === 'integration';
}

export function isSystemType(type: AdminSettingsTypeDetail): boolean {
  return getAdminSettingsTypeCategory(type) === 'system';
}

export function isUIType(type: AdminSettingsTypeDetail): boolean {
  return getAdminSettingsTypeCategory(type) === 'ui';
}

export function getSettingsTypeCategory(type: AdminSettingsTypeDetail): string {
  return ADMIN_SETTINGS_TYPE_CATEGORIES[type] || 'other';
}
