/**
 * SEO Schema Types
 * Type definitions for SEO schema based on shared-constants
 * @module SEOSchemaTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import common SEO types from common
// ============================================================
import type { SEOSchemaType } from '../common/seo.types';

// ============================================================
// Import from shared-constants seo schema
// ============================================================
import {
  // SEO Schema Main
  SEO_SCHEMA,
  SEOSchemaStatus,
  SEOSchemaValidation,
  SEOSchemaFormat,
  SEOSchemaContext,
  SEOSchemaPriority,
  SEOSchemaErrorType,
  SEOSchemaMetric,
  SEOSchemaTool,
  getSEOSchemaTypeLabel,
  getSEOSchemaStatusLabel,
  getSEOSchemaValidationLabel,
  getSEOSchemaFormatLabel,
  getSEOSchemaPriorityLabel,
  getSEOSchemaErrorLabel,
  getSEOSchemaToolLabel,
  getSchemaStatusColor,
  isSchemaValid,
  isSchemaActive,
  getSchemaCategory,
  // SEO Schema Type
  SEO_SCHEMA_TYPE,
  SEOSchemaTypeCategory,
  SEOSchemaTypeSubType,
  SEOSchemaTypeProperty,
  SEOSchemaTypePropertyGroup,
  SEOSchemaTypeComplexity,
  SEOSchemaTypePurpose,
  getSEOSchemaCategoryLabel,
  getSEOSchemaSubTypeLabel,
  getSEOSchemaPropertyLabel,
  getSEOSchemaPropertyGroupLabel,
  getSEOSchemaComplexityLabel,
  getSEOSchemaPurposeLabel,
  // SEO Schema Status
  SEO_SCHEMA_STATUS,
  SEOSchemaLifecycleStatus,
  SEOSchemaHealthStatus,
  SEOSchemaQualityStatus,
  SEOSchemaComplianceStatus,
  SEOSchemaPerformanceStatus,
  SEOSchemaStatusCategory,
  getSEOSchemaLifecycleLabel,
  getSEOSchemaHealthLabel,
  getSEOSchemaQualityLabel,
  getSEOSchemaComplianceLabel,
  getSEOSchemaPerformanceLabel,
  getSEOSchemaStatusCategory,
  getSEOSchemaStatusColor,
  isSchemaLifecycleValid,
  isSchemaProcessing,
} from '@vubon/shared-constants';

// ============================================================
// SEO Schema Extended Types
// ============================================================

/**
 * SEO schema
 */
export interface SEOSchema extends BaseEntity, Timestamp {
  id: ID;
  url: string;
  type: SEOSchemaType;
  status: SEOSchemaStatus;
  validation: SEOSchemaValidation;
  format: SEOSchemaFormat;
  context: SEOSchemaContext;
  priority: SEOSchemaPriority;
  tool: SEOSchemaTool;
  properties: SEOSchemaProperty[];
  isActive: boolean;
  isValid: boolean;
  isProcessing: boolean;
  checkedAt: Date;
  expiresAt?: Date;
  metadata?: Metadata;
}

/**
 * SEO schema property
 */
export interface SEOSchemaProperty extends BaseEntity, Timestamp {
  id: ID;
  schemaId: ID;
  property: string;
  value: unknown;
  type: string;
  isRequired: boolean;
  isActive: boolean;
  metadata?: Metadata;
}

/**
 * SEO schema filter
 */
export interface SEOSchemaFilter {
  ids?: ID[];
  urls?: string[];
  types?: SEOSchemaType[];
  statuses?: SEOSchemaStatus[];
  validations?: SEOSchemaValidation[];
  formats?: SEOSchemaFormat[];
  contexts?: SEOSchemaContext[];
  tools?: SEOSchemaTool[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isValid?: boolean;
  isProcessing?: boolean;
  searchTerm?: string;
}

/**
 * SEO schema statistics
 */
export interface SEOSchemaStatistics {
  totalSchemas: number;
  activeSchemas: number;
  validSchemas: number;
  processingSchemas: number;
  byType: Record<SEOSchemaType, number>;
  byStatus: Record<SEOSchemaStatus, number>;
  byValidation: Record<SEOSchemaValidation, number>;
  byFormat: Record<SEOSchemaFormat, number>;
  byContext: Record<SEOSchemaContext, number>;
  byTool: Record<SEOSchemaTool, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  mostFrequentType: SEOSchemaType;
  mostFrequentStatus: SEOSchemaStatus;
  mostFrequentFormat: SEOSchemaFormat;
  totalProperties: number;
  averageProperties: number;
}

/**
 * SEO schema summary
 */
export interface SEOSchemaSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalSchemas: number;
  active: number;
  valid: number;
  processing: number;
  byType: Record<SEOSchemaType, number>;
  byStatus: Record<SEOSchemaStatus, number>;
  byValidation: Record<SEOSchemaValidation, number>;
  byFormat: Record<SEOSchemaFormat, number>;
  byContext: Record<SEOSchemaContext, number>;
  byTool: Record<SEOSchemaTool, number>;
  schemaTrend: {
    date: Date;
    total: number;
    active: number;
    valid: number;
  }[];
  topTypes: {
    type: SEOSchemaType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: SEOSchemaStatus;
    count: number;
    label: string;
  }[];
  topFormats: {
    format: SEOSchemaFormat;
    count: number;
    label: string;
  }[];
  propertySummary: {
    total: number;
    average: number;
    max: number;
    min: number;
  };
}

/**
 * SEO schema configuration
 */
export interface SEOSchemaConfiguration {
  enabled: boolean;
  defaultType: SEOSchemaType;
  defaultStatus: SEOSchemaStatus;
  defaultFormat: SEOSchemaFormat;
  defaultContext: SEOSchemaContext;
  defaultTool: SEOSchemaTool;
  defaultPriority: SEOSchemaPriority;
  autoGenerate: boolean;
  autoValidate: boolean;
  requireValidation: boolean;
  requireProperties: boolean;
  maxSchemasPerUrl: number;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnValidation: boolean;
  notificationOnError: boolean;
  alertConfig?: SEOSchemaAlertConfig;
}

/**
 * SEO schema alert configuration
 */
export interface SEOSchemaAlertConfig {
  enabled: boolean;
  validationFailureAlert: boolean;
  propertyMissingAlert: boolean;
  generationErrorAlert: boolean;
  compatibilityAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * SEO schema history
 */
export interface SEOSchemaHistory extends BaseEntity, Timestamp {
  id: ID;
  schemaId: ID;
  action:
    | 'create'
    | 'update'
    | 'generate'
    | 'validate'
    | 'invalidate'
    | 'activate'
    | 'deactivate'
    | 'delete'
    | 'restore'
    | 'property_add'
    | 'property_remove'
    | 'property_update';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * SEO schema validation detail
 */
export interface SEOSchemaValidationDetail extends BaseEntity, Timestamp {
  id: ID;
  schemaId: ID;
  isValid: boolean;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
  checkedAt: Date;
  metadata?: Metadata;
}

/**
 * SEO schema export
 */
export interface SEOSchemaExport extends BaseEntity, Timestamp {
  id: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx' | 'jsonld';
  filter: SEOSchemaFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything (SEOSchemaType বাদে)
// ============================================================

export {
  // SEO Schema Main
  SEO_SCHEMA,
  SEOSchemaStatus,
  SEOSchemaValidation,
  SEOSchemaFormat,
  SEOSchemaContext,
  SEOSchemaPriority,
  SEOSchemaErrorType,
  SEOSchemaMetric,
  SEOSchemaTool,
  getSEOSchemaTypeLabel,
  getSEOSchemaStatusLabel,
  getSEOSchemaValidationLabel,
  getSEOSchemaFormatLabel,
  getSEOSchemaPriorityLabel,
  getSEOSchemaErrorLabel,
  getSEOSchemaToolLabel,
  getSchemaStatusColor,
  isSchemaValid,
  isSchemaActive,
  getSchemaCategory,
  // SEO Schema Type (SEOSchemaType বাদে)
  SEO_SCHEMA_TYPE,
  SEOSchemaTypeCategory,
  SEOSchemaTypeSubType,
  SEOSchemaTypeProperty,
  SEOSchemaTypePropertyGroup,
  SEOSchemaTypeComplexity,
  SEOSchemaTypePurpose,
  getSEOSchemaCategoryLabel,
  getSEOSchemaSubTypeLabel,
  getSEOSchemaPropertyLabel,
  getSEOSchemaPropertyGroupLabel,
  getSEOSchemaComplexityLabel,
  getSEOSchemaPurposeLabel,
  // SEO Schema Status
  SEO_SCHEMA_STATUS,
  SEOSchemaLifecycleStatus,
  SEOSchemaHealthStatus,
  SEOSchemaQualityStatus,
  SEOSchemaComplianceStatus,
  SEOSchemaPerformanceStatus,
  SEOSchemaStatusCategory,
  getSEOSchemaLifecycleLabel,
  getSEOSchemaHealthLabel,
  getSEOSchemaQualityLabel,
  getSEOSchemaComplianceLabel,
  getSEOSchemaPerformanceLabel,
  getSEOSchemaStatusCategory,
  getSEOSchemaStatusColor,
  isSchemaLifecycleValid,
  isSchemaProcessing,
};
