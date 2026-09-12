import { BaseEntity } from '../../common/base.types';
import { BRAND } from '@vubon/shared-constants/src/business/product/brand.constants';
import { Product } from './product.types';

export interface BrandMetadata {
  seoTitle?: string;
  seoDescription?: string;
  isFeatured: boolean;
}

export interface Brand extends BaseEntity {
  brandId: string;
  name: string;
  slug: string;
  description?: string;
  status: keyof typeof BRAND.STATUS | string;
  logo?: string;
  website?: string;
  products: Product[];
  productCount: number;
  isActive: boolean;
  metadata: BrandMetadata;
}
