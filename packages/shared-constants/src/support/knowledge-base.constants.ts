export const KNOWLEDGE_BASE_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  UNPUBLISHED: 'unpublished',
  ARCHIVED: 'archived',
  REVIEW_PENDING: 'review_pending',
} as const;

export const KNOWLEDGE_BASE_TYPE = {
  ARTICLE: 'article',
  GUIDE: 'guide',
  TUTORIAL: 'tutorial',
  VIDEO: 'video',
  CHECKLIST: 'checklist',
  TEMPLATE: 'template',
  DOCUMENTATION: 'documentation',
} as const;

export const KNOWLEDGE_BASE_VISIBILITY = {
  PUBLIC: 'public',
  INTERNAL: 'internal',
  AGENT_ONLY: 'agent_only',
  CUSTOMER_ONLY: 'customer_only',
  RESTRICTED: 'restricted',
} as const;

export const KNOWLEDGE_BASE = {
  STATUS: KNOWLEDGE_BASE_STATUS,
  TYPE: KNOWLEDGE_BASE_TYPE,
  VISIBILITY: KNOWLEDGE_BASE_VISIBILITY,
  TITLE_MAX_LENGTH: 200,
  CONTENT_MAX_LENGTH: 100000,
  SUMMARY_MAX_LENGTH: 500,
  MAX_TAGS: 20,
  MAX_CATEGORIES: 100,
  MAX_ATTACHMENTS: 20,
  MAX_ATTACHMENT_SIZE_MB: 25,
  MAX_VERSIONS: 50,
  REVIEW_INTERVAL_DAYS: 180,
  RETENTION_DAYS: 1825,
} as const;

export type KnowledgeBaseStatusType =
  (typeof KNOWLEDGE_BASE_STATUS)[keyof typeof KNOWLEDGE_BASE_STATUS];
export type KnowledgeBaseTypeType = (typeof KNOWLEDGE_BASE_TYPE)[keyof typeof KNOWLEDGE_BASE_TYPE];
export type KnowledgeBaseVisibilityType =
  (typeof KNOWLEDGE_BASE_VISIBILITY)[keyof typeof KNOWLEDGE_BASE_VISIBILITY];
