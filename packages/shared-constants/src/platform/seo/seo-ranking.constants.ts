export const SEO_RANKING_TYPE = {
  ORGANIC: 'organic',
  PAID: 'paid',
  LOCAL: 'local',
  FEATURED_SNIPPET: 'featured_snippet',
  KNOWLEDGE_PANEL: 'knowledge_panel',
  IMAGE: 'image',
  VIDEO: 'video',
} as const;

export const SEO_RANKING = {
  TOP_POSITION: 1,
  PAGE_1_MAX: 10,
  PAGE_2_MAX: 20,
  PAGE_3_MAX: 30,
  TRACK_DAILY: true,
  TRACK_LOCATION: true,
  TRACK_DEVICE: true,
  RETENTION_DAYS: 365,
  MAX_TRACKED_KEYWORDS: 1000,
} as const;

export type SeoRankingTypeType = (typeof SEO_RANKING_TYPE)[keyof typeof SEO_RANKING_TYPE];
