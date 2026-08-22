/**
 * SEO Keyword Intent Constants
 * Search intent classifications for keywords
 */

export const SEO_KEYWORD_INTENT = {
  // Primary Intent Types
  TYPES: {
    INFORMATIONAL: 'informational',
    NAVIGATIONAL: 'navigational',
    COMMERCIAL: 'commercial',
    TRANSACTIONAL: 'transactional',
    LOCAL: 'local',
    INVESTIGATIONAL: 'investigational',
  } as const,

  // Intent Sub-types
  SUB_TYPES: {
    // Informational
    LEARN: 'learn',
    RESEARCH: 'research',
    EXPLORE: 'explore',
    COMPARE: 'compare',
    UNDERSTAND: 'understand',
    FIND: 'find',

    // Navigational
    DIRECT: 'direct',
    BRAND: 'brand',
    SITE: 'site',
    PAGE: 'page',

    // Commercial
    PRODUCT_RESEARCH: 'product_research',
    SERVICE_RESEARCH: 'service_research',
    PRICE_COMPARISON: 'price_comparison',
    REVIEW_CHECK: 'review_check',
    ALTERNATIVE_SEARCH: 'alternative_search',

    // Transactional
    BUY: 'buy',
    ORDER: 'order',
    PURCHASE: 'purchase',
    SIGNUP: 'signup',
    SUBSCRIBE: 'subscribe',
    DOWNLOAD: 'download',
    REGISTER: 'register',

    // Local
    NEAR_ME: 'near_me',
    LOCAL_BUSINESS: 'local_business',
    SERVICE_AREA: 'service_area',
    LOCAL_PRICES: 'local_prices',
    LOCAL_REVIEWS: 'local_reviews',
  } as const,

  // Intent Signals
  SIGNALS: {
    // Informational Signals
    HOW_TO: 'how_to',
    WHAT_IS: 'what_is',
    WHY: 'why',
    WHEN: 'when',
    WHERE: 'where',
    WHO: 'who',
    GUIDE: 'guide',
    TUTORIAL: 'tutorial',
    TIPS: 'tips',
    EXAMPLES: 'examples',
    IDEAS: 'ideas',

    // Navigational Signals
    LOGIN: 'login',
    SIGN_IN: 'sign_in',
    HOME: 'home',
    OFFICIAL: 'official',
    WEBSITE: 'website',

    // Commercial Signals
    BEST: 'best',
    TOP: 'top',
    REVIEW: 'review',
    COMPARISON: 'comparison',
    ALTERNATIVE: 'alternative',
    VERSUS: 'versus',
    VS: 'vs',
    CHEAP: 'cheap',
    AFFORDABLE: 'affordable',
    DISCOUNT: 'discount',
    DEAL: 'deal',

    // Transactional Signals
    BUY: 'buy',
    ORDER: 'order',
    PURCHASE: 'purchase',
    PRICE: 'price',
    COST: 'cost',
    SHIPPING: 'shipping',
    DELIVERY: 'delivery',
    SALE: 'sale',
    COUPON: 'coupon',
    PROMO: 'promo',

    // Local Signals
    NEAR_ME: 'near_me',
    LOCATION: 'location',
    CITY: 'city',
    STATE: 'state',
    ZIP: 'zip',
    POSTAL: 'postal',
    AREA: 'area',
    REGION: 'region',
  } as const,

  // Intent Scores (0-100)
  SCORES: {
    INFORMATIONAL: 25,
    NAVIGATIONAL: 50,
    COMMERCIAL: 75,
    TRANSACTIONAL: 100,
    LOCAL: 60,
    INVESTIGATIONAL: 40,
  } as const,

  // Intent Colors
  COLORS: {
    INFORMATIONAL: '#2196F3',
    NAVIGATIONAL: '#4CAF50',
    COMMERCIAL: '#FF9800',
    TRANSACTIONAL: '#F44336',
    LOCAL: '#9C27B0',
    INVESTIGATIONAL: '#00BCD4',
  } as const,
} as const;

// Intent Types
export type SEOKeywordIntentType =
  (typeof SEO_KEYWORD_INTENT.TYPES)[keyof typeof SEO_KEYWORD_INTENT.TYPES];

// Intent Sub-types
export type SEOKeywordIntentSubType =
  (typeof SEO_KEYWORD_INTENT.SUB_TYPES)[keyof typeof SEO_KEYWORD_INTENT.SUB_TYPES];

// Intent Signals
export type SEOKeywordIntentSignal =
  (typeof SEO_KEYWORD_INTENT.SIGNALS)[keyof typeof SEO_KEYWORD_INTENT.SIGNALS];

// Intent Scores
export type SEOKeywordIntentScore =
  (typeof SEO_KEYWORD_INTENT.SCORES)[keyof typeof SEO_KEYWORD_INTENT.SCORES];

// Intent Colors
export type SEOKeywordIntentColor =
  (typeof SEO_KEYWORD_INTENT.COLORS)[keyof typeof SEO_KEYWORD_INTENT.COLORS];

// Utility Functions
export function getIntentTypeLabel(intent: SEOKeywordIntentType): string {
  const labels: Record<SEOKeywordIntentType, string> = {
    [SEO_KEYWORD_INTENT.TYPES.INFORMATIONAL]: 'Informational',
    [SEO_KEYWORD_INTENT.TYPES.NAVIGATIONAL]: 'Navigational',
    [SEO_KEYWORD_INTENT.TYPES.COMMERCIAL]: 'Commercial',
    [SEO_KEYWORD_INTENT.TYPES.TRANSACTIONAL]: 'Transactional',
    [SEO_KEYWORD_INTENT.TYPES.LOCAL]: 'Local',
    [SEO_KEYWORD_INTENT.TYPES.INVESTIGATIONAL]: 'Investigational',
  };
  return labels[intent] || 'Unknown Intent';
}

export function getIntentSubTypeLabel(subType: SEOKeywordIntentSubType): string {
  const labels: Record<SEOKeywordIntentSubType, string> = {
    // Informational
    [SEO_KEYWORD_INTENT.SUB_TYPES.LEARN]: 'Learn',
    [SEO_KEYWORD_INTENT.SUB_TYPES.RESEARCH]: 'Research',
    [SEO_KEYWORD_INTENT.SUB_TYPES.EXPLORE]: 'Explore',
    [SEO_KEYWORD_INTENT.SUB_TYPES.COMPARE]: 'Compare',
    [SEO_KEYWORD_INTENT.SUB_TYPES.UNDERSTAND]: 'Understand',
    [SEO_KEYWORD_INTENT.SUB_TYPES.FIND]: 'Find',

    // Navigational
    [SEO_KEYWORD_INTENT.SUB_TYPES.DIRECT]: 'Direct Navigation',
    [SEO_KEYWORD_INTENT.SUB_TYPES.BRAND]: 'Brand Search',
    [SEO_KEYWORD_INTENT.SUB_TYPES.SITE]: 'Site Navigation',
    [SEO_KEYWORD_INTENT.SUB_TYPES.PAGE]: 'Page Navigation',

    // Commercial
    [SEO_KEYWORD_INTENT.SUB_TYPES.PRODUCT_RESEARCH]: 'Product Research',
    [SEO_KEYWORD_INTENT.SUB_TYPES.SERVICE_RESEARCH]: 'Service Research',
    [SEO_KEYWORD_INTENT.SUB_TYPES.PRICE_COMPARISON]: 'Price Comparison',
    [SEO_KEYWORD_INTENT.SUB_TYPES.REVIEW_CHECK]: 'Review Check',
    [SEO_KEYWORD_INTENT.SUB_TYPES.ALTERNATIVE_SEARCH]: 'Alternative Search',

    // Transactional
    [SEO_KEYWORD_INTENT.SUB_TYPES.BUY]: 'Buy',
    [SEO_KEYWORD_INTENT.SUB_TYPES.ORDER]: 'Order',
    [SEO_KEYWORD_INTENT.SUB_TYPES.PURCHASE]: 'Purchase',
    [SEO_KEYWORD_INTENT.SUB_TYPES.SIGNUP]: 'Sign Up',
    [SEO_KEYWORD_INTENT.SUB_TYPES.SUBSCRIBE]: 'Subscribe',
    [SEO_KEYWORD_INTENT.SUB_TYPES.DOWNLOAD]: 'Download',
    [SEO_KEYWORD_INTENT.SUB_TYPES.REGISTER]: 'Register',

    // Local
    [SEO_KEYWORD_INTENT.SUB_TYPES.NEAR_ME]: 'Near Me',
    [SEO_KEYWORD_INTENT.SUB_TYPES.LOCAL_BUSINESS]: 'Local Business',
    [SEO_KEYWORD_INTENT.SUB_TYPES.SERVICE_AREA]: 'Service Area',
    [SEO_KEYWORD_INTENT.SUB_TYPES.LOCAL_PRICES]: 'Local Prices',
    [SEO_KEYWORD_INTENT.SUB_TYPES.LOCAL_REVIEWS]: 'Local Reviews',
  };
  return labels[subType] || 'Unknown Sub-type';
}

export function getIntentScore(intent: SEOKeywordIntentType): SEOKeywordIntentScore {
  const scores: Record<SEOKeywordIntentType, SEOKeywordIntentScore> = {
    [SEO_KEYWORD_INTENT.TYPES.INFORMATIONAL]: SEO_KEYWORD_INTENT.SCORES.INFORMATIONAL,
    [SEO_KEYWORD_INTENT.TYPES.NAVIGATIONAL]: SEO_KEYWORD_INTENT.SCORES.NAVIGATIONAL,
    [SEO_KEYWORD_INTENT.TYPES.COMMERCIAL]: SEO_KEYWORD_INTENT.SCORES.COMMERCIAL,
    [SEO_KEYWORD_INTENT.TYPES.TRANSACTIONAL]: SEO_KEYWORD_INTENT.SCORES.TRANSACTIONAL,
    [SEO_KEYWORD_INTENT.TYPES.LOCAL]: SEO_KEYWORD_INTENT.SCORES.LOCAL,
    [SEO_KEYWORD_INTENT.TYPES.INVESTIGATIONAL]: SEO_KEYWORD_INTENT.SCORES.INVESTIGATIONAL,
  };
  return scores[intent] || SEO_KEYWORD_INTENT.SCORES.INFORMATIONAL;
}

export function getIntentColor(intent: SEOKeywordIntentType): SEOKeywordIntentColor {
  const colors: Record<SEOKeywordIntentType, SEOKeywordIntentColor> = {
    [SEO_KEYWORD_INTENT.TYPES.INFORMATIONAL]: SEO_KEYWORD_INTENT.COLORS.INFORMATIONAL,
    [SEO_KEYWORD_INTENT.TYPES.NAVIGATIONAL]: SEO_KEYWORD_INTENT.COLORS.NAVIGATIONAL,
    [SEO_KEYWORD_INTENT.TYPES.COMMERCIAL]: SEO_KEYWORD_INTENT.COLORS.COMMERCIAL,
    [SEO_KEYWORD_INTENT.TYPES.TRANSACTIONAL]: SEO_KEYWORD_INTENT.COLORS.TRANSACTIONAL,
    [SEO_KEYWORD_INTENT.TYPES.LOCAL]: SEO_KEYWORD_INTENT.COLORS.LOCAL,
    [SEO_KEYWORD_INTENT.TYPES.INVESTIGATIONAL]: SEO_KEYWORD_INTENT.COLORS.INVESTIGATIONAL,
  };
  return colors[intent] || '#9E9E9E';
}

export function detectIntent(keyword: string): SEOKeywordIntentType {
  const lowerKeyword = keyword.toLowerCase();

  // Transactional signals
  const transactionalSignals = [
    'buy',
    'order',
    'purchase',
    'shop',
    'price',
    'cost',
    'sale',
    'discount',
    'coupon',
    'promo',
    'shipping',
    'delivery',
  ];
  if (transactionalSignals.some((signal) => lowerKeyword.includes(signal))) {
    return SEO_KEYWORD_INTENT.TYPES.TRANSACTIONAL;
  }

  // Commercial signals
  const commercialSignals = [
    'best',
    'top',
    'review',
    'comparison',
    'alternative',
    'vs',
    'cheap',
    'affordable',
    'deal',
  ];
  if (commercialSignals.some((signal) => lowerKeyword.includes(signal))) {
    return SEO_KEYWORD_INTENT.TYPES.COMMERCIAL;
  }

  // Navigational signals
  const navigationalSignals = [
    'login',
    'sign in',
    'official',
    'website',
    'home',
    'contact',
    'about',
  ];
  if (navigationalSignals.some((signal) => lowerKeyword.includes(signal))) {
    return SEO_KEYWORD_INTENT.TYPES.NAVIGATIONAL;
  }

  // Local signals
  const localSignals = ['near me', 'location', 'city', 'state', 'zip', 'postal', 'area', 'region'];
  if (localSignals.some((signal) => lowerKeyword.includes(signal))) {
    return SEO_KEYWORD_INTENT.TYPES.LOCAL;
  }

  // Question signals (informational)
  const questionSignals = [
    'how',
    'what',
    'why',
    'when',
    'where',
    'who',
    'guide',
    'tutorial',
    'tips',
    'examples',
  ];
  if (questionSignals.some((signal) => lowerKeyword.includes(signal))) {
    return SEO_KEYWORD_INTENT.TYPES.INFORMATIONAL;
  }

  // Default to informational for other queries
  return SEO_KEYWORD_INTENT.TYPES.INFORMATIONAL;
}

export function getIntentRecommendation(intent: SEOKeywordIntentType): string {
  const recommendations: Record<SEOKeywordIntentType, string> = {
    [SEO_KEYWORD_INTENT.TYPES.INFORMATIONAL]:
      'Create comprehensive, educational content. Focus on answering questions and providing value.',
    [SEO_KEYWORD_INTENT.TYPES.NAVIGATIONAL]:
      'Ensure easy navigation and brand visibility. Optimize for brand searches.',
    [SEO_KEYWORD_INTENT.TYPES.COMMERCIAL]:
      'Create comparison content, reviews, and showcase features. Build trust and authority.',
    [SEO_KEYWORD_INTENT.TYPES.TRANSACTIONAL]:
      'Optimize product pages, make checkout seamless. Focus on conversion optimization.',
    [SEO_KEYWORD_INTENT.TYPES.LOCAL]:
      'Optimize for local search. Claim GMB listing. Add local schema markup.',
    [SEO_KEYWORD_INTENT.TYPES.INVESTIGATIONAL]:
      'Create detailed guides and comparisons. Help users make informed decisions.',
  };
  return recommendations[intent] || 'Create quality content that matches user intent.';
}

export function getFunnelStage(intent: SEOKeywordIntentType): string {
  const stages: Record<SEOKeywordIntentType, string> = {
    [SEO_KEYWORD_INTENT.TYPES.INFORMATIONAL]: 'Top of Funnel (Awareness)',
    [SEO_KEYWORD_INTENT.TYPES.NAVIGATIONAL]: 'Top of Funnel (Awareness)',
    [SEO_KEYWORD_INTENT.TYPES.INVESTIGATIONAL]: 'Middle of Funnel (Consideration)',
    [SEO_KEYWORD_INTENT.TYPES.COMMERCIAL]: 'Middle of Funnel (Consideration)',
    [SEO_KEYWORD_INTENT.TYPES.LOCAL]: 'Bottom of Funnel (Decision)',
    [SEO_KEYWORD_INTENT.TYPES.TRANSACTIONAL]: 'Bottom of Funnel (Decision)',
  };
  return stages[intent] || 'Unknown Funnel Stage';
}
