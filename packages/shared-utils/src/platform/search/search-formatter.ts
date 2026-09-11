export interface SearchFormatData {
  totalResults: number;
  took: number;
}

export interface ProductFormatData {
  name: string;
  price: number;
  rating: number;
}

const formatNum = (value: number): string => {
  return new Intl.NumberFormat('en-US').format(value);
};

export const formatSearchResult = (product: ProductFormatData): string => {
  return `${product.name} - ${product.price} (${product.rating}★)`;
};

export const formatSearchSummary = (search: SearchFormatData): string => {
  return `Results: ${formatNum(search.totalResults)} | Took: ${search.took}ms`;
};
