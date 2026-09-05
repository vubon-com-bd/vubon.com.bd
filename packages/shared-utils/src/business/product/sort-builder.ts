/**
 * Sort Builder
 * সর্ট বিল্ডার
 */

export interface ProductSort {
  field: string;
  order: 'asc' | 'desc';
}

export interface BuiltSort {
  field: string;
  order: 'asc' | 'desc';
  priority: number;
}

export interface MultipleSort {
  sorts: BuiltSort[];
}

export const buildProductSort = (sort: ProductSort | ProductSort[]): MultipleSort => {
  if (Array.isArray(sort)) {
    return {
      sorts: sort.map((s, index) => ({
        field: s.field,
        order: s.order,
        priority: index + 1,
      })),
    };
  }

  return {
    sorts: [
      {
        field: sort.field,
        order: sort.order,
        priority: 1,
      },
    ],
  };
};

export const getDefaultProductSort = (): ProductSort => ({
  field: 'createdAt',
  order: 'desc',
});

export const getPopularitySort = (): ProductSort => ({
  field: 'soldCount',
  order: 'desc',
});

export const getRatingSort = (): ProductSort => ({
  field: 'rating',
  order: 'desc',
});

export const getPriceSort = (order: 'asc' | 'desc' = 'asc'): ProductSort => ({
  field: 'price',
  order,
});

export const getDateSort = (order: 'asc' | 'desc' = 'desc'): ProductSort => ({
  field: 'createdAt',
  order,
});

export const getNameSort = (order: 'asc' | 'desc' = 'asc'): ProductSort => ({
  field: 'name',
  order,
});

export const validateSortField = (field: string): boolean => {
  const validFields = [
    'name',
    'price',
    'rating',
    'soldCount',
    'viewCount',
    'createdAt',
    'updatedAt',
    'revenue',
    'stock',
    'reviewCount',
  ];
  return validFields.includes(field);
};
