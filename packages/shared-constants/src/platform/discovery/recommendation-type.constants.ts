export const RECOMMENDATION_TYPE = {
  PERSONALIZED: 'personalized',
  TRENDING: 'trending',
  POPULAR: 'popular',
  RECENTLY_VIEWED: 'recently_viewed',
  FREQUENTLY_BOUGHT: 'frequently_bought',
  COMPLEMENTARY: 'complementary',
  SUBSTITUTE: 'substitute',
  UPSELL: 'upsell',
  CROSS_SELL: 'cross_sell',
  BUNDLE: 'bundle',
  SIMILAR: 'similar',
  NEW_ARRIVALS: 'new_arrivals',
  BEST_SELLERS: 'best_sellers',
  ON_SALE: 'on_sale',
  CATEGORY_BASED: 'category_based',
  BRAND_BASED: 'brand_based',
} as const;

export type RecommendationTypeType = (typeof RECOMMENDATION_TYPE)[keyof typeof RECOMMENDATION_TYPE];
