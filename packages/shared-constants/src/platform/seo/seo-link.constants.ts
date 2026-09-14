export const SEO_LINK_TYPE = {
  INTERNAL: 'internal',
  EXTERNAL: 'external',
  NOFOLLOW: 'nofollow',
  DOFOLLOW: 'dofollow',
  SPONSORED: 'sponsored',
  UGC: 'ugc',
  BROKEN: 'broken',
} as const;

export const SEO_LINK = {
  MAX_INTERNAL_LINKS_PER_PAGE: 100,
  MAX_EXTERNAL_LINKS_PER_PAGE: 50,
  MIN_INTERNAL_LINKS_PER_PAGE: 3,
  ANCHOR_TEXT_MIN_LENGTH: 3,
  ANCHOR_TEXT_MAX_LENGTH: 100,
  CHECK_BROKEN_LINKS: true,
  BROKEN_LINK_CHECK_INTERVAL_DAYS: 7,
  REDIRECT_CODE_301: 301,
  REDIRECT_CODE_302: 302,
} as const;

export type SeoLinkTypeType = (typeof SEO_LINK_TYPE)[keyof typeof SEO_LINK_TYPE];
