export const SEO_TYPE = {
  ON_PAGE: 'on_page',
  OFF_PAGE: 'off_page',
  TECHNICAL: 'technical',
  LOCAL: 'local',
  MOBILE: 'mobile',
  ECOMMERCE: 'ecommerce',
  CONTENT: 'content',
  INTERNATIONAL: 'international',
} as const;

export type SeoTypeType = (typeof SEO_TYPE)[keyof typeof SEO_TYPE];
