export const REPORT_TEMPLATE_TYPE = {
  STANDARD: 'standard',
  CUSTOM: 'custom',
  PREBUILT: 'prebuilt',
  USER_DEFINED: 'user_defined',
  SYSTEM: 'system',
} as const;

export const REPORT_TEMPLATE_CATEGORY = {
  FINANCE: 'finance',
  SALES: 'sales',
  MARKETING: 'marketing',
  OPERATIONS: 'operations',
  CUSTOMER: 'customer',
  INVENTORY: 'inventory',
  HR: 'hr',
  SYSTEM: 'system',
} as const;

export const REPORT_TEMPLATE_STATUS = {
  DRAFT: 'draft',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  ARCHIVED: 'archived',
  DEPRECATED: 'deprecated',
} as const;

export const REPORT_TEMPLATE = {
  NAME_MAX_LENGTH: 150,
  DESCRIPTION_MAX_LENGTH: 1000,
  MAX_SECTIONS: 50,
  MAX_COLUMNS: 200,
  MAX_FILTERS: 30,
  MAX_GROUPS: 20,
  MAX_SORTS: 10,
  MAX_VERSIONS: 20,
  MAX_CUSTOM_FIELDS: 100,
  RETENTION_DAYS: 365,
  SUPPORT_MARKDOWN: true,
  SUPPORT_HTML: true,
} as const;

export type ReportTemplateTypeType =
  (typeof REPORT_TEMPLATE_TYPE)[keyof typeof REPORT_TEMPLATE_TYPE];
export type ReportTemplateCategoryType =
  (typeof REPORT_TEMPLATE_CATEGORY)[keyof typeof REPORT_TEMPLATE_CATEGORY];
export type ReportTemplateStatusType =
  (typeof REPORT_TEMPLATE_STATUS)[keyof typeof REPORT_TEMPLATE_STATUS];
