/**
 * Content Types
 * Type definitions for content module based on shared-constants
 * @module ContentTypes
 */

import { BaseEntity, Timestamp, Metadata, ID, Slug } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants content
// ============================================================
import {
  // Content Error
  CONTENT_ERROR,
  ContentErrorType,
  ContentErrorSeverity,
  ContentErrorCategory,
  ContentErrorHTTPStatus,
  contentErrorGetMessage,
  contentErrorGetHTTPStatus,
  contentErrorGetSeverity,
  contentErrorGetCategory,
  contentErrorIsCritical,
  contentErrorIsRetryable,
  contentErrorIsValidationError,
  contentErrorIsPermissionError,
  contentErrorIsNotFound,
  contentErrorIsValidType,
  // Content Core
  CONTENT,
  ContentType,
  ContentStatus,
  ContentCategory,
  ContentTag,
  ContentFormat,
  ContentLanguage,
  ContentLicense,
  ContentVisibility,
  ContentAccess,
  contentGetTypeLabel,
  contentGetStatusLabel,
  contentGetCategoryLabel,
  contentGetTagLabel,
  contentGetFormatLabel,
  contentGetLanguageLabel,
  contentGetLicenseLabel,
  contentGetVisibilityLabel,
  contentIsPublished,
  contentIsEditable,
  contentIsValidType,
  contentIsValidStatus,
  contentIsValidCategory,
  contentIsValidTag,
  contentIsValidFormat,
  contentIsValidLanguage,
  contentIsValidLicense,
  contentGetDefaultLanguage,
  contentGetDefaultFormat,
  contentGetDefaultVisibility,
  contentGetDefaultStatus,
  contentGetMaxTags,
  contentGetMaxCategories,
  contentGetMaxWords,
  contentGetMinWords,
  // Content Type
  CONTENT_TYPE,
  ContentTypeCategory,
  ContentTypeComplexity,
  ContentTypePurpose,
  ContentTypeAudience,
  ContentTypeTone,
  ContentTypeFormat,
  ContentTypeQuality,
  contentTypeGetCategoryLabel,
  contentTypeGetComplexityLabel,
  contentTypeGetPurposeLabel,
  contentTypeGetAudienceLabel,
  contentTypeGetToneLabel,
  contentTypeGetFormatLabel,
  contentTypeGetQualityLabel,
  contentTypeIsValidCategory,
  contentTypeIsValidPurpose,
  // Content Status
  CONTENT_STATUS,
  ContentStatusType,
  ContentStatusCategory,
  ContentStatusColor,
  ContentStatusPriority,
  ContentState,
  ContentAction,
  contentStatusGetLabel,
  contentStatusGetCategory,
  contentStatusGetColor,
  contentStatusGetPriority,
  contentStatusIsPublished,
  contentStatusIsEditable,
  contentStatusIsArchived,
  contentStatusCanTransitionTo,
  contentStatusGetAvailableTransitions,
  contentStatusGetSequence,
  contentStatusGetStateLabel,
  contentStatusGetActionLabel,
  contentStatusIsValid,
  contentStatusIsValidState,
  // Content Category
  CONTENT_CATEGORY,
  ContentMainCategory,
  ContentSubCategory,
  ContentCategoryHierarchy,
  ContentCategoryType,
  ContentCategoryVisibility,
  contentCategoryGetMainLabel,
  contentCategoryGetSubLabel,
  contentCategoryGetHierarchyLabel,
  contentCategoryGetTypeLabel,
  contentCategoryGetVisibilityLabel,
  contentCategoryIsValidMain,
  contentCategoryIsValidSub,
  contentCategoryGetSubCategories,
  // Content Tag
  CONTENT_TAG,
  ContentPopularTag,
  ContentTopicTag,
  ContentTypeTag,
  ContentAudienceTag,
  ContentTagColor,
  ContentTagCategory,
  contentTagGetPopularLabel,
  contentTagGetTopicLabel,
  contentTagGetTypeLabel,
  contentTagGetAudienceLabel,
  contentTagGetColor,
  contentTagGetCategory,
  contentTagIsValidPopular,
  contentTagIsValidTopic,
  contentTagIsValidType,
  contentTagIsValidAudience,
  // Content Format
  CONTENT_FORMAT,
  ContentFormatType,
  ContentFormatMimeType,
  ContentFormatExtension,
  ContentFormatCategory,
  ContentFormatCapability,
  contentFormatGetLabel,
  contentFormatGetMimeType,
  contentFormatGetExtension,
  contentFormatGetCategory,
  contentFormatHasCapability,
  contentFormatIsValid,
  // Content Language
  CONTENT_LANGUAGE,
  ContentLanguageCode,
  ContentLanguageName,
  ContentLanguageNativeName,
  ContentLanguageFamily,
  ContentLanguageScript,
  ContentLanguageStatus,
  ContentRTLanguage,
  contentLanguageGetName,
  contentLanguageGetNativeName,
  contentLanguageGetFamily,
  contentLanguageGetScript,
  contentLanguageIsRTL,
  contentLanguageGetFallback,
  contentLanguageIsValid,
  contentLanguageGetDefault,
  contentLanguageGetAllCodes,
  contentLanguageGetAllNames,
  // Content License
  CONTENT_LICENSE,
  ContentLicenseType,
  ContentLicenseCategory,
  ContentLicensePermission,
  ContentLicenseRestriction,
  ContentLicenseCondition,
  ContentLicenseVersion,
  ContentLicenseURL,
  contentLicenseGetLabel,
  contentLicenseGetCategory,
  contentLicenseGetVersion,
  contentLicenseGetURL,
  contentLicenseHasPermission,
  contentLicenseHasRestriction,
  contentLicenseIsCompatible,
  contentLicenseIsValid,
  contentLicenseIsOpenSource,
} from '@vubon/shared-constants';

// ============================================================
// Content Extended Types
// ============================================================

/**
 * Content
 */
export interface Content extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  title: string;
  slug: Slug;
  type: ContentType;
  status: ContentStatusType;
  category: ContentCategory;
  tags: ContentTag[];
  format: ContentFormatType;
  language: ContentLanguageCode;
  license: ContentLicenseType;
  visibility: ContentVisibility;
  access: ContentAccess;
  body: string;
  excerpt?: string;
  featuredImage?: string;
  images: string[];
  video?: string;
  audio?: string;
  attachments: string[];
  isPublished: boolean;
  isEditable: boolean;
  metadata?: Metadata;
}

/**
 * Content Filter
 */
export interface ContentFilter {
  ids?: ID[];
  userIds?: ID[];
  types?: ContentType[];
  statuses?: ContentStatusType[];
  categories?: ContentCategory[];
  tags?: ContentTag[];
  formats?: ContentFormatType[];
  languages?: ContentLanguageCode[];
  licenses?: ContentLicenseType[];
  visibilities?: ContentVisibility[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isPublished?: boolean;
  isEditable?: boolean;
  searchTerm?: string;
  slug?: string;
}

/**
 * Content Statistics
 */
export interface ContentStatistics {
  userId: ID;
  totalContent: number;
  publishedContent: number;
  editableContent: number;
  byType: Record<ContentType, number>;
  byStatus: Record<ContentStatusType, number>;
  byCategory: Record<ContentCategory, number>;
  byFormat: Record<ContentFormatType, number>;
  byLanguage: Record<ContentLanguageCode, number>;
  byLicense: Record<ContentLicenseType, number>;
  byVisibility: Record<ContentVisibility, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  totalWords: number;
  averageWords: number;
  maxWords: number;
  minWords: number;
  totalTags: number;
  averageTags: number;
  mostFrequentType: ContentType;
  mostFrequentCategory: ContentCategory;
  mostFrequentStatus: ContentStatusType;
}

/**
 * Content Summary
 */
export interface ContentSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  published: number;
  editable: number;
  byType: Record<ContentType, number>;
  byStatus: Record<ContentStatusType, number>;
  byCategory: Record<ContentCategory, number>;
  byFormat: Record<ContentFormatType, number>;
  byLanguage: Record<ContentLanguageCode, number>;
  byLicense: Record<ContentLicenseType, number>;
  byVisibility: Record<ContentVisibility, number>;
  contentTrend: {
    date: Date;
    total: number;
    published: number;
  }[];
  topTypes: {
    type: ContentType;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: ContentCategory;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: ContentStatusType;
    count: number;
    label: string;
  }[];
}

/**
 * Content Configuration
 */
export interface ContentConfiguration {
  enabled: boolean;
  defaultType: ContentType;
  defaultStatus: ContentStatusType;
  defaultCategory: ContentCategory;
  defaultFormat: ContentFormatType;
  defaultLanguage: ContentLanguageCode;
  defaultLicense: ContentLicenseType;
  defaultVisibility: ContentVisibility;
  maxTags: number;
  maxCategories: number;
  maxWords: number;
  minWords: number;
  allowComments: boolean;
  allowDownloads: boolean;
  allowPrinting: boolean;
  notificationOnPublish: boolean;
  notificationOnUpdate: boolean;
  notificationOnDelete: boolean;
  alertConfig?: ContentAlertConfig;
}

/**
 * Content Alert Configuration
 */
export interface ContentAlertConfig {
  enabled: boolean;
  duplicateSlugAlert: boolean;
  inappropriateContentAlert: boolean;
  pendingApprovalAlert: boolean;
  expiryAlert: boolean;
  expiryThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Content History
 */
export interface ContentHistory extends BaseEntity, Timestamp {
  id: ID;
  contentId: ID;
  userId: ID;
  action: 'create' | 'update' | 'publish' | 'unpublish' | 'archive' | 'restore' | 'delete';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Content Validation
 */
export interface ContentValidation {
  isValid: boolean;
  contentId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Content Export
 */
export interface ContentExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'html' | 'markdown' | 'xml';
  filter: ContentFilter;
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
  // Content Error
  CONTENT_ERROR,
  ContentErrorType,
  ContentErrorSeverity,
  ContentErrorCategory,
  ContentErrorHTTPStatus,
  contentErrorGetMessage,
  contentErrorGetHTTPStatus,
  contentErrorGetSeverity,
  contentErrorGetCategory,
  contentErrorIsCritical,
  contentErrorIsRetryable,
  contentErrorIsValidationError,
  contentErrorIsPermissionError,
  contentErrorIsNotFound,
  contentErrorIsValidType,
  // Content Core
  CONTENT,
  ContentType,
  ContentStatus,
  ContentCategory,
  ContentTag,
  ContentFormat,
  ContentLanguage,
  ContentLicense,
  ContentVisibility,
  ContentAccess,
  contentGetTypeLabel,
  contentGetStatusLabel,
  contentGetCategoryLabel,
  contentGetTagLabel,
  contentGetFormatLabel,
  contentGetLanguageLabel,
  contentGetLicenseLabel,
  contentGetVisibilityLabel,
  contentIsPublished,
  contentIsEditable,
  contentIsValidType,
  contentIsValidStatus,
  contentIsValidCategory,
  contentIsValidTag,
  contentIsValidFormat,
  contentIsValidLanguage,
  contentIsValidLicense,
  contentGetDefaultLanguage,
  contentGetDefaultFormat,
  contentGetDefaultVisibility,
  contentGetDefaultStatus,
  contentGetMaxTags,
  contentGetMaxCategories,
  contentGetMaxWords,
  contentGetMinWords,
  // Content Type
  CONTENT_TYPE,
  ContentTypeCategory,
  ContentTypeComplexity,
  ContentTypePurpose,
  ContentTypeAudience,
  ContentTypeTone,
  ContentTypeFormat,
  ContentTypeQuality,
  contentTypeGetCategoryLabel,
  contentTypeGetComplexityLabel,
  contentTypeGetPurposeLabel,
  contentTypeGetAudienceLabel,
  contentTypeGetToneLabel,
  contentTypeGetFormatLabel,
  contentTypeGetQualityLabel,
  contentTypeIsValidCategory,
  contentTypeIsValidPurpose,
  // Content Status
  CONTENT_STATUS,
  ContentStatusType,
  ContentStatusCategory,
  ContentStatusColor,
  ContentStatusPriority,
  ContentState,
  ContentAction,
  contentStatusGetLabel,
  contentStatusGetCategory,
  contentStatusGetColor,
  contentStatusGetPriority,
  contentStatusIsPublished,
  contentStatusIsEditable,
  contentStatusIsArchived,
  contentStatusCanTransitionTo,
  contentStatusGetAvailableTransitions,
  contentStatusGetSequence,
  contentStatusGetStateLabel,
  contentStatusGetActionLabel,
  contentStatusIsValid,
  contentStatusIsValidState,
  // Content Category
  CONTENT_CATEGORY,
  ContentMainCategory,
  ContentSubCategory,
  ContentCategoryHierarchy,
  ContentCategoryType,
  ContentCategoryVisibility,
  contentCategoryGetMainLabel,
  contentCategoryGetSubLabel,
  contentCategoryGetHierarchyLabel,
  contentCategoryGetTypeLabel,
  contentCategoryGetVisibilityLabel,
  contentCategoryIsValidMain,
  contentCategoryIsValidSub,
  contentCategoryGetSubCategories,
  // Content Tag
  CONTENT_TAG,
  ContentPopularTag,
  ContentTopicTag,
  ContentTypeTag,
  ContentAudienceTag,
  ContentTagColor,
  ContentTagCategory,
  contentTagGetPopularLabel,
  contentTagGetTopicLabel,
  contentTagGetTypeLabel,
  contentTagGetAudienceLabel,
  contentTagGetColor,
  contentTagGetCategory,
  contentTagIsValidPopular,
  contentTagIsValidTopic,
  contentTagIsValidType,
  contentTagIsValidAudience,
  // Content Format
  CONTENT_FORMAT,
  ContentFormatType,
  ContentFormatMimeType,
  ContentFormatExtension,
  ContentFormatCategory,
  ContentFormatCapability,
  contentFormatGetLabel,
  contentFormatGetMimeType,
  contentFormatGetExtension,
  contentFormatGetCategory,
  contentFormatHasCapability,
  contentFormatIsValid,
  // Content Language
  CONTENT_LANGUAGE,
  ContentLanguageCode,
  ContentLanguageName,
  ContentLanguageNativeName,
  ContentLanguageFamily,
  ContentLanguageScript,
  ContentLanguageStatus,
  ContentRTLanguage,
  contentLanguageGetName,
  contentLanguageGetNativeName,
  contentLanguageGetFamily,
  contentLanguageGetScript,
  contentLanguageIsRTL,
  contentLanguageGetFallback,
  contentLanguageIsValid,
  contentLanguageGetDefault,
  contentLanguageGetAllCodes,
  contentLanguageGetAllNames,
  // Content License
  CONTENT_LICENSE,
  ContentLicenseType,
  ContentLicenseCategory,
  ContentLicensePermission,
  ContentLicenseRestriction,
  ContentLicenseCondition,
  ContentLicenseVersion,
  ContentLicenseURL,
  contentLicenseGetLabel,
  contentLicenseGetCategory,
  contentLicenseGetVersion,
  contentLicenseGetURL,
  contentLicenseHasPermission,
  contentLicenseHasRestriction,
  contentLicenseIsCompatible,
  contentLicenseIsValid,
  contentLicenseIsOpenSource,
};
