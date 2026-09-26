export const SUPPORT_TEMPLATE_TYPE = {
  GREETING: 'greeting',
  CLOSING: 'closing',
  RESOLUTION: 'resolution',
  ESCALATION: 'escalation',
  FOLLOW_UP: 'follow_up',
  APOLOGY: 'apology',
  THANK_YOU: 'thank_you',
  AUTO_REPLY: 'auto_reply',
  NOTIFICATION: 'notification',
  SURVEY_INVITE: 'survey_invite',
} as const;

export const SUPPORT_TEMPLATE_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DRAFT: 'draft',
  ARCHIVED: 'archived',
} as const;

export const SUPPORT_TEMPLATE_VARIABLE = {
  CUSTOMER_NAME: 'customer_name',
  AGENT_NAME: 'agent_name',
  TICKET_NUMBER: 'ticket_number',
  ORDER_ID: 'order_id',
  PRODUCT_NAME: 'product_name',
  COMPANY_NAME: 'company_name',
  DUE_DATE: 'due_date',
  RESOLUTION_URL: 'resolution_url',
  SURVEY_URL: 'survey_url',
} as const;

export const SUPPORT_TEMPLATE = {
  TYPE: SUPPORT_TEMPLATE_TYPE,
  STATUS: SUPPORT_TEMPLATE_STATUS,
  VARIABLE: SUPPORT_TEMPLATE_VARIABLE,
  MAX_CONTENT_LENGTH: 5000,
  MAX_VARIABLES: 20,
  MAX_TEMPLATES_PER_TYPE: 10,
  NAME_MAX_LENGTH: 100,
  DESCRIPTION_MAX_LENGTH: 500,
} as const;

export type SupportTemplateTypeType =
  (typeof SUPPORT_TEMPLATE_TYPE)[keyof typeof SUPPORT_TEMPLATE_TYPE];
export type SupportTemplateStatusType =
  (typeof SUPPORT_TEMPLATE_STATUS)[keyof typeof SUPPORT_TEMPLATE_STATUS];
export type SupportTemplateVariableType =
  (typeof SUPPORT_TEMPLATE_VARIABLE)[keyof typeof SUPPORT_TEMPLATE_VARIABLE];
