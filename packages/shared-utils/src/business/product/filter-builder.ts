/**
 * Filter Builder
 * ফিল্টার বিল্ডার
 */

export interface ProductFilter {
  categoryId?: string[];
  brandId?: string[];
  vendorId?: string[];
  status?: string[];
  type?: string[];
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  isDigital?: boolean;
  isPhysical?: boolean;
  rating?: number;
  tags?: string[];
  search?: string;
  dateFrom?: Date;
  dateTo?: Date;
  attributes?: Record<string, string | number | boolean>;
}

export interface ProductFilterCondition {
  field: string;
  operator: 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'like' | 'in' | 'between' | 'exists';
  value: unknown;
}

export interface BuiltProductFilter {
  conditions: ProductFilterCondition[];
  search?: {
    term: string;
    fields: string[];
  };
}

export const buildProductFilter = (filter: ProductFilter): BuiltProductFilter => {
  const conditions: ProductFilterCondition[] = [];

  // Category filter
  if (filter.categoryId && filter.categoryId.length > 0) {
    conditions.push({
      field: 'categoryId',
      operator: 'in',
      value: filter.categoryId,
    });
  }

  // Brand filter
  if (filter.brandId && filter.brandId.length > 0) {
    conditions.push({
      field: 'brandId',
      operator: 'in',
      value: filter.brandId,
    });
  }

  // Vendor filter
  if (filter.vendorId && filter.vendorId.length > 0) {
    conditions.push({
      field: 'vendorId',
      operator: 'in',
      value: filter.vendorId,
    });
  }

  // Status filter
  if (filter.status && filter.status.length > 0) {
    conditions.push({
      field: 'status',
      operator: 'in',
      value: filter.status,
    });
  }

  // Type filter
  if (filter.type && filter.type.length > 0) {
    conditions.push({
      field: 'type',
      operator: 'in',
      value: filter.type,
    });
  }

  // Price range filter
  if (filter.minPrice !== undefined) {
    conditions.push({
      field: 'price',
      operator: 'gte',
      value: filter.minPrice,
    });
  }
  if (filter.maxPrice !== undefined) {
    conditions.push({
      field: 'price',
      operator: 'lte',
      value: filter.maxPrice,
    });
  }

  // Stock filter
  if (filter.inStock !== undefined) {
    conditions.push({
      field: 'stock',
      operator: filter.inStock ? 'gt' : 'eq',
      value: filter.inStock ? 0 : 0,
    });
  }

  // Digital/Physical filter
  if (filter.isDigital !== undefined) {
    conditions.push({
      field: 'isDigital',
      operator: 'eq',
      value: filter.isDigital,
    });
  }
  if (filter.isPhysical !== undefined) {
    conditions.push({
      field: 'isPhysical',
      operator: 'eq',
      value: filter.isPhysical,
    });
  }

  // Rating filter
  if (filter.rating !== undefined) {
    conditions.push({
      field: 'rating',
      operator: 'gte',
      value: filter.rating,
    });
  }

  // Tags filter
  if (filter.tags && filter.tags.length > 0) {
    conditions.push({
      field: 'tags',
      operator: 'like',
      value: filter.tags.join(','),
    });
  }

  // Date range filter
  if (filter.dateFrom) {
    conditions.push({
      field: 'createdAt',
      operator: 'gte',
      value: filter.dateFrom,
    });
  }
  if (filter.dateTo) {
    conditions.push({
      field: 'createdAt',
      operator: 'lte',
      value: filter.dateTo,
    });
  }

  // Attributes filter
  if (filter.attributes) {
    for (const [key, value] of Object.entries(filter.attributes)) {
      conditions.push({
        field: `attributes.${key}`,
        operator: 'eq',
        value,
      });
    }
  }

  // Search filter
  let search: { term: string; fields: string[] } | undefined;
  if (filter.search) {
    search = {
      term: filter.search,
      fields: ['name', 'nameBangla', 'description', 'shortDescription', 'sku'],
    };
  }

  return {
    conditions,
    search,
  };
};

export const buildProductFilterConditions = (filter: ProductFilter): ProductFilterCondition[] => {
  return buildProductFilter(filter).conditions;
};
