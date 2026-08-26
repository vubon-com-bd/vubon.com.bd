/**
 * SEO Keyword Types
 * Type definitions for SEO keywords based on shared-constants
 * @module SEOKeywordTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import common SEO types from common (যাতে ডুপ্লিকেট না হয়)
// ============================================================
import type { SEOKeywordType, SEOKeywordIntent, SEOPriority } from '../common/seo.types';

// ============================================================
// Import from shared-constants seo keyword
// ============================================================
import {
  // SEO Keyword Main
  SEO_KEYWORD,
  SEOKeywordStatus,
  SEOKeywordDifficulty,
  SEOKeywordVolumeRange,
  SEOKeywordCompetition,
  SEOKeywordPriorityScore,
  SEOKeywordGroup,
  SEOKeywordMatchType,
  SEOKeywordSource,
  SEOKeywordLengthCategory,
  SEOKeywordValueMetric,
  SEOKeywordPerformanceMetric,
  getSEOKeywordTypeLabel,
  getSEOKeywordStatusLabel,
  getSEOKeywordDifficultyLabel,
  getSEOKeywordIntentLabel,
  getSEOKeywordCompetitionLabel,
  getSEOKeywordGroupLabel,
  getSEOKeywordSourceLabel,
  getSEOKeywordLengthCategory,
  getSEOKeywordDifficultyScore,
  getSEOKeywordPriority,
  isKeywordActive,
  isKeywordSuccessful,
  getKeywordStatusColor,
  // SEO Keyword Type
  SEO_KEYWORD_TYPE,
  SEOKeywordTypeCategory,
  SEOKeywordTypeFormat,
  SEOKeywordTypeModifier,
  SEOKeywordTypeIntent,
  SEOKeywordTypeScore,
  SEOKeywordTypeFunnelStage,
  SEOKeywordTypeSeasonality,
  SEOKeywordTypeGeoScope,
  getSEOKeywordCategoryLabel,
  getSEOKeywordFormatLabel,
  getSEOKeywordModifierLabel,
  getSEOKeywordIntentTypeLabel,
  getSEOKeywordFunnelStageLabel,
  getSEOKeywordSeasonalityLabel,
  getSEOKeywordGeoScopeLabel,
  // SEO Keyword Status
  SEO_KEYWORD_STATUS,
  SEOKeywordLifecycleStatus,
  SEOKeywordPriorityStatus,
  SEOKeywordProgressStatus,
  SEOKeywordQualityStatus,
  SEOKeywordRankingStatus,
  SEOKeywordCategoryStatus,
  getSEOKeywordLifecycleLabel,
  getSEOKeywordPriorityLabel,
  getSEOKeywordProgressLabel,
  getSEOKeywordQualityLabel,
  getSEOKeywordRankingLabel,
  getSEOKeywordStatusCategory,
  getSEOKeywordStatusColor,
  isSEOKeywordActive,
  isKeywordCompleted,
  getProgressPercentage,
  // SEO Keyword Difficulty
  SEO_KEYWORD_DIFFICULTY,
  SEOKeywordDifficultyLevel,
  SEOKeywordDifficultyRange,
  SEOKeywordDifficultyLabel,
  SEOKeywordDifficultyColor,
  SEOKeywordDifficultyFactor,
  getDifficultyLevel,
  getDifficultyLabel,
  getDifficultyColor,
  calculateDifficulty,
  getDifficultyRecommendation,
  getEaseOfRanking,
  getDifficultyCategory,
  // SEO Keyword Intent
  SEO_KEYWORD_INTENT,
  SEOKeywordIntentSubType,
  SEOKeywordIntentSignal,
  SEOKeywordIntentScore,
  SEOKeywordIntentColor,
  getIntentTypeLabel,
  getIntentSubTypeLabel,
  getIntentScore,
  getIntentColor,
  detectIntent,
  getIntentRecommendation,
  getFunnelStage,
} from '@vubon/shared-constants';

// ============================================================
// SEO Keyword Extended Types (SEOKeywordType ও SEOKeywordIntent ইমপোর্ট করা হয়েছে)
// ============================================================

/**
 * SEO keyword
 */
export interface SEOKeyword extends BaseEntity, Timestamp {
  id: ID;
  keyword: string;
  type: SEOKeywordType; // common থেকে ইমপোর্ট
  status: SEOKeywordStatus;
  difficulty: SEOKeywordDifficulty;
  intent: SEOKeywordIntent; // common থেকে ইমপোর্ট
  volume: number;
  competition: SEOKeywordCompetition;
  priority: SEOKeywordPriorityScore;
  group: SEOKeywordGroup;
  matchType: SEOKeywordMatchType;
  source: SEOKeywordSource;
  lengthCategory: SEOKeywordLengthCategory;
  isActive: boolean;
  isSuccessful: boolean;
  valueMetric?: SEOKeywordValueMetric;
  performanceMetric?: SEOKeywordPerformanceMetric;
  metadata?: Metadata;
}

/**
 * SEO keyword filter
 */
export interface SEOKeywordFilter {
  ids?: ID[];
  types?: SEOKeywordType[];
  statuses?: SEOKeywordStatus[];
  difficulties?: SEOKeywordDifficulty[];
  intents?: SEOKeywordIntent[];
  groups?: SEOKeywordGroup[];
  sources?: SEOKeywordSource[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  minVolume?: number;
  maxVolume?: number;
  minPriority?: number;
  maxPriority?: number;
  isActive?: boolean;
  isSuccessful?: boolean;
  isWhiteHat?: boolean;
  searchTerm?: string;
}

/**
 * SEO keyword statistics
 */
export interface SEOKeywordStatistics {
  totalKeywords: number;
  activeKeywords: number;
  successfulKeywords: number;
  byType: Record<SEOKeywordType, number>;
  byStatus: Record<SEOKeywordStatus, number>;
  byDifficulty: Record<SEOKeywordDifficulty, number>;
  byIntent: Record<SEOKeywordIntent, number>;
  byGroup: Record<SEOKeywordGroup, number>;
  bySource: Record<SEOKeywordSource, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageVolume: number;
  totalVolume: number;
  averagePriority: number;
  maxPriority: number;
  minPriority: number;
  mostFrequentType: SEOKeywordType;
  mostFrequentIntent: SEOKeywordIntent;
  mostFrequentDifficulty: SEOKeywordDifficulty;
}

/**
 * SEO keyword summary
 */
export interface SEOKeywordSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalKeywords: number;
  active: number;
  successful: number;
  byType: Record<SEOKeywordType, number>;
  byStatus: Record<SEOKeywordStatus, number>;
  byDifficulty: Record<SEOKeywordDifficulty, number>;
  byIntent: Record<SEOKeywordIntent, number>;
  byGroup: Record<SEOKeywordGroup, number>;
  bySource: Record<SEOKeywordSource, number>;
  keywordTrend: {
    date: Date;
    total: number;
    active: number;
    successful: number;
  }[];
  topTypes: {
    type: SEOKeywordType;
    count: number;
    label: string;
  }[];
  topIntents: {
    intent: SEOKeywordIntent;
    count: number;
    label: string;
  }[];
  topDifficulties: {
    difficulty: SEOKeywordDifficulty;
    count: number;
    label: string;
  }[];
  volumeSummary: {
    total: number;
    average: number;
    max: number;
    min: number;
  };
  prioritySummary: {
    average: number;
    max: number;
    min: number;
  };
}

/**
 * SEO keyword configuration
 */
export interface SEOKeywordConfiguration {
  enabled: boolean;
  defaultType: SEOKeywordType;
  defaultStatus: SEOKeywordStatus;
  defaultPriority: SEOPriority;
  allowMultipleTypes: boolean;
  requireIntent: boolean;
  requireDifficulty: boolean;
  requireVolume: boolean;
  requireCompetition: boolean;
  maxKeywordsPerProject: number;
  autoDetectIntent: boolean;
  autoCalculateDifficulty: boolean;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnSuccess: boolean;
  alertConfig?: SEOKeywordAlertConfig;
}

/**
 * SEO keyword alert configuration
 */
export interface SEOKeywordAlertConfig {
  enabled: boolean;
  difficultyAlert: boolean;
  volumeAlert: boolean;
  priorityAlert: boolean;
  intentMismatchAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
  difficultyThreshold: number;
  volumeThreshold: number;
  priorityThreshold: number;
}

/**
 * SEO keyword history
 */
export interface SEOKeywordHistory extends BaseEntity, Timestamp {
  id: ID;
  keywordId: ID;
  action:
    | 'create'
    | 'update'
    | 'activate'
    | 'deactivate'
    | 'delete'
    | 'restore'
    | 'rank_change'
    | 'volume_change'
    | 'difficulty_change'
    | 'intent_change';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * SEO keyword validation
 */
export interface SEOKeywordValidation {
  isValid: boolean;
  keywordId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * SEO keyword rank
 */
export interface SEOKeywordRank extends BaseEntity, Timestamp {
  id: ID;
  keywordId: ID;
  position: number;
  previousPosition?: number;
  change: number;
  url: string;
  searchEngine: string;
  country: string;
  device: 'desktop' | 'mobile' | 'tablet';
  checkedAt: Date;
  metadata?: Metadata;
}

/**
 * SEO keyword export
 */
export interface SEOKeywordExport extends BaseEntity, Timestamp {
  id: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: SEOKeywordFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything (শুধুমাত্র কনস্ট্যান্ট ও ফাংশন, SEOKeywordType ও SEOKeywordIntent বাদে)
// ============================================================

export {
  // SEO Keyword Main
  SEO_KEYWORD,
  SEOKeywordStatus,
  SEOKeywordDifficulty,
  SEOKeywordVolumeRange,
  SEOKeywordCompetition,
  SEOKeywordPriorityScore,
  SEOKeywordGroup,
  SEOKeywordMatchType,
  SEOKeywordSource,
  SEOKeywordLengthCategory,
  SEOKeywordValueMetric,
  SEOKeywordPerformanceMetric,
  getSEOKeywordTypeLabel,
  getSEOKeywordStatusLabel,
  getSEOKeywordDifficultyLabel,
  getSEOKeywordIntentLabel,
  getSEOKeywordCompetitionLabel,
  getSEOKeywordGroupLabel,
  getSEOKeywordSourceLabel,
  getSEOKeywordLengthCategory,
  getSEOKeywordDifficultyScore,
  getSEOKeywordPriority,
  isKeywordActive,
  isKeywordSuccessful,
  getKeywordStatusColor,
  // SEO Keyword Type (SEOKeywordType বাদে)
  SEO_KEYWORD_TYPE,
  SEOKeywordTypeCategory,
  SEOKeywordTypeFormat,
  SEOKeywordTypeModifier,
  SEOKeywordTypeIntent,
  SEOKeywordTypeScore,
  SEOKeywordTypeFunnelStage,
  SEOKeywordTypeSeasonality,
  SEOKeywordTypeGeoScope,
  getSEOKeywordCategoryLabel,
  getSEOKeywordFormatLabel,
  getSEOKeywordModifierLabel,
  getSEOKeywordIntentTypeLabel,
  getSEOKeywordFunnelStageLabel,
  getSEOKeywordSeasonalityLabel,
  getSEOKeywordGeoScopeLabel,
  // SEO Keyword Status
  SEO_KEYWORD_STATUS,
  SEOKeywordLifecycleStatus,
  SEOKeywordPriorityStatus,
  SEOKeywordProgressStatus,
  SEOKeywordQualityStatus,
  SEOKeywordRankingStatus,
  SEOKeywordCategoryStatus,
  getSEOKeywordLifecycleLabel,
  getSEOKeywordPriorityLabel,
  getSEOKeywordProgressLabel,
  getSEOKeywordQualityLabel,
  getSEOKeywordRankingLabel,
  getSEOKeywordStatusCategory,
  getSEOKeywordStatusColor,
  isSEOKeywordActive,
  isKeywordCompleted,
  getProgressPercentage,
  // SEO Keyword Difficulty
  SEO_KEYWORD_DIFFICULTY,
  SEOKeywordDifficultyLevel,
  SEOKeywordDifficultyRange,
  SEOKeywordDifficultyLabel,
  SEOKeywordDifficultyColor,
  SEOKeywordDifficultyFactor,
  getDifficultyLevel,
  getDifficultyLabel,
  getDifficultyColor,
  calculateDifficulty,
  getDifficultyRecommendation,
  getEaseOfRanking,
  getDifficultyCategory,
  // SEO Keyword Intent (SEOKeywordIntent বাদে)
  SEO_KEYWORD_INTENT,
  SEOKeywordIntentSubType,
  SEOKeywordIntentSignal,
  SEOKeywordIntentScore,
  SEOKeywordIntentColor,
  getIntentTypeLabel,
  getIntentSubTypeLabel,
  getIntentScore,
  getIntentColor,
  detectIntent,
  getIntentRecommendation,
  getFunnelStage,
};
