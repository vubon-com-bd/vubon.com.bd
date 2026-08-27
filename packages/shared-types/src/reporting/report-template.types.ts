/**
 * Report Template Types
 * Type definitions for report templates based on shared-constants
 * @module ReportTemplateTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants reporting report-template
// ============================================================
import {
  // Template Core
  REPORT_TEMPLATE,
  ReportTemplateCategory,
  ReportTemplateLayout,
  ReportTemplateSection,
  ReportTemplateComponent,
  ReportTemplateStyle,
  ReportTemplateTheme,
  ReportTemplateFont,
  ReportTemplateFontSize,
  ReportTemplateColor,
  ReportTemplatePaperSize,
  ReportTemplateOrientation,
  ReportTemplateMargin,
  ReportTemplateSpacing,
  ReportTemplateBorder,
  reportTemplateGetCategoryLabel,
  reportTemplateGetLayoutLabel,
  reportTemplateGetSectionLabel,
  reportTemplateGetComponentLabel,
  reportTemplateGetStyleLabel,
  reportTemplateGetThemeLabel,
  reportTemplateGetPaperSizeLabel,
  reportTemplateGetOrientationLabel,
  reportTemplateGetBorderLabel,
  reportTemplateGetDefaultFont,
  reportTemplateGetDefaultFontSize,
  reportTemplateGetDefaultMargin,
  reportTemplateIsValidCategory,
  reportTemplateIsValidLayout,
  reportTemplateIsValidStyle,
  // Template Type
  REPORT_TEMPLATE_TYPE,
  ReportTemplateTypeType,
  ReportTemplateComplexity,
  ReportTemplateUsage,
  ReportTemplateAudience,
  ReportTemplatePurpose,
  ReportTemplateIndustry,
  ReportTemplateLanguage,
  reportTemplateTypeGetTypeLabel,
  reportTemplateTypeGetComplexityLabel,
  reportTemplateTypeGetUsageLabel,
  reportTemplateTypeGetAudienceLabel,
  reportTemplateTypeGetPurposeLabel,
  reportTemplateTypeGetIndustryLabel,
  reportTemplateTypeGetLanguageLabel,
  reportTemplateTypeIsValidType,
  reportTemplateTypeIsValidComplexity,
  // Template Status
  REPORT_TEMPLATE_STATUS,
  ReportTemplateStatusType,
  ReportTemplateStatusCategory,
  ReportTemplateStatusColor,
  ReportTemplateStatusPriority,
  ReportTemplateVisibility,
  ReportTemplateAccessLevel,
  reportTemplateStatusGetLabel,
  reportTemplateStatusGetCategory,
  reportTemplateStatusGetColor,
  reportTemplateStatusGetPriority,
  reportTemplateStatusIsPublished,
  reportTemplateStatusIsApproved,
  reportTemplateStatusIsArchived,
  reportTemplateStatusCanTransitionTo,
  reportTemplateStatusGetAvailableTransitions,
  reportTemplateStatusGetSequence,
  reportTemplateStatusGetVisibilityLabel,
  reportTemplateStatusGetAccessLevelLabel,
  reportTemplateStatusIsValid,
  reportTemplateStatusIsValidVisibility,
} from '@vubon/shared-constants';

// ============================================================
// Report Template Extended Types (রিনেম করা হয়েছে কনফ্লিক্ট এড়াতে)
// ============================================================

/**
 * Report Template Section Detail
 */
export interface ReportTemplateSectionDetail {
  id: string;
  title: string;
  order: number;
  components: ReportTemplateComponentDetail[];
  metadata?: Metadata;
}

/**
 * Report Template Component Detail
 */
export interface ReportTemplateComponentDetail {
  id: string;
  type: ReportTemplateComponent;
  title: string;
  dataSource?: string;
  config?: Record<string, unknown>;
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  metadata?: Metadata;
}

/**
 * Report Template
 */
export interface ReportTemplate extends BaseEntity, Timestamp {
  id: ID;
  name: string;
  description?: string;
  category: ReportTemplateCategory;
  layout: ReportTemplateLayout;
  style: ReportTemplateStyle;
  theme: ReportTemplateTheme;
  font: ReportTemplateFont;
  fontSize: ReportTemplateFontSize;
  color: ReportTemplateColor;
  paperSize: ReportTemplatePaperSize;
  orientation: ReportTemplateOrientation;
  margin: ReportTemplateMargin;
  spacing: ReportTemplateSpacing;
  border: ReportTemplateBorder;
  type: ReportTemplateTypeType;
  complexity: ReportTemplateComplexity;
  usage: ReportTemplateUsage;
  audience: ReportTemplateAudience;
  purpose: ReportTemplatePurpose;
  industry: ReportTemplateIndustry;
  language: ReportTemplateLanguage;
  status: ReportTemplateStatusType;
  visibility: ReportTemplateVisibility;
  accessLevel: ReportTemplateAccessLevel;
  sections: ReportTemplateSectionDetail[];
  isPublished: boolean;
  isApproved: boolean;
  isArchived: boolean;
  version: string;
  metadata?: Metadata;
}

/**
 * Report Template Filter
 */
export interface ReportTemplateFilter {
  ids?: ID[];
  categories?: ReportTemplateCategory[];
  layouts?: ReportTemplateLayout[];
  styles?: ReportTemplateStyle[];
  themes?: ReportTemplateTheme[];
  types?: ReportTemplateTypeType[];
  complexities?: ReportTemplateComplexity[];
  usages?: ReportTemplateUsage[];
  audiences?: ReportTemplateAudience[];
  purposes?: ReportTemplatePurpose[];
  industries?: ReportTemplateIndustry[];
  languages?: ReportTemplateLanguage[];
  statuses?: ReportTemplateStatusType[];
  visibilities?: ReportTemplateVisibility[];
  accessLevels?: ReportTemplateAccessLevel[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isPublished?: boolean;
  isApproved?: boolean;
  isArchived?: boolean;
  searchTerm?: string;
}

/**
 * Report Template Statistics
 */
export interface ReportTemplateStatistics {
  totalTemplates: number;
  publishedTemplates: number;
  approvedTemplates: number;
  archivedTemplates: number;
  byCategory: Record<ReportTemplateCategory, number>;
  byLayout: Record<ReportTemplateLayout, number>;
  byStyle: Record<ReportTemplateStyle, number>;
  byTheme: Record<ReportTemplateTheme, number>;
  byType: Record<ReportTemplateTypeType, number>;
  byComplexity: Record<ReportTemplateComplexity, number>;
  byUsage: Record<ReportTemplateUsage, number>;
  byAudience: Record<ReportTemplateAudience, number>;
  byPurpose: Record<ReportTemplatePurpose, number>;
  byIndustry: Record<ReportTemplateIndustry, number>;
  byLanguage: Record<ReportTemplateLanguage, number>;
  byStatus: Record<ReportTemplateStatusType, number>;
  byVisibility: Record<ReportTemplateVisibility, number>;
  byAccessLevel: Record<ReportTemplateAccessLevel, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  mostFrequentCategory: ReportTemplateCategory;
  mostFrequentLayout: ReportTemplateLayout;
  mostFrequentStyle: ReportTemplateStyle;
  mostFrequentType: ReportTemplateTypeType;
  mostFrequentStatus: ReportTemplateStatusType;
}

/**
 * Report Template Summary
 */
export interface ReportTemplateSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalTemplates: number;
  published: number;
  approved: number;
  archived: number;
  byCategory: Record<ReportTemplateCategory, number>;
  byLayout: Record<ReportTemplateLayout, number>;
  byStyle: Record<ReportTemplateStyle, number>;
  byTheme: Record<ReportTemplateTheme, number>;
  byType: Record<ReportTemplateTypeType, number>;
  byComplexity: Record<ReportTemplateComplexity, number>;
  byUsage: Record<ReportTemplateUsage, number>;
  byAudience: Record<ReportTemplateAudience, number>;
  byPurpose: Record<ReportTemplatePurpose, number>;
  byIndustry: Record<ReportTemplateIndustry, number>;
  byLanguage: Record<ReportTemplateLanguage, number>;
  byStatus: Record<ReportTemplateStatusType, number>;
  byVisibility: Record<ReportTemplateVisibility, number>;
  byAccessLevel: Record<ReportTemplateAccessLevel, number>;
  templateTrend: {
    date: Date;
    total: number;
    published: number;
    approved: number;
  }[];
  topCategories: {
    category: ReportTemplateCategory;
    count: number;
    label: string;
  }[];
  topLayouts: {
    layout: ReportTemplateLayout;
    count: number;
    label: string;
  }[];
  topTypes: {
    type: ReportTemplateTypeType;
    count: number;
    label: string;
  }[];
}

/**
 * Report Template Configuration
 */
export interface ReportTemplateConfiguration {
  enabled: boolean;
  defaultCategory: ReportTemplateCategory;
  defaultLayout: ReportTemplateLayout;
  defaultStyle: ReportTemplateStyle;
  defaultTheme: ReportTemplateTheme;
  defaultFont: ReportTemplateFont;
  defaultFontSize: ReportTemplateFontSize;
  defaultPaperSize: ReportTemplatePaperSize;
  defaultOrientation: ReportTemplateOrientation;
  defaultMargin: ReportTemplateMargin;
  defaultSpacing: ReportTemplateSpacing;
  defaultBorder: ReportTemplateBorder;
  requireApproval: boolean;
  allowCustomization: boolean;
  allowVersioning: boolean;
  maxVersions: number;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnPublish: boolean;
  notificationOnApprove: boolean;
  notificationOnArchive: boolean;
  alertConfig?: ReportTemplateAlertConfig;
}

/**
 * Report Template Alert Configuration
 */
export interface ReportTemplateAlertConfig {
  enabled: boolean;
  duplicateNameAlert: boolean;
  invalidLayoutAlert: boolean;
  performanceAlert: boolean;
  performanceThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Report Template History
 */
export interface ReportTemplateHistory extends BaseEntity, Timestamp {
  id: ID;
  templateId: ID;
  action:
    | 'create'
    | 'update'
    | 'publish'
    | 'unpublish'
    | 'approve'
    | 'reject'
    | 'archive'
    | 'restore'
    | 'delete'
    | 'version';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Report Template Validation
 */
export interface ReportTemplateValidation {
  isValid: boolean;
  templateId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Report Template Version
 */
export interface ReportTemplateVersion extends BaseEntity, Timestamp {
  id: ID;
  templateId: ID;
  version: string;
  name: string;
  description?: string;
  layout: ReportTemplateLayout;
  style: ReportTemplateStyle;
  theme: ReportTemplateTheme;
  sections: ReportTemplateSectionDetail[];
  createdBy: ID;
  isActive: boolean;
  metadata?: Metadata;
}

/**
 * Report Template Export
 */
export interface ReportTemplateExport extends BaseEntity, Timestamp {
  id: ID;
  templateId: ID;
  format: 'json' | 'xml' | 'html' | 'pdf' | 'docx';
  filter: ReportTemplateFilter;
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
  // Template Core
  REPORT_TEMPLATE,
  ReportTemplateCategory,
  ReportTemplateLayout,
  ReportTemplateSection,
  ReportTemplateComponent,
  ReportTemplateStyle,
  ReportTemplateTheme,
  ReportTemplateFont,
  ReportTemplateFontSize,
  ReportTemplateColor,
  ReportTemplatePaperSize,
  ReportTemplateOrientation,
  ReportTemplateMargin,
  ReportTemplateSpacing,
  ReportTemplateBorder,
  reportTemplateGetCategoryLabel,
  reportTemplateGetLayoutLabel,
  reportTemplateGetSectionLabel,
  reportTemplateGetComponentLabel,
  reportTemplateGetStyleLabel,
  reportTemplateGetThemeLabel,
  reportTemplateGetPaperSizeLabel,
  reportTemplateGetOrientationLabel,
  reportTemplateGetBorderLabel,
  reportTemplateGetDefaultFont,
  reportTemplateGetDefaultFontSize,
  reportTemplateGetDefaultMargin,
  reportTemplateIsValidCategory,
  reportTemplateIsValidLayout,
  reportTemplateIsValidStyle,
  // Template Type
  REPORT_TEMPLATE_TYPE,
  ReportTemplateTypeType,
  ReportTemplateComplexity,
  ReportTemplateUsage,
  ReportTemplateAudience,
  ReportTemplatePurpose,
  ReportTemplateIndustry,
  ReportTemplateLanguage,
  reportTemplateTypeGetTypeLabel,
  reportTemplateTypeGetComplexityLabel,
  reportTemplateTypeGetUsageLabel,
  reportTemplateTypeGetAudienceLabel,
  reportTemplateTypeGetPurposeLabel,
  reportTemplateTypeGetIndustryLabel,
  reportTemplateTypeGetLanguageLabel,
  reportTemplateTypeIsValidType,
  reportTemplateTypeIsValidComplexity,
  // Template Status
  REPORT_TEMPLATE_STATUS,
  ReportTemplateStatusType,
  ReportTemplateStatusCategory,
  ReportTemplateStatusColor,
  ReportTemplateStatusPriority,
  ReportTemplateVisibility,
  ReportTemplateAccessLevel,
  reportTemplateStatusGetLabel,
  reportTemplateStatusGetCategory,
  reportTemplateStatusGetColor,
  reportTemplateStatusGetPriority,
  reportTemplateStatusIsPublished,
  reportTemplateStatusIsApproved,
  reportTemplateStatusIsArchived,
  reportTemplateStatusCanTransitionTo,
  reportTemplateStatusGetAvailableTransitions,
  reportTemplateStatusGetSequence,
  reportTemplateStatusGetVisibilityLabel,
  reportTemplateStatusGetAccessLevelLabel,
  reportTemplateStatusIsValid,
  reportTemplateStatusIsValidVisibility,
};
