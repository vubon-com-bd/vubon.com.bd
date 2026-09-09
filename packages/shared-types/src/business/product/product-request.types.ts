import { ApiRequest } from '../../common/api-request.types';
import { PaginationParams } from '../../common/pagination.types';
import { Sort } from '../../common/sort.types';
import { Filter } from '../../common/filter.types';
import { Product } from './product.types';

export interface ProductRequest extends ApiRequest {
  product: Product;
}

export interface ProductListRequest extends ApiRequest {
  pagination: PaginationParams;
  sort?: Sort[];
  filters?: Filter[];
  search?: string;
  categoryId?: string;
  brandId?: string;
  vendorId?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  isActive?: boolean;
}

export interface ProductPricingInput {
  price: number;
  compareAtPrice?: number;
  cost?: number;
  currency: string;
  isOnSale?: boolean;
  salePrice?: number;
  saleStartAt?: Date;
  saleEndAt?: Date;
}

export interface ProductInventoryInput {
  quantity: number;
  reserved?: number;
  reorderPoint?: number;
  reorderQuantity?: number;
  warehouseId?: string;
}

export interface ProductVariantInput {
  name: string;
  sku: string;
  attributes: Record<string, string>;
  pricing: ProductPricingInput;
  inventory: ProductInventoryInput;
  images?: string[];
}

export interface ProductImageInput {
  url: string;
  alt: string;
  isPrimary?: boolean;
  order?: number;
}

export interface ProductAttributeInput {
  name: string;
  value: string;
  type: string;
}

export interface ProductCreateRequest extends ApiRequest {
  name: string;
  description: string;
  categoryId: string;
  vendorId: string;
  pricing: ProductPricingInput;
  inventory: ProductInventoryInput;
  variants?: ProductVariantInput[];
  images?: ProductImageInput[];
  attributes?: ProductAttributeInput[];
  tags?: string[];
}
