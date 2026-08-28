/**
 * FAQ Types
 * Type definitions for support FAQs based on shared-constants
 * @module FAQTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants support FAQ
// ============================================================
import {
  // FAQ Core
  SUPPORT_FAQ,
  SupportFaqType,
  SupportFaqStatus,
  SupportFaqPriority,
  SupportFaqLanguage,
  SupportFaqFormat,
  supportFaqGetTypeLabel,
  supportFaqGetStatusLabel,
  supportFaqGetPriorityLabel,
  supportFaqIsPublished,
  supportFaqIsDraft,
  supportFaqGetFormatLabel,
  // FAQ Category
  SUPPORT_FAQ_CATEGORY,
  SupportFaqCategoryType,
  SupportFaqCategoryIcon,
  SupportFaqCategoryColor,
  supportFaqCategoryGetLabel,
  supportFaqCategoryGetIcon,
  supportFaqCategoryGetColor,
  supportFaqCategoryGetPriority,
  // FAQ Status
  SUPPORT_FAQ_STATUS,
  SupportFaqStatusType,
  SupportFaqStatusCategory,
  SupportFaqStatusColor,
  SupportFaqStatusIcon,
  SupportFaqStatusTransition,
  supportFaqStatusGetLabel,
  supportFaqStatusIsPublished,
  supportFaqStatusIsDraft,
  supportFaqStatusGetCategory,
  supportFaqStatusCanTransition,
} from '@vubon/shared-constants';

// ============================================================
// Support FAQ Extended Types
// ============================================================

/**
 * Support FAQ
 */
export interface SupportFAQ extends BaseEntity, Timestamp {
  id: ID;
  category: SupportFaqCategoryType;
  type: SupportFaqType;
  status: SupportFaqStatus;
  priority: SupportFaqPriority;
  language: SupportFaqLanguage;
  format: SupportFaqFormat;
  question: string;
  answer: string;
  isPublished: boolean;
  isDraft: boolean;
  viewCount: number;
  helpfulCount: number;
  unhelpfulCount: number;
  metadata?: Metadata;
}

/**
 * Support FAQ filter
 */
export interface SupportFAQFilter {
  ids?: ID[];
  categories?: SupportFaqCategoryType[];
  types?: SupportFaqType[];
  statuses?: SupportFaqStatus[];
  priorities?: SupportFaqPriority[];
  languages?: SupportFaqLanguage[];
  formats?: SupportFaqFormat[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isPublished?: boolean;
  isDraft?: boolean;
  searchTerm?: string;
}

/**
 * Support FAQ statistics
 */
export interface SupportFAQStatistics {
  totalFAQs: number;
  publishedFAQs: number;
  draftFAQs: number;
  byCategory: Record<SupportFaqCategoryType, number>;
  byType: Record<SupportFaqType, number>;
  byStatus: Record<SupportFaqStatus, number>;
  byPriority: Record<SupportFaqPriority, number>;
  byLanguage: Record<SupportFaqLanguage, number>;
  byFormat: Record<SupportFaqFormat, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageViewCount: number;
  maxViewCount: number;
  minViewCount: number;
  averageHelpfulCount: number;
  maxHelpfulCount: number;
  minHelpfulCount: number;
  helpfulRate: number;
  unhelpfulRate: number;
}

/**
 * Support FAQ summary
 */
export interface SupportFAQSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalFAQs: number;
  published: number;
  draft: number;
  byCategory: Record<SupportFaqCategoryType, number>;
  byType: Record<SupportFaqType, number>;
  byStatus: Record<SupportFaqStatus, number>;
  byPriority: Record<SupportFaqPriority, number>;
  byLanguage: Record<SupportFaqLanguage, number>;
  byFormat: Record<SupportFaqFormat, number>;
  faqTrend: {
    date: Date;
    total: number;
    published: number;
    draft: number;
  }[];
  topCategories: {
    category: SupportFaqCategoryType;
    count: number;
    label: string;
  }[];
  topTypes: {
    type: SupportFaqType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: SupportFaqStatus;
    count: number;
    label: string;
  }[];
}

// ============================================================
// Re-export Everything (শুধুমাত্র লিংকের কনস্ট্যান্ট)
// ============================================================

export {
  // FAQ Core
  SUPPORT_FAQ,
  SupportFaqType,
  SupportFaqStatus,
  SupportFaqPriority,
  SupportFaqLanguage,
  SupportFaqFormat,
  supportFaqGetTypeLabel,
  supportFaqGetStatusLabel,
  supportFaqGetPriorityLabel,
  supportFaqIsPublished,
  supportFaqIsDraft,
  supportFaqGetFormatLabel,
  // FAQ Category
  SUPPORT_FAQ_CATEGORY,
  SupportFaqCategoryType,
  SupportFaqCategoryIcon,
  SupportFaqCategoryColor,
  supportFaqCategoryGetLabel,
  supportFaqCategoryGetIcon,
  supportFaqCategoryGetColor,
  supportFaqCategoryGetPriority,
  // FAQ Status
  SUPPORT_FAQ_STATUS,
  SupportFaqStatusType,
  SupportFaqStatusCategory,
  SupportFaqStatusColor,
  SupportFaqStatusIcon,
  SupportFaqStatusTransition,
  supportFaqStatusGetLabel,
  supportFaqStatusIsPublished,
  supportFaqStatusIsDraft,
  supportFaqStatusGetCategory,
  supportFaqStatusCanTransition,
};
