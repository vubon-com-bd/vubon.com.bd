/**
 * Report Template Constants Index
 * Export all report template constants and types for easy importing
 */

// Report Template Constants
export {
  REPORT_TEMPLATE,
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
} from './report-template.constants';

export type {
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
} from './report-template.constants';

// Report Template Type Constants
export {
  REPORT_TEMPLATE_TYPE,
  reportTemplateTypeGetTypeLabel,
  reportTemplateTypeGetComplexityLabel,
  reportTemplateTypeGetUsageLabel,
  reportTemplateTypeGetAudienceLabel,
  reportTemplateTypeGetPurposeLabel,
  reportTemplateTypeGetIndustryLabel,
  reportTemplateTypeGetLanguageLabel,
  reportTemplateTypeIsValidType,
  reportTemplateTypeIsValidComplexity,
} from './report-template-type.constants';

export type {
  ReportTemplateTypeType,
  ReportTemplateComplexity,
  ReportTemplateUsage,
  ReportTemplateAudience,
  ReportTemplatePurpose,
  ReportTemplateIndustry,
  ReportTemplateLanguage,
} from './report-template-type.constants';

// Report Template Status Constants
export {
  REPORT_TEMPLATE_STATUS,
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
} from './report-template-status.constants';

export type {
  ReportTemplateStatusType,
  ReportTemplateStatusCategory,
  ReportTemplateStatusColor,
  ReportTemplateStatusPriority,
  ReportTemplateVisibility,
  ReportTemplateAccessLevel,
} from './report-template-status.constants';
