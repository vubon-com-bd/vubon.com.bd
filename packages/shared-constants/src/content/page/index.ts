/**
 * Page Constants Index
 * Export all page constants and types for easy importing
 */

// Page Constants
export {
  CONTENT_PAGE,
  contentPageGetTypeLabel,
  contentPageGetStatusLabel,
  contentPageGetTemplateLabel,
  contentPageGetLayoutLabel,
  contentPageGetSectionLabel,
  contentPageGetVisibilityLabel,
  contentPageGetAccessLabel,
  contentPageIsPublished,
  contentPageIsEditable,
  contentPageGetDefaultStatus,
  contentPageGetDefaultVisibility,
  contentPageGetDefaultTemplate,
  contentPageGetDefaultLayout,
  contentPageIsValidType,
  contentPageIsValidStatus,
  contentPageIsValidTemplate,
  contentPageIsValidLayout,
  contentPageIsValidSection,
  contentPageGetDefaultSections,
  contentPageGetMaxSections,
} from './page.constants';

export type {
  ContentPageType,
  ContentPageStatus,
  ContentPageTemplate,
  ContentPageLayout,
  ContentPageSection,
  ContentPageVisibility,
  ContentPageAccess,
} from './page.constants';

// Page Status Constants
export {
  CONTENT_PAGE_STATUS,
  contentPageStatusGetLabel,
  contentPageStatusGetCategory,
  contentPageStatusGetColor,
  contentPageStatusGetPriority,
  contentPageStatusIsPublished,
  contentPageStatusIsEditable,
  contentPageStatusIsArchived,
  contentPageStatusCanTransitionTo,
  contentPageStatusGetAvailableTransitions,
  contentPageStatusGetSequence,
  contentPageStatusGetStateLabel,
  contentPageStatusGetActionLabel,
  contentPageStatusIsValid,
  contentPageStatusIsValidState,
} from './page-status.constants';

export type {
  ContentPageStatusType,
  ContentPageStatusCategory,
  ContentPageStatusColor,
  ContentPageStatusPriority,
  ContentPageState,
  ContentPageAction,
} from './page-status.constants';

// Page Template Constants
export {
  CONTENT_PAGE_TEMPLATE,
  contentPageTemplateGetCategoryLabel,
  contentPageTemplateGetComplexityLabel,
  contentPageTemplateGetFeatureLabel,
  contentPageTemplateGetSupportLabel,
  contentPageTemplateGetPerformanceLabel,
  contentPageTemplateGetSEOLabel,
  contentPageTemplateGetAccessibilityLabel,
  contentPageTemplateIsValidCategory,
  contentPageTemplateIsValidFeature,
} from './page-template.constants';

export type {
  ContentPageTemplateCategory,
  ContentPageTemplateComplexity,
  ContentPageTemplateFeature,
  ContentPageTemplateSupport,
  ContentPageTemplatePerformance,
  ContentPageTemplateSEO,
  ContentPageTemplateAccessibility,
} from './page-template.constants';

// Page Layout Constants
export {
  CONTENT_PAGE_LAYOUT,
  contentPageLayoutGetTypeLabel,
  contentPageLayoutGetStructureLabel,
  contentPageLayoutGetGridLabel,
  contentPageLayoutGetSpacingLabel,
  contentPageLayoutGetAlignmentLabel,
  contentPageLayoutGetBackgroundLabel,
  contentPageLayoutGetContainerLabel,
  contentPageLayoutGetBreakpointValue,
  contentPageLayoutIsValidType,
  contentPageLayoutIsValidStructure,
  contentPageLayoutIsValidGrid,
  contentPageLayoutGetDefaultType,
  contentPageLayoutGetDefaultStructure,
  contentPageLayoutGetDefaultGrid,
  contentPageLayoutGetDefaultSpacing,
  contentPageLayoutGetDefaultContainer,
} from './page-layout.constants';

export type {
  ContentPageLayoutType,
  ContentPageLayoutStructure,
  ContentPageLayoutGrid,
  ContentPageLayoutSpacing,
  ContentPageLayoutBreakpoint,
  ContentPageLayoutAlignment,
  ContentPageLayoutBackground,
  ContentPageLayoutContainer,
} from './page-layout.constants';
