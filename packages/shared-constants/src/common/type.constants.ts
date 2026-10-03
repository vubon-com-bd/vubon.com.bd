export const DATA_TYPE = {
  STRING: 'string',
  NUMBER: 'number',
  BOOLEAN: 'boolean',
  DATE: 'date',
  DATETIME: 'datetime',
  ARRAY: 'array',
  OBJECT: 'object',
  NULL: 'null',
  UNDEFINED: 'undefined',
  UUID: 'uuid',
  JSON: 'json',
  BINARY: 'binary',
} as const;

export type DataTypeType = (typeof DATA_TYPE)[keyof typeof DATA_TYPE];
