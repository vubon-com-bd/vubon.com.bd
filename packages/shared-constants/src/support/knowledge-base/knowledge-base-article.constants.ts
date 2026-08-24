/**
 * Knowledge Base Article Constants
 * Configuration for knowledge base articles
 */

export const KNOWLEDGE_BASE_ARTICLE = {
  // Article Types
  TYPES: {
    GUIDE: 'guide',
    TUTORIAL: 'tutorial',
    REFERENCE: 'reference',
    FAQ: 'faq',
    TROUBLESHOOTING: 'troubleshooting',
    HOW_TO: 'how_to',
    BEST_PRACTICE: 'best_practice',
    RELEASE_NOTES: 'release_notes',
    POLICY: 'policy',
    ANNOUNCEMENT: 'announcement',
  } as const,

  // Article Statuses
  STATUS: {
    DRAFT: 'draft',
    REVIEW: 'review',
    PUBLISHED: 'published',
    UPDATING: 'updating',
    ARCHIVED: 'archived',
    DEPRECATED: 'deprecated',
  } as const,

  // Article Priorities
  PRIORITY: {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
  } as const,

  // Article Formats
  FORMATS: {
    PLAIN: 'plain',
    MARKDOWN: 'markdown',
    HTML: 'html',
    WIKI: 'wiki',
  } as const,

  // Article Difficulty
  DIFFICULTY: {
    BEGINNER: 'beginner',
    INTERMEDIATE: 'intermediate',
    ADVANCED: 'advanced',
    EXPERT: 'expert',
  } as const,

  // Article Limits
  LIMITS: {
    MAX_TITLE_LENGTH: 200,
    MAX_DESCRIPTION_LENGTH: 500,
    MAX_CONTENT_LENGTH: 50000,
    MAX_TAGS: 20,
    MAX_CATEGORIES: 5,
    MAX_ATTACHMENTS: 10,
    MAX_VERSIONS: 100,
  } as const,

  // Article View Types
  VIEW_TYPES: {
    PUBLIC: 'public',
    PRIVATE: 'private',
    RESTRICTED: 'restricted',
    INTERNAL: 'internal',
  } as const,
} as const;

// Article Types
export type KnowledgeBaseArticleType =
  (typeof KNOWLEDGE_BASE_ARTICLE.TYPES)[keyof typeof KNOWLEDGE_BASE_ARTICLE.TYPES];

// Article Statuses
export type KnowledgeBaseArticleStatus =
  (typeof KNOWLEDGE_BASE_ARTICLE.STATUS)[keyof typeof KNOWLEDGE_BASE_ARTICLE.STATUS];

// Article Priorities
export type KnowledgeBaseArticlePriority =
  (typeof KNOWLEDGE_BASE_ARTICLE.PRIORITY)[keyof typeof KNOWLEDGE_BASE_ARTICLE.PRIORITY];

// Article Formats
export type KnowledgeBaseArticleFormat =
  (typeof KNOWLEDGE_BASE_ARTICLE.FORMATS)[keyof typeof KNOWLEDGE_BASE_ARTICLE.FORMATS];

// Article Difficulty
export type KnowledgeBaseArticleDifficulty =
  (typeof KNOWLEDGE_BASE_ARTICLE.DIFFICULTY)[keyof typeof KNOWLEDGE_BASE_ARTICLE.DIFFICULTY];

// Article View Types
export type KnowledgeBaseArticleViewType =
  (typeof KNOWLEDGE_BASE_ARTICLE.VIEW_TYPES)[keyof typeof KNOWLEDGE_BASE_ARTICLE.VIEW_TYPES];

// Utility Functions
export function knowledgeBaseArticleGetTypeLabel(type: KnowledgeBaseArticleType): string {
  const labels: Record<KnowledgeBaseArticleType, string> = {
    [KNOWLEDGE_BASE_ARTICLE.TYPES.GUIDE]: 'Guide',
    [KNOWLEDGE_BASE_ARTICLE.TYPES.TUTORIAL]: 'Tutorial',
    [KNOWLEDGE_BASE_ARTICLE.TYPES.REFERENCE]: 'Reference',
    [KNOWLEDGE_BASE_ARTICLE.TYPES.FAQ]: 'FAQ',
    [KNOWLEDGE_BASE_ARTICLE.TYPES.TROUBLESHOOTING]: 'Troubleshooting',
    [KNOWLEDGE_BASE_ARTICLE.TYPES.HOW_TO]: 'How To',
    [KNOWLEDGE_BASE_ARTICLE.TYPES.BEST_PRACTICE]: 'Best Practice',
    [KNOWLEDGE_BASE_ARTICLE.TYPES.RELEASE_NOTES]: 'Release Notes',
    [KNOWLEDGE_BASE_ARTICLE.TYPES.POLICY]: 'Policy',
    [KNOWLEDGE_BASE_ARTICLE.TYPES.ANNOUNCEMENT]: 'Announcement',
  };
  return labels[type] || 'Unknown';
}

export function knowledgeBaseArticleGetStatusLabel(status: KnowledgeBaseArticleStatus): string {
  const labels: Record<KnowledgeBaseArticleStatus, string> = {
    [KNOWLEDGE_BASE_ARTICLE.STATUS.DRAFT]: 'Draft',
    [KNOWLEDGE_BASE_ARTICLE.STATUS.REVIEW]: 'In Review',
    [KNOWLEDGE_BASE_ARTICLE.STATUS.PUBLISHED]: 'Published',
    [KNOWLEDGE_BASE_ARTICLE.STATUS.UPDATING]: 'Updating',
    [KNOWLEDGE_BASE_ARTICLE.STATUS.ARCHIVED]: 'Archived',
    [KNOWLEDGE_BASE_ARTICLE.STATUS.DEPRECATED]: 'Deprecated',
  };
  return labels[status] || 'Unknown';
}

export function knowledgeBaseArticleGetPriorityLabel(
  priority: KnowledgeBaseArticlePriority
): string {
  const labels: Record<KnowledgeBaseArticlePriority, string> = {
    [KNOWLEDGE_BASE_ARTICLE.PRIORITY.CRITICAL]: 'Critical',
    [KNOWLEDGE_BASE_ARTICLE.PRIORITY.HIGH]: 'High',
    [KNOWLEDGE_BASE_ARTICLE.PRIORITY.MEDIUM]: 'Medium',
    [KNOWLEDGE_BASE_ARTICLE.PRIORITY.LOW]: 'Low',
  };
  return labels[priority] || 'Unknown';
}

export function knowledgeBaseArticleGetDifficultyLabel(
  difficulty: KnowledgeBaseArticleDifficulty
): string {
  const labels: Record<KnowledgeBaseArticleDifficulty, string> = {
    [KNOWLEDGE_BASE_ARTICLE.DIFFICULTY.BEGINNER]: 'Beginner',
    [KNOWLEDGE_BASE_ARTICLE.DIFFICULTY.INTERMEDIATE]: 'Intermediate',
    [KNOWLEDGE_BASE_ARTICLE.DIFFICULTY.ADVANCED]: 'Advanced',
    [KNOWLEDGE_BASE_ARTICLE.DIFFICULTY.EXPERT]: 'Expert',
  };
  return labels[difficulty] || 'Unknown';
}

export function knowledgeBaseArticleIsPublished(status: KnowledgeBaseArticleStatus): boolean {
  return status === KNOWLEDGE_BASE_ARTICLE.STATUS.PUBLISHED;
}

export function knowledgeBaseArticleIsDraft(status: KnowledgeBaseArticleStatus): boolean {
  return (
    status === KNOWLEDGE_BASE_ARTICLE.STATUS.DRAFT ||
    status === KNOWLEDGE_BASE_ARTICLE.STATUS.REVIEW
  );
}

export function knowledgeBaseArticleIsArchived(status: KnowledgeBaseArticleStatus): boolean {
  return (
    status === KNOWLEDGE_BASE_ARTICLE.STATUS.ARCHIVED ||
    status === KNOWLEDGE_BASE_ARTICLE.STATUS.DEPRECATED
  );
}
