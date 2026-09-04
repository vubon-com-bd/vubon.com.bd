/**
 * Product Types
 * প্রোডাক্ট সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { User } from '../../common/user';
import { PRODUCT_STATUS, PRODUCT_TYPES } from '@vubon/shared-constants';

export interface ProductImage {
  id: string;
  url: string;
  alt?: string;
  isPrimary: boolean;
  sortOrder: number;
}

export interface ProductVideo {
  id: string;
  url: string;
  title?: string;
  thumbnail?: string;
  sortOrder: number;
}

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  comparePrice?: number;
  sku: string;
  stock: number;
  attributes: Record<string, string>;
  images: ProductImage[];
}

export interface Product extends BaseEntity {
  name: string;
  nameBangla?: string;
  slug: string;
  description: string;
  descriptionBangla?: string;
  shortDescription?: string;
  status: (typeof PRODUCT_STATUS)[keyof typeof PRODUCT_STATUS];
  type: (typeof PRODUCT_TYPES)[keyof typeof PRODUCT_TYPES];
  categoryId: string;
  brandId?: string;
  vendorId: string;
  sku: string;
  barcode?: string;
  price: number;
  comparePrice?: number;
  costPrice?: number;
  taxRate: number;
  stock: number;
  lowStockThreshold: number;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  images: ProductImage[];
  videos: ProductVideo[];
  variants: ProductVariant[];
  attributes: Record<string, string | number | boolean>;
  isDigital: boolean;
  isDownloadable: boolean;
  downloadUrl?: string;
  isPhysical: boolean;
  isVirtual: boolean;
  isSubscription: boolean;
  isService: boolean;
  isRental: boolean;
  rentalPrice?: number;
  rentalDuration?: number;
  subscriptionPrice?: number;
  subscriptionDuration?: number;
  seo: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
  tags: string[];
  rating: number;
  reviewCount: number;
  soldCount: number;
  viewCount: number;
  wishlistCount: number;
  createdAt: Date;
  updatedAt: Date;
  createdBy: User;
  updatedBy: User;
}

export interface ProductCreateInput {
  name: string;
  nameBangla?: string;
  description: string;
  descriptionBangla?: string;
  shortDescription?: string;
  type: (typeof PRODUCT_TYPES)[keyof typeof PRODUCT_TYPES];
  categoryId: string;
  brandId?: string;
  vendorId: string;
  sku: string;
  barcode?: string;
  price: number;
  comparePrice?: number;
  costPrice?: number;
  taxRate?: number;
  stock: number;
  lowStockThreshold?: number;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  images?: ProductImage[];
  videos?: ProductVideo[];
  variants?: ProductVariant[];
  attributes?: Record<string, string | number | boolean>;
  isDigital?: boolean;
  isDownloadable?: boolean;
  downloadUrl?: string;
  isPhysical?: boolean;
  isVirtual?: boolean;
  isSubscription?: boolean;
  isService?: boolean;
  isRental?: boolean;
  rentalPrice?: number;
  rentalDuration?: number;
  subscriptionPrice?: number;
  subscriptionDuration?: number;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
  tags?: string[];
}

export interface ProductUpdateInput extends Partial<ProductCreateInput> {
  status?: (typeof PRODUCT_STATUS)[keyof typeof PRODUCT_STATUS];
}

export interface ProductResponse extends BaseEntity {
  product: Product;
}
