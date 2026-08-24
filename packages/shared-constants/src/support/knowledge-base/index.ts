/**
 * Knowledge Base Constants Index
 * Export all knowledge base constants and types for easy importing
 */

// Knowledge Base Constants
export {
  KNOWLEDGE_BASE,
  knowledgeBaseGetTypeLabel,
  knowledgeBaseGetStatusLabel,
  knowledgeBaseGetFormatLabel,
  knowledgeBaseIsPublished,
  knowledgeBaseIsDraft,
  knowledgeBaseIsArchived,
  knowledgeBaseGetRoleLabel,
} from './knowledge-base.constants';

export type {
  KnowledgeBaseType,
  KnowledgeBaseStatus,
  KnowledgeBaseLanguage,
  KnowledgeBaseFormat,
  KnowledgeBaseRole,
  KnowledgeBasePermission,
} from './knowledge-base.constants';

// Knowledge Base Article Constants
export {
  KNOWLEDGE_BASE_ARTICLE,
  knowledgeBaseArticleGetTypeLabel,
  knowledgeBaseArticleGetStatusLabel,
  knowledgeBaseArticleGetPriorityLabel,
  knowledgeBaseArticleGetDifficultyLabel,
  knowledgeBaseArticleIsPublished,
  knowledgeBaseArticleIsDraft,
  knowledgeBaseArticleIsArchived,
} from './knowledge-base-article.constants';

export type {
  KnowledgeBaseArticleType,
  KnowledgeBaseArticleStatus,
  KnowledgeBaseArticlePriority,
  KnowledgeBaseArticleFormat,
  KnowledgeBaseArticleDifficulty,
  KnowledgeBaseArticleViewType,
} from './knowledge-base-article.constants';

// Knowledge Base Category Constants
export {
  KNOWLEDGE_BASE_CATEGORY,
  knowledgeBaseCategoryGetLabel,
  knowledgeBaseCategoryGetIcon,
  knowledgeBaseCategoryGetColor,
  knowledgeBaseCategoryGetPriority,
} from './knowledge-base-category.constants';

export type {
  KnowledgeBaseCategoryType,
  KnowledgeBaseCategoryIcon,
  KnowledgeBaseCategoryColor,
} from './knowledge-base-category.constants';

// Knowledge Base Status Constants
export {
  KNOWLEDGE_BASE_STATUS,
  knowledgeBaseStatusGetLabel,
  knowledgeBaseStatusIsPublished,
  knowledgeBaseStatusIsDraft,
  knowledgeBaseStatusIsArchived,
  knowledgeBaseStatusGetCategory,
  knowledgeBaseStatusCanTransition,
} from './knowledge-base-status.constants';

export type {
  KnowledgeBaseStatusType,
  KnowledgeBaseStatusCategory,
  KnowledgeBaseStatusColor,
  KnowledgeBaseStatusIcon,
  KnowledgeBaseStatusTransition,
} from './knowledge-base-status.constants';
