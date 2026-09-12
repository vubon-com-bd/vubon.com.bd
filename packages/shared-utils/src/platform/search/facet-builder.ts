export interface FacetValue {
  value: string;
  count: number;
  isSelected: boolean;
}

export interface FacetData {
  facetId: string;
  type: string;
  name: string;
  field: string;
  facetType: string;
  sort: string;
  values: FacetValue[];
  isActive: boolean;
  metadata: Record<string, unknown>;
}

export class FacetBuilder {
  private facets: FacetData[] = [];

  addCategoryFacet(): this {
    this.facets.push({
      facetId: crypto.randomUUID(),
      type: 'category',
      name: 'Category',
      field: 'categoryId',
      facetType: 'multi',
      sort: 'count',
      values: [],
      isActive: true,
      metadata: {},
    });
    return this;
  }

  addBrandFacet(): this {
    this.facets.push({
      facetId: crypto.randomUUID(),
      type: 'brand',
      name: 'Brand',
      field: 'brandId',
      facetType: 'multi',
      sort: 'count',
      values: [],
      isActive: true,
      metadata: {},
    });
    return this;
  }

  addPriceRangeFacet(): this {
    this.facets.push({
      facetId: crypto.randomUUID(),
      type: 'price_range',
      name: 'Price Range',
      field: 'price',
      facetType: 'range',
      sort: 'count',
      values: [
        { value: '0-100', count: 0, isSelected: false },
        { value: '100-500', count: 0, isSelected: false },
        { value: '500-1000', count: 0, isSelected: false },
        { value: '1000+', count: 0, isSelected: false },
      ],
      isActive: true,
      metadata: {},
    });
    return this;
  }

  addRatingFacet(): this {
    this.facets.push({
      facetId: crypto.randomUUID(),
      type: 'rating',
      name: 'Rating',
      field: 'rating',
      facetType: 'single',
      sort: 'count',
      values: [
        { value: '5', count: 0, isSelected: false },
        { value: '4', count: 0, isSelected: false },
        { value: '3', count: 0, isSelected: false },
        { value: '2', count: 0, isSelected: false },
        { value: '1', count: 0, isSelected: false },
      ],
      isActive: true,
      metadata: {},
    });
    return this;
  }

  build(): FacetData[] {
    return this.facets;
  }
}
