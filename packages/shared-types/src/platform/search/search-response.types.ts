import { SuccessResponse } from '../../common/base-response.types';
import { Product } from '../../business/product/product.types';
import { Pagination } from '../../common/pagination.types';

export interface SearchResponseData {
  results: Product[];
  total: number;
  took: number;
  pagination: Pagination;
  facets?: Record<string, unknown>;
  suggestions?: string[];
}

export type SearchResponse = SuccessResponse<SearchResponseData>;
