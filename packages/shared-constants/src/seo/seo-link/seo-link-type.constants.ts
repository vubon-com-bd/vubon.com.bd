/**
 * SEO Link Type Constants
 * Types and classifications for SEO links
 */

export const SEO_LINK_TYPE = {
  // Link Categories
  CATEGORIES: {
    INTERNAL: 'internal',
    EXTERNAL: 'external',
    INCOMING: 'incoming',
    OUTGOING: 'outgoing',
  } as const,

  // Link Sub-types
  SUB_TYPES: {
    // Internal
    NAVIGATIONAL: 'navigational',
    CONTEXTUAL: 'contextual',
    FOOTER: 'footer',
    SIDEBAR: 'sidebar',
    BREADCRUMB: 'breadcrumb',
    RELATED: 'related',
    FEATURED: 'featured',

    // External
    REFERRAL: 'referral',
    BACKLINK: 'backlink',
    CITATION: 'citation',
    REFERENCE: 'reference',
    ATTRIBUTION: 'attribution',

    // Incoming
    ORGANIC: 'organic',
    SOCIAL: 'social',
    PAID: 'paid',
    SPONSORED: 'sponsored',
    GUEST: 'guest',
    PRESS: 'press',
    DIRECTORY: 'directory',

    // Outgoing
    AFFILIATE: 'affiliate',
    PARTNER: 'partner',
    RESOURCE: 'resource',
    AUTHORITY: 'authority',
  } as const,

  // Link Relationship Types
  RELATIONSHIP_TYPES: {
    DOFOLLOW: 'dofollow',
    NOFOLLOW: 'nofollow',
    SPONSORED: 'sponsored',
    UGC: 'ugc',
    CANONICAL: 'canonical',
    ALTERNATE: 'alternate',
  } as const,

  // Link Direction Types
  DIRECTION_TYPES: {
    INBOUND: 'inbound',
    OUTBOUND: 'outbound',
    TWO_WAY: 'two_way',
    ONE_WAY: 'one_way',
    RECIPROCAL: 'reciprocal',
  } as const,

  // Link Value Types
  VALUE_TYPES: {
    HIGH_VALUE: 'high_value',
    MEDIUM_VALUE: 'medium_value',
    LOW_VALUE: 'low_value',
    NO_VALUE: 'no_value',
    NEGATIVE_VALUE: 'negative_value',
  } as const,

  // Link Context Types
  CONTEXT_TYPES: {
    EDITORIAL: 'editorial',
    COMMERCIAL: 'commercial',
    INFORMATIONAL: 'informational',
    NAVIGATIONAL: 'navigational',
    SOCIAL: 'social',
    PROMOTIONAL: 'promotional',
  } as const,

  // Link Position Types
  POSITION_TYPES: {
    ABOVE_THE_FOLD: 'above_the_fold',
    BELOW_THE_FOLD: 'below_the_fold',
    HEADER: 'header',
    FOOTER: 'footer',
    SIDEBAR: 'sidebar',
    CONTENT: 'content',
    COMMENT: 'comment',
    WIDGET: 'widget',
  } as const,
} as const;

// Link Categories
export type SEOLinkTypeCategory =
  (typeof SEO_LINK_TYPE.CATEGORIES)[keyof typeof SEO_LINK_TYPE.CATEGORIES];

// Link Sub-types
export type SEOLinkTypeSubType =
  (typeof SEO_LINK_TYPE.SUB_TYPES)[keyof typeof SEO_LINK_TYPE.SUB_TYPES];

// Link Relationship Types
export type SEOLinkTypeRelationship =
  (typeof SEO_LINK_TYPE.RELATIONSHIP_TYPES)[keyof typeof SEO_LINK_TYPE.RELATIONSHIP_TYPES];

// Link Direction Types
export type SEOLinkTypeDirection =
  (typeof SEO_LINK_TYPE.DIRECTION_TYPES)[keyof typeof SEO_LINK_TYPE.DIRECTION_TYPES];

// Link Value Types
export type SEOLinkTypeValue =
  (typeof SEO_LINK_TYPE.VALUE_TYPES)[keyof typeof SEO_LINK_TYPE.VALUE_TYPES];

// Link Context Types
export type SEOLinkTypeContext =
  (typeof SEO_LINK_TYPE.CONTEXT_TYPES)[keyof typeof SEO_LINK_TYPE.CONTEXT_TYPES];

// Link Position Types
export type SEOLinkTypePosition =
  (typeof SEO_LINK_TYPE.POSITION_TYPES)[keyof typeof SEO_LINK_TYPE.POSITION_TYPES];

// Utility Functions
export function getSEOLinkCategoryLabel(category: SEOLinkTypeCategory): string {
  const labels: Record<SEOLinkTypeCategory, string> = {
    [SEO_LINK_TYPE.CATEGORIES.INTERNAL]: 'Internal Links',
    [SEO_LINK_TYPE.CATEGORIES.EXTERNAL]: 'External Links',
    [SEO_LINK_TYPE.CATEGORIES.INCOMING]: 'Incoming Links',
    [SEO_LINK_TYPE.CATEGORIES.OUTGOING]: 'Outgoing Links',
  };
  return labels[category] || 'Unknown Category';
}

export function getSEOLinkSubTypeLabel(subType: SEOLinkTypeSubType): string {
  const labels: Record<SEOLinkTypeSubType, string> = {
    // Internal
    [SEO_LINK_TYPE.SUB_TYPES.NAVIGATIONAL]: 'Navigational Link',
    [SEO_LINK_TYPE.SUB_TYPES.CONTEXTUAL]: 'Contextual Link',
    [SEO_LINK_TYPE.SUB_TYPES.FOOTER]: 'Footer Link',
    [SEO_LINK_TYPE.SUB_TYPES.SIDEBAR]: 'Sidebar Link',
    [SEO_LINK_TYPE.SUB_TYPES.BREADCRUMB]: 'Breadcrumb Link',
    [SEO_LINK_TYPE.SUB_TYPES.RELATED]: 'Related Link',
    [SEO_LINK_TYPE.SUB_TYPES.FEATURED]: 'Featured Link',

    // External
    [SEO_LINK_TYPE.SUB_TYPES.REFERRAL]: 'Referral Link',
    [SEO_LINK_TYPE.SUB_TYPES.BACKLINK]: 'Backlink',
    [SEO_LINK_TYPE.SUB_TYPES.CITATION]: 'Citation Link',
    [SEO_LINK_TYPE.SUB_TYPES.REFERENCE]: 'Reference Link',
    [SEO_LINK_TYPE.SUB_TYPES.ATTRIBUTION]: 'Attribution Link',

    // Incoming
    [SEO_LINK_TYPE.SUB_TYPES.ORGANIC]: 'Organic Link',
    [SEO_LINK_TYPE.SUB_TYPES.SOCIAL]: 'Social Media Link',
    [SEO_LINK_TYPE.SUB_TYPES.PAID]: 'Paid Link',
    [SEO_LINK_TYPE.SUB_TYPES.SPONSORED]: 'Sponsored Link',
    [SEO_LINK_TYPE.SUB_TYPES.GUEST]: 'Guest Post Link',
    [SEO_LINK_TYPE.SUB_TYPES.PRESS]: 'Press Release Link',
    [SEO_LINK_TYPE.SUB_TYPES.DIRECTORY]: 'Directory Link',

    // Outgoing
    [SEO_LINK_TYPE.SUB_TYPES.AFFILIATE]: 'Affiliate Link',
    [SEO_LINK_TYPE.SUB_TYPES.PARTNER]: 'Partner Link',
    [SEO_LINK_TYPE.SUB_TYPES.RESOURCE]: 'Resource Link',
    [SEO_LINK_TYPE.SUB_TYPES.AUTHORITY]: 'Authority Link',
  };
  return labels[subType] || 'Unknown Sub-type';
}

export function getSEOLinkRelationshipLabel(relationship: SEOLinkTypeRelationship): string {
  const labels: Record<SEOLinkTypeRelationship, string> = {
    [SEO_LINK_TYPE.RELATIONSHIP_TYPES.DOFOLLOW]: 'Dofollow',
    [SEO_LINK_TYPE.RELATIONSHIP_TYPES.NOFOLLOW]: 'Nofollow',
    [SEO_LINK_TYPE.RELATIONSHIP_TYPES.SPONSORED]: 'Sponsored',
    [SEO_LINK_TYPE.RELATIONSHIP_TYPES.UGC]: 'UGC',
    [SEO_LINK_TYPE.RELATIONSHIP_TYPES.CANONICAL]: 'Canonical',
    [SEO_LINK_TYPE.RELATIONSHIP_TYPES.ALTERNATE]: 'Alternate',
  };
  return labels[relationship] || 'Unknown Relationship';
}

export function getSEOLinkDirectionLabel(direction: SEOLinkTypeDirection): string {
  const labels: Record<SEOLinkTypeDirection, string> = {
    [SEO_LINK_TYPE.DIRECTION_TYPES.INBOUND]: 'Inbound Link',
    [SEO_LINK_TYPE.DIRECTION_TYPES.OUTBOUND]: 'Outbound Link',
    [SEO_LINK_TYPE.DIRECTION_TYPES.TWO_WAY]: 'Two-Way Link',
    [SEO_LINK_TYPE.DIRECTION_TYPES.ONE_WAY]: 'One-Way Link',
    [SEO_LINK_TYPE.DIRECTION_TYPES.RECIPROCAL]: 'Reciprocal Link',
  };
  return labels[direction] || 'Unknown Direction';
}

export function getSEOLinkValueLabel(value: SEOLinkTypeValue): string {
  const labels: Record<SEOLinkTypeValue, string> = {
    [SEO_LINK_TYPE.VALUE_TYPES.HIGH_VALUE]: 'High Value',
    [SEO_LINK_TYPE.VALUE_TYPES.MEDIUM_VALUE]: 'Medium Value',
    [SEO_LINK_TYPE.VALUE_TYPES.LOW_VALUE]: 'Low Value',
    [SEO_LINK_TYPE.VALUE_TYPES.NO_VALUE]: 'No Value',
    [SEO_LINK_TYPE.VALUE_TYPES.NEGATIVE_VALUE]: 'Negative Value',
  };
  return labels[value] || 'Unknown Value';
}

export function getSEOLinkContextLabel(context: SEOLinkTypeContext): string {
  const labels: Record<SEOLinkTypeContext, string> = {
    [SEO_LINK_TYPE.CONTEXT_TYPES.EDITORIAL]: 'Editorial Context',
    [SEO_LINK_TYPE.CONTEXT_TYPES.COMMERCIAL]: 'Commercial Context',
    [SEO_LINK_TYPE.CONTEXT_TYPES.INFORMATIONAL]: 'Informational Context',
    [SEO_LINK_TYPE.CONTEXT_TYPES.NAVIGATIONAL]: 'Navigational Context',
    [SEO_LINK_TYPE.CONTEXT_TYPES.SOCIAL]: 'Social Context',
    [SEO_LINK_TYPE.CONTEXT_TYPES.PROMOTIONAL]: 'Promotional Context',
  };
  return labels[context] || 'Unknown Context';
}

export function getSEOLinkPositionLabel(position: SEOLinkTypePosition): string {
  const labels: Record<SEOLinkTypePosition, string> = {
    [SEO_LINK_TYPE.POSITION_TYPES.ABOVE_THE_FOLD]: 'Above the Fold',
    [SEO_LINK_TYPE.POSITION_TYPES.BELOW_THE_FOLD]: 'Below the Fold',
    [SEO_LINK_TYPE.POSITION_TYPES.HEADER]: 'Header Position',
    [SEO_LINK_TYPE.POSITION_TYPES.FOOTER]: 'Footer Position',
    [SEO_LINK_TYPE.POSITION_TYPES.SIDEBAR]: 'Sidebar Position',
    [SEO_LINK_TYPE.POSITION_TYPES.CONTENT]: 'Content Position',
    [SEO_LINK_TYPE.POSITION_TYPES.COMMENT]: 'Comment Position',
    [SEO_LINK_TYPE.POSITION_TYPES.WIDGET]: 'Widget Position',
  };
  return labels[position] || 'Unknown Position';
}
