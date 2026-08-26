/**
 * SEO Keyword Research Types
 * Type definitions for SEO keyword research based on shared-constants
 * @module SEOKeywordResearchTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import common SEO types from common
// ============================================================
import type { SEOKeywordType, SEOKeywordIntent, SEOPriority } from '../common/seo.types';

// ============================================================
// Import from shared-constants seo keyword
// ============================================================
import {
  // SEO Keyword Main
  SEOKeywordDifficulty,
  SEOKeywordVolumeRange,
  SEOKeywordCompetition,
  SEOKeywordGroup,
  SEOKeywordSource,
  SEOKeywordLengthCategory,
  SEOKeywordValueMetric,
  SEOKeywordPerformanceMetric,
  // SEO Keyword Difficulty
  SEO_KEYWORD_DIFFICULTY,
  SEOKeywordDifficultyLevel,
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
// SEO Keyword Research Extended Types
// ============================================================

/**
 * SEO keyword research
 */
export interface SEOKeywordResearch extends BaseEntity, Timestamp {
  id: ID;
  projectId: ID;
  keyword: string;
  type: SEOKeywordType;
  intent: SEOKeywordIntent;
  difficulty: SEOKeywordDifficulty;
  volume: number;
  competition: SEOKeywordCompetition;
  group: SEOKeywordGroup;
  source: SEOKeywordSource;
  lengthCategory: SEOKeywordLengthCategory;
  valueMetric?: SEOKeywordValueMetric;
  performanceMetric?: SEOKeywordPerformanceMetric;
  isActive: boolean;
  isResearched: boolean;
  researchedAt: Date;
  metadata?: Metadata;
}

/**
 * Keyword research filter
 */
export interface KeywordResearchFilter {
  ids?: ID[];
  projectIds?: ID[];
  keywords?: string[];
  types?: SEOKeywordType[];
  intents?: SEOKeywordIntent[];
  difficulties?: SEOKeywordDifficulty[];
  groups?: SEOKeywordGroup[];
  sources?: SEOKeywordSource[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  minVolume?: number;
  maxVolume?: number;
  minDifficulty?: number;
  maxDifficulty?: number;
  isActive?: boolean;
  isResearched?: boolean;
  searchTerm?: string;
}

/**
 * Keyword research statistics
 */
export interface KeywordResearchStatistics {
  projectId: ID;
  totalKeywords: number;
  researchedKeywords: number;
  activeKeywords: number;
  byType: Record<SEOKeywordType, number>;
  byIntent: Record<SEOKeywordIntent, number>;
  byDifficulty: Record<SEOKeywordDifficulty, number>;
  byGroup: Record<SEOKeywordGroup, number>;
  bySource: Record<SEOKeywordSource, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  totalVolume: number;
  averageVolume: number;
  maxVolume: number;
  minVolume: number;
  averageDifficulty: number;
  maxDifficulty: number;
  minDifficulty: number;
  mostFrequentType: SEOKeywordType;
  mostFrequentIntent: SEOKeywordIntent;
  mostFrequentDifficulty: SEOKeywordDifficulty;
}

/**
 * Keyword research summary
 */
export interface KeywordResearchSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalKeywords: number;
  researched: number;
  active: number;
  byType: Record<SEOKeywordType, number>;
  byIntent: Record<SEOKeywordIntent, number>;
  byDifficulty: Record<SEOKeywordDifficulty, number>;
  byGroup: Record<SEOKeywordGroup, number>;
  bySource: Record<SEOKeywordSource, number>;
  keywordTrend: {
    date: Date;
    total: number;
    researched: number;
    active: number;
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
  difficultySummary: {
    average: number;
    max: number;
    min: number;
  };
}

/**
 * Keyword research configuration
 */
export interface KeywordResearchConfiguration {
  enabled: boolean;
  defaultType: SEOKeywordType;
  defaultIntent: SEOKeywordIntent;
  defaultDifficulty: SEOKeywordDifficulty;
  defaultPriority: SEOPriority;
  minVolume: number;
  maxVolume: number;
  minDifficulty: number;
  maxDifficulty: number;
  maxKeywordsPerProject: number;
  autoDetectIntent: boolean;
  autoCalculateDifficulty: boolean;
  autoGroupKeywords: boolean;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnResearch: boolean;
  alertConfig?: KeywordResearchAlertConfig;
}

/**
 * Keyword research alert configuration
 */
export interface KeywordResearchAlertConfig {
  enabled: boolean;
  difficultyAlert: boolean;
  volumeAlert: boolean;
  intentMismatchAlert: boolean;
  duplicateKeywordAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
  difficultyThreshold: number;
  volumeThreshold: number;
}

/**
 * Keyword research history
 */
export interface KeywordResearchHistory extends BaseEntity, Timestamp {
  id: ID;
  researchId: ID;
  projectId: ID;
  action:
    | 'create'
    | 'update'
    | 'research'
    | 'activate'
    | 'deactivate'
    | 'delete'
    | 'restore'
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
 * Keyword research validation
 */
export interface KeywordResearchValidation {
  isValid: boolean;
  researchId: ID;
  projectId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Keyword research suggestion
 */
export interface KeywordResearchSuggestion extends BaseEntity, Timestamp {
  id: ID;
  projectId: ID;
  keyword: string;
  type: SEOKeywordType;
  intent: SEOKeywordIntent;
  difficulty: SEOKeywordDifficulty;
  volume: number;
  competition: SEOKeywordCompetition;
  score: number;
  reason: string;
  isAccepted: boolean;
  isRejected: boolean;
  metadata?: Metadata;
}

/**
 * Keyword research export
 */
export interface KeywordResearchExport extends BaseEntity, Timestamp {
  id: ID;
  projectId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: KeywordResearchFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // SEO Keyword Main (শুধুমাত্র নতুন টাইপ)
  SEOKeywordDifficulty,
  SEOKeywordVolumeRange,
  SEOKeywordCompetition,
  SEOKeywordGroup,
  SEOKeywordSource,
  SEOKeywordLengthCategory,
  SEOKeywordValueMetric,
  SEOKeywordPerformanceMetric,
  // SEO Keyword Difficulty
  SEO_KEYWORD_DIFFICULTY,
  SEOKeywordDifficultyLevel,
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
};
