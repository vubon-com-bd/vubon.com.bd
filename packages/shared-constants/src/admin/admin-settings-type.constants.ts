/**
 * অ্যাডমিন সেটিংসের টাইপ সম্পর্কিত কনস্ট্যান্টসমূহ
 */

// সেটিংস টাইপ
export const SETTINGS_DATA_TYPES = {
  BOOLEAN: 'boolean',
  STRING: 'string',
  NUMBER: 'number',
  JSON: 'json',
  ARRAY: 'array',
  OBJECT: 'object',
  ENUM: 'enum',
} as const;

// টাইপের আইকন
export const SETTINGS_DATA_TYPE_ICONS = {
  BOOLEAN: '🔘',
  STRING: '📝',
  NUMBER: '🔢',
  JSON: '📊',
  ARRAY: '📋',
  OBJECT: '📦',
  ENUM: '🎯',
} as const;

// টাইপের ডেটা ফরম্যাট
export const SETTINGS_DATA_FORMATS = {
  BOOLEAN: {
    trueValue: true,
    falseValue: false,
    displayFormat: 'toggle',
  },
  STRING: {
    minLength: 0,
    maxLength: 255,
    displayFormat: 'text',
  },
  NUMBER: {
    min: 0,
    max: 999999,
    decimalPlaces: 2,
    displayFormat: 'number',
  },
  JSON: {
    displayFormat: 'json',
    prettyPrint: true,
  },
  ARRAY: {
    maxItems: 100,
    displayFormat: 'list',
  },
  OBJECT: {
    displayFormat: 'object',
    allowNested: true,
  },
  ENUM: {
    displayFormat: 'select',
    allowMultiple: false,
  },
} as const;

// টাইপের ভ্যালিডেশন রুলস
export const SETTINGS_DATA_TYPE_VALIDATION = {
  BOOLEAN: {
    required: true,
    type: 'boolean',
  },
  STRING: {
    required: true,
    type: 'string',
    trim: true,
  },
  NUMBER: {
    required: true,
    type: 'number',
    integer: false,
  },
  JSON: {
    required: true,
    type: 'object',
  },
  ARRAY: {
    required: true,
    type: 'array',
  },
  OBJECT: {
    required: true,
    type: 'object',
  },
  ENUM: {
    required: true,
    type: 'string',
    enum: [],
  },
} as const;

// টাইপের ডিফল্ট ভ্যালু
export const SETTINGS_DATA_TYPE_DEFAULTS = {
  BOOLEAN: false,
  STRING: '',
  NUMBER: 0,
  JSON: {},
  ARRAY: [],
  OBJECT: {},
  ENUM: '',
} as const;

// টাইপের UI কন্ট্রোল টাইপ
export const SETTINGS_UI_CONTROL_TYPES = {
  BOOLEAN: 'toggle',
  STRING: 'input',
  NUMBER: 'input',
  JSON: 'textarea',
  ARRAY: 'list',
  OBJECT: 'form',
  ENUM: 'select',
} as const;

// টাইপ গ্রুপ
export const SETTINGS_DATA_TYPE_GROUPS = {
  PRIMITIVE: ['boolean', 'string', 'number'],
  COMPLEX: ['json', 'array', 'object'],
  ENUMERATED: ['enum'],
} as const;

// টাইপের লেবেল (বাংলা)
export const SETTINGS_DATA_TYPE_LABELS_BN = {
  BOOLEAN: 'বুলিয়ান',
  STRING: 'স্ট্রিং',
  NUMBER: 'সংখ্যা',
  JSON: 'জেসন',
  ARRAY: 'অ্যারে',
  OBJECT: 'অবজেক্ট',
  ENUM: 'এনাম',
} as const;

// টাইপের লেবেল (ইংরেজি)
export const SETTINGS_DATA_TYPE_LABELS_EN = {
  BOOLEAN: 'Boolean',
  STRING: 'String',
  NUMBER: 'Number',
  JSON: 'JSON',
  ARRAY: 'Array',
  OBJECT: 'Object',
  ENUM: 'Enum',
} as const;

// টাইপের CSS ক্লাস
export const SETTINGS_DATA_TYPE_CSS_CLASSES = {
  BOOLEAN: 'type-boolean',
  STRING: 'type-string',
  NUMBER: 'type-number',
  JSON: 'type-json',
  ARRAY: 'type-array',
  OBJECT: 'type-object',
  ENUM: 'type-enum',
} as const;

// টাইপের জন্য ইমোজি
export const SETTINGS_DATA_TYPE_EMOJIS = {
  BOOLEAN: '🔄',
  STRING: '✏️',
  NUMBER: '🔢',
  JSON: '📄',
  ARRAY: '📝',
  OBJECT: '📚',
  ENUM: '🔀',
} as const;

// টাইপের UI রেন্ডার টেমপ্লেট
export const SETTINGS_UI_RENDER_TEMPLATES = {
  BOOLEAN: 'switch',
  STRING: 'text-input',
  NUMBER: 'number-input',
  JSON: 'json-editor',
  ARRAY: 'list-editor',
  OBJECT: 'form-editor',
  ENUM: 'dropdown',
} as const;

// টাইপের স্টোরেজ ফরম্যাট
export const SETTINGS_DATA_STORAGE_FORMATS = {
  BOOLEAN: 'boolean',
  STRING: 'string',
  NUMBER: 'number',
  JSON: 'jsonb',
  ARRAY: 'jsonb',
  OBJECT: 'jsonb',
  ENUM: 'string',
} as const;
