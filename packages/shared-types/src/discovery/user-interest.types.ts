/**
 * User Interest Types
 * Type definitions for user interests based on shared-constants
 * @module UserInterestTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants discovery
// ============================================================
import {
  // Discovery Core
  DiscoveryType,
  DiscoveryCategory,
  DiscoverySource,
} from '@vubon/shared-constants';

// ============================================================
// User Interest Types
// ============================================================

/**
 * User interest
 */
export interface UserInterest extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  topic: string;
  category: string;
  subCategory?: string;
  interestScore: number;
  engagementScore: number;
  lastUpdatedAt: Date;
  metadata?: Metadata;
}

/**
 * User interest filter
 */
export interface UserInterestFilter {
  userIds?: ID[];
  topics?: string[];
  categories?: string[];
  subCategories?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  minInterestScore?: number;
  maxInterestScore?: number;
  minEngagementScore?: number;
  maxEngagementScore?: number;
  searchTerm?: string;
}

/**
 * User interest statistics
 */
export interface UserInterestStatistics {
  userId: ID;
  totalInterests: number;
  uniqueTopics: number;
  uniqueCategories: number;
  averageInterestScore: number;
  maxInterestScore: number;
  minInterestScore: number;
  averageEngagementScore: number;
  maxEngagementScore: number;
  minEngagementScore: number;
  topTopics: { topic: string; count: number }[];
  topCategories: { category: string; count: number }[];
  interestDistribution: {
    category: string;
    count: number;
    averageScore: number;
  }[];
}

/**
 * User interest summary
 */
export interface UserInterestSummary {
  period: {
    start: Date;
    end: Date;
  };
  userId: ID;
  totalInterests: number;
  activeInterests: number;
  topCategories: {
    category: string;
    count: number;
    averageScore: number;
  }[];
  topTopics: {
    topic: string;
    count: number;
    averageScore: number;
  }[];
  interestTrend: {
    date: Date;
    topic: string;
    score: number;
  }[];
  engagementTrend: {
    date: Date;
    category: string;
    engagementScore: number;
  }[];
}

/**
 * User interest configuration
 */
export interface UserInterestConfiguration {
  enabled: boolean;
  maxInterestsPerUser: number;
  minInterestScore: number;
  minEngagementScore: number;
  decayFactor: number;
  updateIntervalHours: number;
  cacheTTLSeconds: number;
  enableRealTime: boolean;
  enableHistorical: boolean;
  enablePredictive: boolean;
  notificationOnUpdate: boolean;
  notificationOnError: boolean;
  alertConfig?: UserInterestAlertConfig;
}

/**
 * User interest alert configuration
 */
export interface UserInterestAlertConfig {
  enabled: boolean;
  scoreDropAlert: boolean;
  scoreThresholdAlert: boolean;
  updateErrorAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
  scoreThreshold: number;
}

/**
 * User interest history
 */
export interface UserInterestHistory extends BaseEntity, Timestamp {
  id: ID;
  interestId: ID;
  userId: ID;
  topic: string;
  action: 'add' | 'update' | 'remove' | 'decay';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * User interest score
 */
export interface UserInterestScore extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  topic: string;
  category: string;
  interestScore: number;
  engagementScore: number;
  velocity: number;
  confidence: number;
  calculatedAt: Date;
  expiresAt?: Date;
  metadata?: Metadata;
}

/**
 * User interest prediction
 */
export interface UserInterestPrediction extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  predictedInterest: string;
  predictedCategory: string;
  probability: number;
  confidenceInterval: {
    lower: number;
    upper: number;
  };
  predictedAt: Date;
  horizon: number;
  metadata?: Metadata;
}

/**
 * User interest analytics
 */
export interface UserInterestAnalytics extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  period: {
    start: Date;
    end: Date;
  };
  totalInterests: number;
  activeInterests: number;
  interestDistribution: {
    category: string;
    count: number;
    averageScore: number;
  }[];
  engagementMetrics: {
    totalEngagements: number;
    averageEngagementScore: number;
    maxEngagementScore: number;
    minEngagementScore: number;
  };
  interestGrowth: {
    newInterests: number;
    decayedInterests: number;
    netGrowth: number;
  };
  metadata?: Metadata;
}

/**
 * User interest export
 */
export interface UserInterestExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf';
  filter: UserInterestFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * User interest cluster
 */
export interface UserInterestCluster extends BaseEntity, Timestamp {
  id: ID;
  name: string;
  topics: string[];
  category: string;
  size: number;
  centroid: number[];
  variance: number;
  createdAt: Date;
  updatedAt: Date;
  metadata?: Metadata;
}

/**
 * User interest vector
 */
export interface UserInterestVector extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  vector: number[];
  dimension: number;
  norm: number;
  version: number;
  calculatedAt: Date;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Discovery Core
  DiscoveryType,
  DiscoveryCategory,
  DiscoverySource,
};
