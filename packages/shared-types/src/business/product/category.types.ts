import { BaseEntity } from '../../common/base.types';
import { CATEGORY } from '@vubon/shared-constants/src/business/product/category.constants';
import { Product } from './product.types';

export interface CategoryMetadata {
  seoTitle?: string;
  seoDescription?: string;
  isFeatured: boolean;
  isActive: boolean;
}

export interface Category extends BaseEntity {
  categoryId: string;
  name: string;
  slug: string;
  description?: string;
  status: keyof typeof CATEGORY.STATUS | string;
  parentId?: string;
  parent?: Category;
  children: Category[];
  products: Product[];
  productCount: number;
  order: number;
  icon?: string;
  image?: string;
  metadata: CategoryMetadata;
}
