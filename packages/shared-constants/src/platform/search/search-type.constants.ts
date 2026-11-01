export const SEARCH_TYPE = {
  FULL_TEXT: 'full_text',
  FUZZY: 'fuzzy',
  EXACT: 'exact',
  PREFIX: 'prefix',
  WILDCARD: 'wildcard',
  PHRASE: 'phrase',
  BOOLEAN: 'boolean',
  SEMANTIC: 'semantic',
  VECTOR: 'vector',
  HYBRID: 'hybrid',
  GEO: 'geo',
} as const;

export const SEARCH_SCOPE = {
  GLOBAL: 'global',
  PRODUCTS: 'products',
  CATEGORIES: 'categories',
  BRANDS: 'brands',
  VENDORS: 'vendors',
  USERS: 'users',
  ORDERS: 'orders',
  ARTICLES: 'articles',
  FAQ: 'faq',
  ALL: 'all',
} as const;

export type SearchTypeType = (typeof SEARCH_TYPE)[keyof typeof SEARCH_TYPE];
export type SearchScopeType = (typeof SEARCH_SCOPE)[keyof typeof SEARCH_SCOPE];
