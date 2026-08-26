/**
 * SEO Link Types
 * Type definitions for SEO links based on shared-constants
 * @module SEOLinkTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import common SEO types from common
// ============================================================
import type { SEOLinkType } from '../common/seo.types';

// ============================================================
// Import from shared-constants seo link
// ============================================================
import {
  // SEO Link Main
  SEO_LINK,
  SEOLinkStatus,
  SEOLinkAttribute,
  SEOLinkRelation,
  SEOLinkTarget,
  SEOLinkQualityScore,
  SEOLinkAuthorityLevel,
  SEOLinkPlacementType,
  SEOLinkSource,
  SEOLinkAnchorTextType,
  SEOLinkMetric,
  SEOLinkErrorType,
  getSEOLinkTypeLabel,
  getSEOLinkStatusLabel,
  getSEOLinkRelationLabel,
  getSEOLinkTargetTypeLabel,
  getSEOLinkAuthorityLabel,
  getSEOLinkPlacementLabel,
  getSEOLinkSourceLabel,
  getSEOLinkAnchorTextTypeLabel,
  getSEOLinkErrorLabel,
  isLinkActive,
  isLinkProblematic,
  getLinkStatusColor,
  // SEO Link Type
  SEO_LINK_TYPE,
  SEOLinkTypeCategory,
  SEOLinkTypeSubType,
  SEOLinkTypeRelationship,
  SEOLinkTypeDirection,
  SEOLinkTypeValue,
  SEOLinkTypeContext,
  SEOLinkTypePosition,
  getSEOLinkCategoryLabel,
  getSEOLinkSubTypeLabel,
  getSEOLinkRelationshipLabel,
  getSEOLinkDirectionLabel,
  getSEOLinkValueLabel,
  getSEOLinkContextLabel,
  getSEOLinkPositionLabel,
  // SEO Link Status
  SEO_LINK_STATUS,
  SEOLinkLifecycleStatus,
  SEOLinkHealthStatus,
  SEOLinkRiskStatus,
  SEOLinkQualityStatus,
  SEOLinkTrustStatus,
  SEOLinkAuthorityStatus,
  SEOLinkStatusCategory,
  getSEOLinkLifecycleLabel,
  getSEOLinkHealthLabel,
  getSEOLinkRiskLabel,
  getSEOLinkQualityLabel,
  getSEOLinkTrustLabel,
  getSEOLinkAuthorityStatusLabel,
  getSEOLinkStatusCategory,
  getSEOLinkStatusColor,
  isLinkHealthy,
  isLinkProblematic as isSEOLinkProblematic,
  // SEO Link Attribute
  SEO_LINK_ATTRIBUTE,
  SEOLinkAttributeType,
  SEOLinkAttributeRel,
  SEOLinkAttributeTarget,
  SEOLinkAttributeMedia,
  SEOLinkAttributeTypeValue,
  SEOLinkAttributeReferrerPolicy,
  getSEOLinkAttributeLabel,
  getSEOLinkRelLabel,
  getSEOLinkTargetTypeLabel as getSEOLinkAttributeTargetLabel,
  getSEOLinkMediaLabel,
  getSEOLinkReferrerPolicyLabel,
  getLinkAttributeCombination,
  buildLinkAttributes,
  getSEOLinkTypeValueLabel,
} from '@vubon/shared-constants';

// ============================================================
// SEO Link Extended Types
// ============================================================

/**
 * SEO link
 */
export interface SEOLink extends BaseEntity, Timestamp {
  id: ID;
  sourceUrl: string;
  targetUrl: string;
  type: SEOLinkType;
  status: SEOLinkStatus;
  attribute: SEOLinkAttribute;
  relation: SEOLinkRelation;
  target: SEOLinkTarget;
  qualityScore: SEOLinkQualityScore;
  authorityLevel: SEOLinkAuthorityLevel;
  placementType: SEOLinkPlacementType;
  source: SEOLinkSource;
  anchorTextType: SEOLinkAnchorTextType;
  metric: SEOLinkMetric;
  isActive: boolean;
  isHealthy: boolean;
  isProblematic: boolean;
  metadata?: Metadata;
}

/**
 * SEO link filter
 */
export interface SEOLinkFilter {
  ids?: ID[];
  sourceUrls?: string[];
  targetUrls?: string[];
  types?: SEOLinkType[];
  statuses?: SEOLinkStatus[];
  attributes?: SEOLinkAttribute[];
  relations?: SEOLinkRelation[];
  targets?: SEOLinkTarget[];
  qualityScores?: SEOLinkQualityScore[];
  authorityLevels?: SEOLinkAuthorityLevel[];
  sources?: SEOLinkSource[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isHealthy?: boolean;
  isProblematic?: boolean;
  minQualityScore?: number;
  maxQualityScore?: number;
  searchTerm?: string;
}

/**
 * SEO link statistics
 */
export interface SEOLinkStatistics {
  totalLinks: number;
  activeLinks: number;
  healthyLinks: number;
  problematicLinks: number;
  byType: Record<SEOLinkType, number>;
  byStatus: Record<SEOLinkStatus, number>;
  byAttribute: Record<SEOLinkAttribute, number>;
  byRelation: Record<SEOLinkRelation, number>;
  byTarget: Record<SEOLinkTarget, number>;
  byQualityScore: Record<SEOLinkQualityScore, number>;
  byAuthorityLevel: Record<SEOLinkAuthorityLevel, number>;
  bySource: Record<SEOLinkSource, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageQualityScore: number;
  averageAuthorityLevel: number;
  mostFrequentType: SEOLinkType;
  mostFrequentStatus: SEOLinkStatus;
  mostFrequentAttribute: SEOLinkAttribute;
}

/**
 * SEO link summary
 */
export interface SEOLinkSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalLinks: number;
  active: number;
  healthy: number;
  problematic: number;
  byType: Record<SEOLinkType, number>;
  byStatus: Record<SEOLinkStatus, number>;
  byAttribute: Record<SEOLinkAttribute, number>;
  byRelation: Record<SEOLinkRelation, number>;
  byTarget: Record<SEOLinkTarget, number>;
  byQualityScore: Record<SEOLinkQualityScore, number>;
  byAuthorityLevel: Record<SEOLinkAuthorityLevel, number>;
  bySource: Record<SEOLinkSource, number>;
  linkTrend: {
    date: Date;
    total: number;
    healthy: number;
    problematic: number;
  }[];
  topTypes: {
    type: SEOLinkType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: SEOLinkStatus;
    count: number;
    label: string;
  }[];
  topAttributes: {
    attribute: SEOLinkAttribute;
    count: number;
    label: string;
  }[];
  qualitySummary: {
    average: number;
    max: number;
    min: number;
  };
  authoritySummary: {
    average: number;
    max: number;
    min: number;
  };
}

/**
 * SEO link configuration
 */
export interface SEOLinkConfiguration {
  enabled: boolean;
  defaultType: SEOLinkType;
  defaultStatus: SEOLinkStatus;
  defaultAttribute: SEOLinkAttribute;
  defaultRelation: SEOLinkRelation;
  defaultTarget: SEOLinkTarget;
  minQualityScore: number;
  maxQualityScore: number;
  allowNofollow: boolean;
  allowSponsored: boolean;
  allowUGC: boolean;
  autoCheckLinks: boolean;
  autoFixBrokenLinks: boolean;
  requireQualityCheck: boolean;
  requireAuthorityCheck: boolean;
  maxLinksPerPage: number;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnBroken: boolean;
  notificationOnLowQuality: boolean;
  alertConfig?: SEOLinkAlertConfig;
}

/**
 * SEO link alert configuration
 */
export interface SEOLinkAlertConfig {
  enabled: boolean;
  brokenLinkAlert: boolean;
  lowQualityAlert: boolean;
  lowAuthorityAlert: boolean;
  duplicateLinkAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
  qualityThreshold: number;
  authorityThreshold: number;
}

/**
 * SEO link history
 */
export interface SEOLinkHistory extends BaseEntity, Timestamp {
  id: ID;
  linkId: ID;
  action:
    | 'create'
    | 'update'
    | 'activate'
    | 'deactivate'
    | 'delete'
    | 'restore'
    | 'quality_update'
    | 'authority_update'
    | 'status_change'
    | 'broken_detected'
    | 'broken_fixed';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * SEO link validation
 */
export interface SEOLinkValidation {
  isValid: boolean;
  linkId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * SEO link quality
 */
export interface SEOLinkQuality extends BaseEntity, Timestamp {
  id: ID;
  linkId: ID;
  score: number;
  factors: {
    relevance: number;
    authority: number;
    trust: number;
    recency: number;
    context: number;
  };
  checkedAt: Date;
  metadata?: Metadata;
}

/**
 * SEO link export
 */
export interface SEOLinkExport extends BaseEntity, Timestamp {
  id: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: SEOLinkFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything (SEOLinkType বাদে)
// ============================================================

export {
  // SEO Link Main (SEOLinkType বাদে)
  SEO_LINK,
  SEOLinkStatus,
  SEOLinkAttribute,
  SEOLinkRelation,
  SEOLinkTarget,
  SEOLinkQualityScore,
  SEOLinkAuthorityLevel,
  SEOLinkPlacementType,
  SEOLinkSource,
  SEOLinkAnchorTextType,
  SEOLinkMetric,
  SEOLinkErrorType,
  getSEOLinkTypeLabel,
  getSEOLinkStatusLabel,
  getSEOLinkRelationLabel,
  getSEOLinkTargetTypeLabel,
  getSEOLinkAuthorityLabel,
  getSEOLinkPlacementLabel,
  getSEOLinkSourceLabel,
  getSEOLinkAnchorTextTypeLabel,
  getSEOLinkErrorLabel,
  isLinkActive,
  isLinkProblematic,
  getLinkStatusColor,
  // SEO Link Type (SEOLinkType বাদে)
  SEO_LINK_TYPE,
  SEOLinkTypeCategory,
  SEOLinkTypeSubType,
  SEOLinkTypeRelationship,
  SEOLinkTypeDirection,
  SEOLinkTypeValue,
  SEOLinkTypeContext,
  SEOLinkTypePosition,
  getSEOLinkCategoryLabel,
  getSEOLinkSubTypeLabel,
  getSEOLinkRelationshipLabel,
  getSEOLinkDirectionLabel,
  getSEOLinkValueLabel,
  getSEOLinkContextLabel,
  getSEOLinkPositionLabel,
  // SEO Link Status
  SEO_LINK_STATUS,
  SEOLinkLifecycleStatus,
  SEOLinkHealthStatus,
  SEOLinkRiskStatus,
  SEOLinkQualityStatus,
  SEOLinkTrustStatus,
  SEOLinkAuthorityStatus,
  SEOLinkStatusCategory,
  getSEOLinkLifecycleLabel,
  getSEOLinkHealthLabel,
  getSEOLinkRiskLabel,
  getSEOLinkQualityLabel,
  getSEOLinkTrustLabel,
  getSEOLinkAuthorityStatusLabel,
  getSEOLinkStatusCategory,
  getSEOLinkStatusColor,
  isLinkHealthy,
  isSEOLinkProblematic,
  // SEO Link Attribute
  SEO_LINK_ATTRIBUTE,
  SEOLinkAttributeType,
  SEOLinkAttributeRel,
  SEOLinkAttributeTarget,
  SEOLinkAttributeMedia,
  SEOLinkAttributeTypeValue,
  SEOLinkAttributeReferrerPolicy,
  getSEOLinkAttributeLabel,
  getSEOLinkRelLabel,
  getSEOLinkAttributeTargetLabel,
  getSEOLinkMediaLabel,
  getSEOLinkReferrerPolicyLabel,
  getLinkAttributeCombination,
  buildLinkAttributes,
  getSEOLinkTypeValueLabel,
};
