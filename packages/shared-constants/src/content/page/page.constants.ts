/**
 * Page Constants
 * Configuration for pages, templates, and layouts
 */

export const CONTENT_PAGE = {
  // Page Types
  TYPES: {
    STANDARD: 'standard',
    LANDING: 'landing',
    HOME: 'home',
    ABOUT: 'about',
    CONTACT: 'contact',
    BLOG: 'blog',
    PRODUCT: 'product',
    CATEGORY: 'category',
    COLLECTION: 'collection',
    BRAND: 'brand',
    CART: 'cart',
    CHECKOUT: 'checkout',
    ACCOUNT: 'account',
    PROFILE: 'profile',
    SETTINGS: 'settings',
    DASHBOARD: 'dashboard',
    HELP: 'help',
    FAQ: 'faq',
    PRIVACY: 'privacy',
    TERMS: 'terms',
    REFUND: 'refund',
    SHIPPING: 'shipping',
    CAREER: 'career',
    SITEMAP: 'sitemap',
    CUSTOM: 'custom',
  } as const,

  // Page Statuses
  STATUSES: {
    DRAFT: 'draft',
    PENDING_REVIEW: 'pending_review',
    IN_REVIEW: 'in_review',
    REVIEWED: 'reviewed',
    PENDING_APPROVAL: 'pending_approval',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    PUBLISHED: 'published',
    SCHEDULED: 'scheduled',
    PRIVATE: 'private',
    UNLISTED: 'unlisted',
    ARCHIVED: 'archived',
    DEPRECATED: 'deprecated',
    DELETED: 'deleted',
  } as const,

  // Page Templates
  TEMPLATES: {
    DEFAULT: 'default',
    MODERN: 'modern',
    MINIMAL: 'minimal',
    PROFESSIONAL: 'professional',
    CREATIVE: 'creative',
    ELEGANT: 'elegant',
    BOLD: 'bold',
    LIGHT: 'light',
    DARK: 'dark',
    COLORFUL: 'colorful',
    MONOCHROME: 'monochrome',
    CORPORATE: 'corporate',
    STARTUP: 'startup',
    AGENCY: 'agency',
    PORTFOLIO: 'portfolio',
    ECOMMERCE: 'ecommerce',
    BLOG: 'blog',
    MAGAZINE: 'magazine',
    NEWSPAPER: 'newspaper',
    CUSTOM: 'custom',
  } as const,

  // Page Layouts
  LAYOUTS: {
    STANDARD: 'standard',
    FULL_WIDTH: 'full_width',
    BOXED: 'boxed',
    SIDEBAR_LEFT: 'sidebar_left',
    SIDEBAR_RIGHT: 'sidebar_right',
    TWO_COLUMN: 'two_column',
    THREE_COLUMN: 'three_column',
    SPLIT_SCREEN: 'split_screen',
    HERO: 'hero',
    GRID: 'grid',
    MASONRY: 'masonry',
    CAROUSEL: 'carousel',
    SLIDER: 'slider',
    CUSTOM: 'custom',
  } as const,

  // Page Sections
  SECTIONS: {
    HEADER: 'header',
    FOOTER: 'footer',
    HERO: 'hero',
    CONTENT: 'content',
    SIDEBAR: 'sidebar',
    TESTIMONIALS: 'testimonials',
    FEATURES: 'features',
    SERVICES: 'services',
    PORTFOLIO: 'portfolio',
    TEAM: 'team',
    PRICING: 'pricing',
    FAQ: 'faq',
    CONTACT: 'contact',
    MAP: 'map',
    FORM: 'form',
    CTA: 'cta',
    NEWSLETTER: 'newsletter',
    SOCIAL: 'social',
    BLOG_FEED: 'blog_feed',
    PRODUCT_FEED: 'product_feed',
    GALLERY: 'gallery',
    STATISTICS: 'statistics',
    PARTNERS: 'partners',
    AWARDS: 'awards',
    TIMELINE: 'timeline',
  } as const,

  // Page Visibility
  VISIBILITY: {
    PUBLIC: 'public',
    PRIVATE: 'private',
    UNLISTED: 'unlisted',
    PASSWORD_PROTECTED: 'password_protected',
    MEMBERS_ONLY: 'members_only',
    SUBSCRIBERS_ONLY: 'subscribers_only',
    PREMIUM_ONLY: 'premium_only',
    TEAM_ONLY: 'team_only',
  } as const,

  // Page Access
  ACCESS: {
    PUBLIC: 'public',
    RESTRICTED: 'restricted',
    CONFIDENTIAL: 'confidential',
    INTERNAL: 'internal',
    EXTERNAL: 'external',
    PARTNER: 'partner',
    CUSTOM: 'custom',
  } as const,

  // Page Defaults
  DEFAULTS: {
    STATUS: 'draft',
    VISIBILITY: 'public',
    TEMPLATE: 'default',
    LAYOUT: 'standard',
    SECTIONS: ['header', 'hero', 'content', 'footer'],
  } as const,

  // Page Limits
  LIMITS: {
    MAX_TITLE_LENGTH: 200,
    MAX_DESCRIPTION_LENGTH: 500,
    MAX_CONTENT_LENGTH: 1000000,
    MAX_SECTIONS: 30,
    MAX_IMAGES: 100,
    MAX_ATTACHMENTS: 50,
  } as const,
} as const;

// Page Types
export type ContentPageType = (typeof CONTENT_PAGE.TYPES)[keyof typeof CONTENT_PAGE.TYPES];

// Page Statuses
export type ContentPageStatus = (typeof CONTENT_PAGE.STATUSES)[keyof typeof CONTENT_PAGE.STATUSES];

// Page Templates
export type ContentPageTemplate =
  (typeof CONTENT_PAGE.TEMPLATES)[keyof typeof CONTENT_PAGE.TEMPLATES];

// Page Layouts
export type ContentPageLayout = (typeof CONTENT_PAGE.LAYOUTS)[keyof typeof CONTENT_PAGE.LAYOUTS];

// Page Sections
export type ContentPageSection = (typeof CONTENT_PAGE.SECTIONS)[keyof typeof CONTENT_PAGE.SECTIONS];

// Page Visibility
export type ContentPageVisibility =
  (typeof CONTENT_PAGE.VISIBILITY)[keyof typeof CONTENT_PAGE.VISIBILITY];

// Page Access
export type ContentPageAccess = (typeof CONTENT_PAGE.ACCESS)[keyof typeof CONTENT_PAGE.ACCESS];

// Utility Functions
export function contentPageGetTypeLabel(type: ContentPageType): string {
  const labels: Record<ContentPageType, string> = {
    [CONTENT_PAGE.TYPES.STANDARD]: 'Standard Page',
    [CONTENT_PAGE.TYPES.LANDING]: 'Landing Page',
    [CONTENT_PAGE.TYPES.HOME]: 'Home Page',
    [CONTENT_PAGE.TYPES.ABOUT]: 'About Page',
    [CONTENT_PAGE.TYPES.CONTACT]: 'Contact Page',
    [CONTENT_PAGE.TYPES.BLOG]: 'Blog Page',
    [CONTENT_PAGE.TYPES.PRODUCT]: 'Product Page',
    [CONTENT_PAGE.TYPES.CATEGORY]: 'Category Page',
    [CONTENT_PAGE.TYPES.COLLECTION]: 'Collection Page',
    [CONTENT_PAGE.TYPES.BRAND]: 'Brand Page',
    [CONTENT_PAGE.TYPES.CART]: 'Cart Page',
    [CONTENT_PAGE.TYPES.CHECKOUT]: 'Checkout Page',
    [CONTENT_PAGE.TYPES.ACCOUNT]: 'Account Page',
    [CONTENT_PAGE.TYPES.PROFILE]: 'Profile Page',
    [CONTENT_PAGE.TYPES.SETTINGS]: 'Settings Page',
    [CONTENT_PAGE.TYPES.DASHBOARD]: 'Dashboard Page',
    [CONTENT_PAGE.TYPES.HELP]: 'Help Page',
    [CONTENT_PAGE.TYPES.FAQ]: 'FAQ Page',
    [CONTENT_PAGE.TYPES.PRIVACY]: 'Privacy Policy Page',
    [CONTENT_PAGE.TYPES.TERMS]: 'Terms of Service Page',
    [CONTENT_PAGE.TYPES.REFUND]: 'Refund Policy Page',
    [CONTENT_PAGE.TYPES.SHIPPING]: 'Shipping Policy Page',
    [CONTENT_PAGE.TYPES.CAREER]: 'Career Page',
    [CONTENT_PAGE.TYPES.SITEMAP]: 'Sitemap Page',
    [CONTENT_PAGE.TYPES.CUSTOM]: 'Custom Page',
  };
  return labels[type] || 'Unknown Page Type';
}

export function contentPageGetStatusLabel(status: ContentPageStatus): string {
  const labels: Record<ContentPageStatus, string> = {
    [CONTENT_PAGE.STATUSES.DRAFT]: 'Draft',
    [CONTENT_PAGE.STATUSES.PENDING_REVIEW]: 'Pending Review',
    [CONTENT_PAGE.STATUSES.IN_REVIEW]: 'In Review',
    [CONTENT_PAGE.STATUSES.REVIEWED]: 'Reviewed',
    [CONTENT_PAGE.STATUSES.PENDING_APPROVAL]: 'Pending Approval',
    [CONTENT_PAGE.STATUSES.APPROVED]: 'Approved',
    [CONTENT_PAGE.STATUSES.REJECTED]: 'Rejected',
    [CONTENT_PAGE.STATUSES.PUBLISHED]: 'Published',
    [CONTENT_PAGE.STATUSES.SCHEDULED]: 'Scheduled',
    [CONTENT_PAGE.STATUSES.PRIVATE]: 'Private',
    [CONTENT_PAGE.STATUSES.UNLISTED]: 'Unlisted',
    [CONTENT_PAGE.STATUSES.ARCHIVED]: 'Archived',
    [CONTENT_PAGE.STATUSES.DEPRECATED]: 'Deprecated',
    [CONTENT_PAGE.STATUSES.DELETED]: 'Deleted',
  };
  return labels[status] || 'Unknown Status';
}

export function contentPageGetTemplateLabel(template: ContentPageTemplate): string {
  const labels: Record<ContentPageTemplate, string> = {
    [CONTENT_PAGE.TEMPLATES.DEFAULT]: 'Default Template',
    [CONTENT_PAGE.TEMPLATES.MODERN]: 'Modern Template',
    [CONTENT_PAGE.TEMPLATES.MINIMAL]: 'Minimal Template',
    [CONTENT_PAGE.TEMPLATES.PROFESSIONAL]: 'Professional Template',
    [CONTENT_PAGE.TEMPLATES.CREATIVE]: 'Creative Template',
    [CONTENT_PAGE.TEMPLATES.ELEGANT]: 'Elegant Template',
    [CONTENT_PAGE.TEMPLATES.BOLD]: 'Bold Template',
    [CONTENT_PAGE.TEMPLATES.LIGHT]: 'Light Template',
    [CONTENT_PAGE.TEMPLATES.DARK]: 'Dark Template',
    [CONTENT_PAGE.TEMPLATES.COLORFUL]: 'Colorful Template',
    [CONTENT_PAGE.TEMPLATES.MONOCHROME]: 'Monochrome Template',
    [CONTENT_PAGE.TEMPLATES.CORPORATE]: 'Corporate Template',
    [CONTENT_PAGE.TEMPLATES.STARTUP]: 'Startup Template',
    [CONTENT_PAGE.TEMPLATES.AGENCY]: 'Agency Template',
    [CONTENT_PAGE.TEMPLATES.PORTFOLIO]: 'Portfolio Template',
    [CONTENT_PAGE.TEMPLATES.ECOMMERCE]: 'E-commerce Template',
    [CONTENT_PAGE.TEMPLATES.BLOG]: 'Blog Template',
    [CONTENT_PAGE.TEMPLATES.MAGAZINE]: 'Magazine Template',
    [CONTENT_PAGE.TEMPLATES.NEWSPAPER]: 'Newspaper Template',
    [CONTENT_PAGE.TEMPLATES.CUSTOM]: 'Custom Template',
  };
  return labels[template] || 'Unknown Template';
}

export function contentPageGetLayoutLabel(layout: ContentPageLayout): string {
  const labels: Record<ContentPageLayout, string> = {
    [CONTENT_PAGE.LAYOUTS.STANDARD]: 'Standard Layout',
    [CONTENT_PAGE.LAYOUTS.FULL_WIDTH]: 'Full Width Layout',
    [CONTENT_PAGE.LAYOUTS.BOXED]: 'Boxed Layout',
    [CONTENT_PAGE.LAYOUTS.SIDEBAR_LEFT]: 'Sidebar Left Layout',
    [CONTENT_PAGE.LAYOUTS.SIDEBAR_RIGHT]: 'Sidebar Right Layout',
    [CONTENT_PAGE.LAYOUTS.TWO_COLUMN]: 'Two Column Layout',
    [CONTENT_PAGE.LAYOUTS.THREE_COLUMN]: 'Three Column Layout',
    [CONTENT_PAGE.LAYOUTS.SPLIT_SCREEN]: 'Split Screen Layout',
    [CONTENT_PAGE.LAYOUTS.HERO]: 'Hero Layout',
    [CONTENT_PAGE.LAYOUTS.GRID]: 'Grid Layout',
    [CONTENT_PAGE.LAYOUTS.MASONRY]: 'Masonry Layout',
    [CONTENT_PAGE.LAYOUTS.CAROUSEL]: 'Carousel Layout',
    [CONTENT_PAGE.LAYOUTS.SLIDER]: 'Slider Layout',
    [CONTENT_PAGE.LAYOUTS.CUSTOM]: 'Custom Layout',
  };
  return labels[layout] || 'Unknown Layout';
}

export function contentPageGetSectionLabel(section: ContentPageSection): string {
  const labels: Record<ContentPageSection, string> = {
    [CONTENT_PAGE.SECTIONS.HEADER]: 'Header Section',
    [CONTENT_PAGE.SECTIONS.FOOTER]: 'Footer Section',
    [CONTENT_PAGE.SECTIONS.HERO]: 'Hero Section',
    [CONTENT_PAGE.SECTIONS.CONTENT]: 'Content Section',
    [CONTENT_PAGE.SECTIONS.SIDEBAR]: 'Sidebar Section',
    [CONTENT_PAGE.SECTIONS.TESTIMONIALS]: 'Testimonials Section',
    [CONTENT_PAGE.SECTIONS.FEATURES]: 'Features Section',
    [CONTENT_PAGE.SECTIONS.SERVICES]: 'Services Section',
    [CONTENT_PAGE.SECTIONS.PORTFOLIO]: 'Portfolio Section',
    [CONTENT_PAGE.SECTIONS.TEAM]: 'Team Section',
    [CONTENT_PAGE.SECTIONS.PRICING]: 'Pricing Section',
    [CONTENT_PAGE.SECTIONS.FAQ]: 'FAQ Section',
    [CONTENT_PAGE.SECTIONS.CONTACT]: 'Contact Section',
    [CONTENT_PAGE.SECTIONS.MAP]: 'Map Section',
    [CONTENT_PAGE.SECTIONS.FORM]: 'Form Section',
    [CONTENT_PAGE.SECTIONS.CTA]: 'Call to Action Section',
    [CONTENT_PAGE.SECTIONS.NEWSLETTER]: 'Newsletter Section',
    [CONTENT_PAGE.SECTIONS.SOCIAL]: 'Social Media Section',
    [CONTENT_PAGE.SECTIONS.BLOG_FEED]: 'Blog Feed Section',
    [CONTENT_PAGE.SECTIONS.PRODUCT_FEED]: 'Product Feed Section',
    [CONTENT_PAGE.SECTIONS.GALLERY]: 'Gallery Section',
    [CONTENT_PAGE.SECTIONS.STATISTICS]: 'Statistics Section',
    [CONTENT_PAGE.SECTIONS.PARTNERS]: 'Partners Section',
    [CONTENT_PAGE.SECTIONS.AWARDS]: 'Awards Section',
    [CONTENT_PAGE.SECTIONS.TIMELINE]: 'Timeline Section',
  };
  return labels[section] || 'Unknown Section';
}

export function contentPageGetVisibilityLabel(visibility: ContentPageVisibility): string {
  const labels: Record<ContentPageVisibility, string> = {
    [CONTENT_PAGE.VISIBILITY.PUBLIC]: 'Public',
    [CONTENT_PAGE.VISIBILITY.PRIVATE]: 'Private',
    [CONTENT_PAGE.VISIBILITY.UNLISTED]: 'Unlisted',
    [CONTENT_PAGE.VISIBILITY.PASSWORD_PROTECTED]: 'Password Protected',
    [CONTENT_PAGE.VISIBILITY.MEMBERS_ONLY]: 'Members Only',
    [CONTENT_PAGE.VISIBILITY.SUBSCRIBERS_ONLY]: 'Subscribers Only',
    [CONTENT_PAGE.VISIBILITY.PREMIUM_ONLY]: 'Premium Only',
    [CONTENT_PAGE.VISIBILITY.TEAM_ONLY]: 'Team Only',
  };
  return labels[visibility] || 'Unknown Visibility';
}

export function contentPageGetAccessLabel(access: ContentPageAccess): string {
  const labels: Record<ContentPageAccess, string> = {
    [CONTENT_PAGE.ACCESS.PUBLIC]: 'Public Access',
    [CONTENT_PAGE.ACCESS.RESTRICTED]: 'Restricted Access',
    [CONTENT_PAGE.ACCESS.CONFIDENTIAL]: 'Confidential Access',
    [CONTENT_PAGE.ACCESS.INTERNAL]: 'Internal Access',
    [CONTENT_PAGE.ACCESS.EXTERNAL]: 'External Access',
    [CONTENT_PAGE.ACCESS.PARTNER]: 'Partner Access',
    [CONTENT_PAGE.ACCESS.CUSTOM]: 'Custom Access',
  };
  return labels[access] || 'Unknown Access';
}

export function contentPageIsPublished(status: ContentPageStatus): boolean {
  const publishedStatuses: ContentPageStatus[] = [
    CONTENT_PAGE.STATUSES.PUBLISHED,
    CONTENT_PAGE.STATUSES.SCHEDULED,
  ];
  return publishedStatuses.includes(status);
}

export function contentPageIsEditable(status: ContentPageStatus): boolean {
  const editableStatuses: ContentPageStatus[] = [
    CONTENT_PAGE.STATUSES.DRAFT,
    CONTENT_PAGE.STATUSES.PENDING_REVIEW,
    CONTENT_PAGE.STATUSES.IN_REVIEW,
    CONTENT_PAGE.STATUSES.REVIEWED,
    CONTENT_PAGE.STATUSES.PENDING_APPROVAL,
    CONTENT_PAGE.STATUSES.REJECTED,
    CONTENT_PAGE.STATUSES.PRIVATE,
    CONTENT_PAGE.STATUSES.UNLISTED,
  ];
  return editableStatuses.includes(status);
}

export function contentPageGetDefaultStatus(): ContentPageStatus {
  return CONTENT_PAGE.DEFAULTS.STATUS as ContentPageStatus;
}

export function contentPageGetDefaultVisibility(): ContentPageVisibility {
  return CONTENT_PAGE.DEFAULTS.VISIBILITY as ContentPageVisibility;
}

export function contentPageGetDefaultTemplate(): ContentPageTemplate {
  return CONTENT_PAGE.DEFAULTS.TEMPLATE as ContentPageTemplate;
}

export function contentPageGetDefaultLayout(): ContentPageLayout {
  return CONTENT_PAGE.DEFAULTS.LAYOUT as ContentPageLayout;
}

export function contentPageIsValidType(type: string): type is ContentPageType {
  return Object.values(CONTENT_PAGE.TYPES).includes(type as ContentPageType);
}

export function contentPageIsValidStatus(status: string): status is ContentPageStatus {
  return Object.values(CONTENT_PAGE.STATUSES).includes(status as ContentPageStatus);
}

export function contentPageIsValidTemplate(template: string): template is ContentPageTemplate {
  return Object.values(CONTENT_PAGE.TEMPLATES).includes(template as ContentPageTemplate);
}

export function contentPageIsValidLayout(layout: string): layout is ContentPageLayout {
  return Object.values(CONTENT_PAGE.LAYOUTS).includes(layout as ContentPageLayout);
}

export function contentPageIsValidSection(section: string): section is ContentPageSection {
  return Object.values(CONTENT_PAGE.SECTIONS).includes(section as ContentPageSection);
}

export function contentPageGetDefaultSections(): ContentPageSection[] {
  return [...CONTENT_PAGE.DEFAULTS.SECTIONS] as ContentPageSection[];
}

export function contentPageGetMaxSections(): number {
  return CONTENT_PAGE.LIMITS.MAX_SECTIONS;
}
