/**
 * Filter Configuration
 * ফিল্টার কনফিগারেশন
 */
export interface FilterConfig {
  enabled: boolean;
  defaultLimit: number;
  maxLimit: number;
  defaultSort: string;
  defaultOrder: 'asc' | 'desc';
  searchableFields: string[];
  filterableFields: string[];
  sortableFields: string[];
  dateRange: {
    enabled: boolean;
    maxRange: number;
    defaultStart: number;
    defaultEnd: number;
  };
  facets: {
    enabled: boolean;
    maxValues: number;
    minCount: number;
  };
}

export const createFilterConfig = (): FilterConfig => ({
  enabled: true,
  defaultLimit: 20,
  maxLimit: 100,
  defaultSort: 'createdAt',
  defaultOrder: 'desc',
  searchableFields: ['name', 'description', 'tags'],
  filterableFields: ['category', 'status', 'price', 'rating'],
  sortableFields: ['price', 'rating', 'createdAt', 'updatedAt', 'sales'],
  dateRange: {
    enabled: true,
    maxRange: 365,
    defaultStart: 30,
    defaultEnd: 0,
  },
  facets: {
    enabled: true,
    maxValues: 20,
    minCount: 1,
  },
});
