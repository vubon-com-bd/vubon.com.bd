/**
 * Knowledge Base Constants
 * Configuration for knowledge base system
 */

export const KNOWLEDGE_BASE = {
  // Knowledge Base Types
  TYPES: {
    PUBLIC: 'public',
    PRIVATE: 'private',
    INTERNAL: 'internal',
    RESTRICTED: 'restricted',
  } as const,

  // Knowledge Base Statuses
  STATUS: {
    DRAFT: 'draft',
    PUBLISHED: 'published',
    ARCHIVED: 'archived',
    REVIEW: 'review',
    UPDATING: 'updating',
    DEPRECATED: 'deprecated',
  } as const,

  // Knowledge Base Languages
  LANGUAGES: {
    BENGALI: 'bn',
    ENGLISH: 'en',
  } as const,

  // Knowledge Base Formats
  FORMATS: {
    PLAIN: 'plain',
    MARKDOWN: 'markdown',
    HTML: 'html',
    WIKI: 'wiki',
  } as const,

  // Knowledge Base Limits
  LIMITS: {
    MAX_TITLE_LENGTH: 200,
    MAX_DESCRIPTION_LENGTH: 500,
    MAX_CONTENT_LENGTH: 50000,
    MAX_TAGS: 20,
    MAX_CATEGORIES: 10,
    MAX_ATTACHMENTS: 10,
    MAX_VERSIONS: 100,
  } as const,

  // Knowledge Base Roles
  ROLES: {
    VIEWER: 'viewer',
    CONTRIBUTOR: 'contributor',
    EDITOR: 'editor',
    REVIEWER: 'reviewer',
    ADMIN: 'admin',
  } as const,

  // Knowledge Base Permissions
  PERMISSIONS: {
    VIEW: 'view',
    CREATE: 'create',
    EDIT: 'edit',
    DELETE: 'delete',
    PUBLISH: 'publish',
    ARCHIVE: 'archive',
    REVIEW: 'review',
    MANAGE: 'manage',
  } as const,
} as const;

// Knowledge Base Types
export type KnowledgeBaseType = (typeof KNOWLEDGE_BASE.TYPES)[keyof typeof KNOWLEDGE_BASE.TYPES];

// Knowledge Base Statuses
export type KnowledgeBaseStatus =
  (typeof KNOWLEDGE_BASE.STATUS)[keyof typeof KNOWLEDGE_BASE.STATUS];

// Knowledge Base Languages
export type KnowledgeBaseLanguage =
  (typeof KNOWLEDGE_BASE.LANGUAGES)[keyof typeof KNOWLEDGE_BASE.LANGUAGES];

// Knowledge Base Formats
export type KnowledgeBaseFormat =
  (typeof KNOWLEDGE_BASE.FORMATS)[keyof typeof KNOWLEDGE_BASE.FORMATS];

// Knowledge Base Roles
export type KnowledgeBaseRole = (typeof KNOWLEDGE_BASE.ROLES)[keyof typeof KNOWLEDGE_BASE.ROLES];

// Knowledge Base Permissions
export type KnowledgeBasePermission =
  (typeof KNOWLEDGE_BASE.PERMISSIONS)[keyof typeof KNOWLEDGE_BASE.PERMISSIONS];

// Utility Functions
export function knowledgeBaseGetTypeLabel(type: KnowledgeBaseType): string {
  const labels: Record<KnowledgeBaseType, string> = {
    [KNOWLEDGE_BASE.TYPES.PUBLIC]: 'Public',
    [KNOWLEDGE_BASE.TYPES.PRIVATE]: 'Private',
    [KNOWLEDGE_BASE.TYPES.INTERNAL]: 'Internal',
    [KNOWLEDGE_BASE.TYPES.RESTRICTED]: 'Restricted',
  };
  return labels[type] || 'Unknown';
}

export function knowledgeBaseGetStatusLabel(status: KnowledgeBaseStatus): string {
  const labels: Record<KnowledgeBaseStatus, string> = {
    [KNOWLEDGE_BASE.STATUS.DRAFT]: 'Draft',
    [KNOWLEDGE_BASE.STATUS.PUBLISHED]: 'Published',
    [KNOWLEDGE_BASE.STATUS.ARCHIVED]: 'Archived',
    [KNOWLEDGE_BASE.STATUS.REVIEW]: 'In Review',
    [KNOWLEDGE_BASE.STATUS.UPDATING]: 'Updating',
    [KNOWLEDGE_BASE.STATUS.DEPRECATED]: 'Deprecated',
  };
  return labels[status] || 'Unknown';
}

export function knowledgeBaseGetFormatLabel(format: KnowledgeBaseFormat): string {
  const labels: Record<KnowledgeBaseFormat, string> = {
    [KNOWLEDGE_BASE.FORMATS.PLAIN]: 'Plain Text',
    [KNOWLEDGE_BASE.FORMATS.MARKDOWN]: 'Markdown',
    [KNOWLEDGE_BASE.FORMATS.HTML]: 'HTML',
    [KNOWLEDGE_BASE.FORMATS.WIKI]: 'Wiki',
  };
  return labels[format] || 'Unknown';
}

export function knowledgeBaseIsPublished(status: KnowledgeBaseStatus): boolean {
  return status === KNOWLEDGE_BASE.STATUS.PUBLISHED;
}

export function knowledgeBaseIsDraft(status: KnowledgeBaseStatus): boolean {
  return status === KNOWLEDGE_BASE.STATUS.DRAFT || status === KNOWLEDGE_BASE.STATUS.REVIEW;
}

export function knowledgeBaseIsArchived(status: KnowledgeBaseStatus): boolean {
  return status === KNOWLEDGE_BASE.STATUS.ARCHIVED || status === KNOWLEDGE_BASE.STATUS.DEPRECATED;
}

export function knowledgeBaseGetRoleLabel(role: KnowledgeBaseRole): string {
  const labels: Record<KnowledgeBaseRole, string> = {
    [KNOWLEDGE_BASE.ROLES.VIEWER]: 'Viewer',
    [KNOWLEDGE_BASE.ROLES.CONTRIBUTOR]: 'Contributor',
    [KNOWLEDGE_BASE.ROLES.EDITOR]: 'Editor',
    [KNOWLEDGE_BASE.ROLES.REVIEWER]: 'Reviewer',
    [KNOWLEDGE_BASE.ROLES.ADMIN]: 'Admin',
  };
  return labels[role] || 'Unknown';
}
