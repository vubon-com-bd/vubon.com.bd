/**
 * SEO Link Constants Index
 * Export all SEO link constants and types for easy importing
 */

// SEO Link Main Constants
export {
  SEO_LINK,
  getSEOLinkTypeLabel,
  getSEOLinkStatusLabel,
  getSEOLinkRelationLabel,
  getSEOLinkTargetLabel as getSEOLinkTargetTypeLabel,
  getSEOLinkAuthorityLabel,
  getSEOLinkPlacementLabel,
  getSEOLinkSourceLabel,
  getSEOLinkAnchorTextTypeLabel,
  getSEOLinkErrorLabel,
  isLinkActive,
  isLinkProblematic,
  getLinkStatusColor,
} from './seo-link.constants';

export type {
  SEOLinkType,
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
} from './seo-link.constants';

// SEO Link Type Constants
export {
  SEO_LINK_TYPE,
  getSEOLinkCategoryLabel,
  getSEOLinkSubTypeLabel,
  getSEOLinkRelationshipLabel,
  getSEOLinkDirectionLabel,
  getSEOLinkValueLabel,
  getSEOLinkContextLabel,
  getSEOLinkPositionLabel,
} from './seo-link-type.constants';

export type {
  SEOLinkTypeCategory,
  SEOLinkTypeSubType,
  SEOLinkTypeRelationship,
  SEOLinkTypeDirection,
  SEOLinkTypeValue,
  SEOLinkTypeContext,
  SEOLinkTypePosition,
} from './seo-link-type.constants';

// SEO Link Status Constants
export {
  SEO_LINK_STATUS,
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
} from './seo-link-status.constants';

export type {
  SEOLinkLifecycleStatus,
  SEOLinkHealthStatus,
  SEOLinkRiskStatus,
  SEOLinkQualityStatus,
  SEOLinkTrustStatus,
  SEOLinkAuthorityStatus,
  SEOLinkStatusCategory,
} from './seo-link-status.constants';

// SEO Link Attribute Constants
export {
  SEO_LINK_ATTRIBUTE,
  getSEOLinkAttributeLabel,
  getSEOLinkRelLabel,
  getSEOLinkTargetLabel as getSEOLinkAttributeTargetLabel,
  getSEOLinkMediaLabel,
  getSEOLinkReferrerPolicyLabel,
  getLinkAttributeCombination,
  buildLinkAttributes,
  getSEOLinkTypeValueLabel,
} from './seo-link-attribute.constants';

export type {
  SEOLinkAttributeType,
  SEOLinkAttributeRel,
  SEOLinkAttributeTarget,
  SEOLinkAttributeMedia,
  SEOLinkAttributeTypeValue,
  SEOLinkAttributeReferrerPolicy,
} from './seo-link-attribute.constants';
